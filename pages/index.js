// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/labelEmails')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage('Error occurred');
      });
  }, []);

  return (
    <div>
      <h1>Welcome to Mailmind!</h1>
      <p>{message}</p>
    </div>
  );
}
