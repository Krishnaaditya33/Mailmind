// pages/api/authenticate.js
import { authenticate } from 'your-auth-library';

export default async function handler(req, res) {
  try {
    const client = await authenticate({
      scopes: YOUR_SCOPES,
      keyfilePath: YOUR_CREDENTIALS_PATH,
      port: 3001,  // Use a different port here
    });
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
