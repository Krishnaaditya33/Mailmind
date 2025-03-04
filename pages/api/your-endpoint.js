// pages/api/someTask.js
import { someServerFunction } from 'some-server-library'; // may use `net`

export default async function handler(req, res) {
  try {
    const result = await someServerFunction();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
