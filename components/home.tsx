// app/page.tsx

'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Chama a Server Action
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    setGreeting(data.greeting);
  };

  return (
    <div>
      <h1>Enter your name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit">Submit</button>
      </form>

      {greeting && <p>{greeting}</p>}
    </div>
  );
}
