import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace with your actual API key and file paths
const API_KEY = "AIzaSyCVs2GVPL55Xa6-nABR7PdnWuqPRgp1n8E"; // Consider using environment variables for sensitive data
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.send'
];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credential.json');

let labelMap = [];

// Load saved credentials if they exist
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

// Save credentials for future use
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

// Authorize and return an authenticated client
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

// List Gmail labels and process unread messages
async function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.labels.list({ userId: 'me' });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`${label.name}: ${label.id}`);
    labelMap.push({ name: label.name, id: label.id });
  });
  
  // List unread messages
  const res1 = await gmail.users.messages.list({
    userId: 'me',
    q: 'is:unread',
    maxResults: 5,
  });
  const messages = res1.data.messages;
  if (messages && messages.length > 0) {
    for (let message of messages) {
      const email = await getEmail(message.id, auth);
      try {
        const labelsGenerated = await generateEmailLabels(email.data.snippet);
        console.log('Generated labels:', labelsGenerated);
        if (labelsGenerated.length > 0) {
          for (const labelName of labelsGenerated) {
            if (!labelExists(labelName, labelMap)) {
              await createLabel(auth, labelName);
            }
            await moveEmailToLabel(auth, email.data.id, labelName, email.data.labelIds);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

function labelExists(labelName, labelMap) {
  return labelMap.some(label => label.name === labelName);
}

async function moveEmailToLabel(auth, messageId, labelName, removeId) {
  const gmail = google.gmail({ version: 'v1', auth });
  try {
    const res = await gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      requestBody: {
        addLabelIds: [labelName], // Ensure this is the label ID if required
        removeLabelIds: removeId ? [removeId] : [],
      },
    });
    console.log('Email moved to label:', res.data);
  } catch (err) {
    console.error('Error moving email:', err);
  }
}

async function createLabel(auth, labelName) {
  const gmail = google.gmail({ version: 'v1', auth });
  const labelObject = {
    name: labelName,
    labelListVisibility: 'labelShow',
    messageListVisibility: 'show',
  };

  try {
    const response = await gmail.users.labels.create({
      userId: 'me',
      requestBody: labelObject,
    });
    console.log(`Created label: ${response.data.name}`);
    labelMap.push({ name: response.data.name, id: response.data.id });
  } catch (error) {
    console.error('Error creating label:', error);
  }
}

async function generateEmailLabels(emailContent) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Given the following email content, suggest two appropriate label names (only the label names, separated by commas): ${emailContent}`;
  const response = await model.generateContent([prompt]);
  const labels = response.response.text().split(',').map(label => label.trim());
  return labels;
}

async function getEmail(messageId, auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
  });
  return res;
}

async function main() {
  try {
    const auth = await authorize();
    await listLabels(auth);
  } catch (error) {
    console.error('Error in main:', error);
  }
}

// This is the API route handler for /api/labelEmails
export default async function handler(req, res) {
  try {
    await main();
    res.status(200).json({ message: 'Email labeling process initiated.' });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: error.message });
  }
}
