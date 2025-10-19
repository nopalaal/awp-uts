const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configure Google Drive API
// NOTE: You need to set up Google Drive API credentials
// For now, this will upload to local storage and return a mock URL
// To use real Google Drive, you need:
// 1. Create a project in Google Cloud Console
// 2. Enable Google Drive API
// 3. Create OAuth2 credentials or Service Account
// 4. Download credentials.json

class GoogleDriveService {
  constructor() {
    try {
      // Try OAuth first (user account with storage)
      const oauthCredPath = path.join(__dirname, '../config/oauth-credentials.json');
      const oauthTokenPath = path.join(__dirname, '../config/oauth-token.json');
      
      if (fs.existsSync(oauthCredPath) && fs.existsSync(oauthTokenPath)) {
        // Use OAuth 2.0 with user account
        const credentials = JSON.parse(fs.readFileSync(oauthCredPath));
        const token = JSON.parse(fs.readFileSync(oauthTokenPath));
        const { client_id, client_secret, redirect_uris } = credentials.web;
        
        this.oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        );
        
        this.oAuth2Client.setCredentials(token);
        this.oauthTokenPath = oauthTokenPath;
        
        // Auto-refresh token when expired
        this.oAuth2Client.on('tokens', (tokens) => {
          if (tokens.refresh_token) {
            // Save new refresh token
            console.log('🔄 Refresh token updated');
          }
          // Always save the new access token
          const currentTokens = JSON.parse(fs.readFileSync(this.oauthTokenPath));
          const updatedTokens = { ...currentTokens, ...tokens };
          fs.writeFileSync(this.oauthTokenPath, JSON.stringify(updatedTokens, null, 2));
          console.log('✅ Access token refreshed automatically');
        });
        
        this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });
        this.useMock = false;
        this.authType = 'oauth';
        this.taskFolderId = null;
        
        // Check token expiry
        const expiryDate = new Date(token.expiry_date);
        const now = new Date();
        const hoursUntilExpiry = (expiryDate - now) / (1000 * 60 * 60);
        
        console.log('✅ Google Drive API initialized with OAuth (User Account)');
        if (hoursUntilExpiry < 1) {
          console.log('⏰ Token will expire soon, will auto-refresh on next request');
        } else {
          console.log(`⏰ Token expires in ${Math.round(hoursUntilExpiry)} hours (auto-refresh enabled)`);
        }
        return;
      }
      
      // Fallback to Service Account
      const keyFilePath = path.join(__dirname, '../config/credentials.json');
      
      if (!fs.existsSync(keyFilePath)) {
        console.warn('⚠️  Google Drive credentials not found. Using mock mode.');
        console.warn('📝 Please setup OAuth or Service Account credentials');
        this.useMock = true;
        return;
      }

      this.auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      });
      
      this.drive = google.drive({ version: 'v3', auth: this.auth });
      this.useMock = false;
      this.authType = 'service';
      this.taskFolderId = null;
      console.log('✅ Google Drive API initialized with Service Account');
      console.warn('⚠️  Note: Service Account has no storage quota. Will fallback to mock if upload fails.');
    } catch (error) {
      console.error('❌ Error initializing Google Drive API:', error.message);
      console.warn('⚠️  Falling back to mock mode');
      this.useMock = true;
    }
  }

  // Get or create the main "AWP Task Files" folder
  async getOrCreateTaskFolder() {
    if (this.useMock) return null;
    
    if (this.taskFolderId) return this.taskFolderId;

    try {
      // Get auth client
      const authClient = await this.auth.getClient();
      
      // Search for existing folder
      const response = await this.drive.files.list({
        q: "name='AWP Task Files' and mimeType='application/vnd.google-apps.folder' and trashed=false",
        fields: 'files(id, name)',
        spaces: 'drive',
      });

      if (response.data.files && response.data.files.length > 0) {
        this.taskFolderId = response.data.files[0].id;
        console.log(`📁 Using existing folder: AWP Task Files (${this.taskFolderId})`);
        return this.taskFolderId;
      }

      // Create new folder if not exists
      const folderMetadata = {
        name: 'AWP Task Files',
        mimeType: 'application/vnd.google-apps.folder',
      };

      const folder = await this.drive.files.create({
        resource: folderMetadata,
        fields: 'id',
      });

      this.taskFolderId = folder.data.id;
      console.log(`📁 Created new folder: AWP Task Files (${this.taskFolderId})`);
      
      // Share folder (optional - anyone with link can view)
      await this.drive.permissions.create({
        fileId: this.taskFolderId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return this.taskFolderId;
    } catch (error) {
      console.error('Error getting/creating folder:', error.message);
      // If credentials are invalid, switch to mock mode
      if (error.message.includes('DECODER') || error.message.includes('credentials')) {
        console.warn('⚠️  Invalid credentials detected. Switching to mock mode.');
        this.useMock = true;
      }
      return null;
    }
  }

  async uploadFile(filePath, fileName, mimeType) {
    try {
      if (this.useMock) {
        console.log(`📁 Mock upload: ${fileName}`);
        const mockDriveUrl = `https://drive.google.com/file/d/mock-${Date.now()}/view`;
        return mockDriveUrl;
      }

      // Get or create the main folder
      const folderId = await this.getOrCreateTaskFolder();
      
      // If switched to mock mode during folder creation, use mock
      if (this.useMock) {
        console.log(`📁 Mock upload (fallback): ${fileName}`);
        const mockDriveUrl = `https://drive.google.com/file/d/mock-${Date.now()}/view`;
        return mockDriveUrl;
      }

      const fileMetadata = {
        name: fileName,
        parents: folderId ? [folderId] : [], // Put in folder if available
      };
      
      const media = {
        mimeType: mimeType,
        body: fs.createReadStream(filePath),
      };
      
      console.log(`📤 Uploading ${fileName} to Google Drive folder...`);
      
      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink, webContentLink',
      });
      
      console.log(`✅ File uploaded with ID: ${response.data.id}`);
      
      // Make file accessible to anyone with the link
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      
      console.log(`🔗 File shared: ${response.data.webViewLink}`);
      
      return response.data.webViewLink;
      
    } catch (error) {
      console.error('❌ Error uploading to Google Drive:', error.message);
      
      // Check if it's a credentials error or quota error
      if (error.message.includes('DECODER') || 
          error.message.includes('credentials') || 
          error.message.includes('authentication') ||
          error.message.includes('storage quota') ||
          error.message.includes('Service Accounts do not have')) {
        console.warn('⚠️  Service Account limitation detected. Switching to mock mode.');
        console.warn('💡 Tip: Use Google Workspace Shared Drive or OAuth delegation for real uploads.');
        this.useMock = true;
        const mockDriveUrl = `https://drive.google.com/file/d/mock-${Date.now()}/view`;
        console.log(`📁 Mock upload (fallback): ${fileName}`);
        return mockDriveUrl;
      }
      
      throw new Error(`Failed to upload file to Google Drive: ${error.message}`);
    }
  }
}

module.exports = new GoogleDriveService();
