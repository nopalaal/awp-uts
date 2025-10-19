const express = require('express');
const router = express.Router();

// OAuth2 callback handler
router.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  const error = req.query.error;

  if (error) {
    return res.send(`
      <html>
        <head>
          <title>OAuth Error</title>
          <style>
            body { font-family: Arial; padding: 40px; max-width: 600px; margin: 0 auto; }
            .error { background: #fee; border: 1px solid #fcc; padding: 20px; border-radius: 8px; color: #c00; }
          </style>
        </head>
        <body>
          <h1>❌ OAuth Authorization Failed</h1>
          <div class="error">
            <strong>Error:</strong> ${error}
          </div>
          <p>Please try again.</p>
        </body>
      </html>
    `);
  }

  if (code) {
    return res.send(`
      <html>
        <head>
          <title>OAuth Success</title>
          <style>
            body { font-family: Arial; padding: 40px; max-width: 600px; margin: 0 auto; }
            .success { background: #efe; border: 1px solid #cfc; padding: 20px; border-radius: 8px; }
            .code { background: #f5f5f5; padding: 15px; border-radius: 4px; font-family: monospace; word-break: break-all; margin: 10px 0; }
            button { background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
            button:hover { background: #45a049; }
          </style>
          <script>
            function copyCode() {
              const code = document.getElementById('authCode').textContent;
              navigator.clipboard.writeText(code).then(() => {
                document.getElementById('copyBtn').textContent = '✓ Copied!';
                setTimeout(() => {
                  document.getElementById('copyBtn').textContent = '📋 Copy Code';
                }, 2000);
              });
            }
          </script>
        </head>
        <body>
          <h1>✅ Authorization Successful!</h1>
          <div class="success">
            <p><strong>Your authorization code:</strong></p>
            <div class="code" id="authCode">${code}</div>
            <button id="copyBtn" onclick="copyCode()">📋 Copy Code</button>
          </div>
          <p><strong>Next steps:</strong></p>
          <ol>
            <li>Copy the code above (or click the button)</li>
            <li>Go back to your terminal</li>
            <li>Paste the code when prompted</li>
          </ol>
        </body>
      </html>
    `);
  }

  res.send(`
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h1>⚠️ No code received</h1>
        <p>Please try the authorization process again.</p>
      </body>
    </html>
  `);
});

module.exports = router;
