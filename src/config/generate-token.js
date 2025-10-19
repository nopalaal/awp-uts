const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load OAuth credentials
const CREDENTIALS_PATH = path.join(__dirname, 'oauth-credentials.json');
const TOKEN_PATH = path.join(__dirname, 'oauth-token.json');

// Scopes for Google Drive
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

async function generateToken() {
  try {
    // Check if credentials exist
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.error('❌ oauth-credentials.json not found!');
      console.log('📝 Please download OAuth credentials from Google Cloud Console');
      return;
    }

    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_id, client_secret, redirect_uris } = credentials.web;

    // Create OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Generate authorization URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('\n🔐 Google Drive OAuth Setup\n');
    console.log('📋 Follow these steps:\n');
    console.log('1. Open this URL in your browser:');
    console.log('   ' + authUrl);
    console.log('\n2. Login with your Google account');
    console.log('3. Click "Allow" to grant access');
    console.log('4. Copy the authorization code from the URL\n');

    // Get code from user
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('🔑 Paste the authorization code here: ', async (code) => {
      rl.close();

      try {
        // Exchange code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        
        // Save tokens to file
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        
        console.log('\n✅ Success! Token saved to:', TOKEN_PATH);
        console.log('\n📝 Token details:');
        console.log('   - Access Token: ✓');
        console.log('   - Refresh Token: ✓');
        console.log('   - Expiry: ' + new Date(tokens.expiry_date).toLocaleString());
        console.log('\n🚀 You can now upload files to Google Drive!');
        console.log('   Restart your application to use OAuth authentication.\n');
        
      } catch (error) {
        console.error('\n❌ Error getting token:', error.message);
        console.log('\n💡 Tips:');
        console.log('   - Make sure you copied the FULL authorization code');
        console.log('   - Code should start with "4/"');
        console.log('   - Try generating a new code and paste immediately\n');
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
generateToken();
