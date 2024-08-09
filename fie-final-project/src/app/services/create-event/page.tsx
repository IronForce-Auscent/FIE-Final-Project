"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEvent() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, date, details }),
    });

    if (response.ok) {
      router.push('/dashboard');  // Redirect to /dashboard
      router.refresh(); 
    } else {
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border p-2"
      />
      <textarea
        placeholder="Event Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="border p-2"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Create Event
      </button>
    </form>
  );
}
