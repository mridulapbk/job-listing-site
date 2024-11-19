"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ApplicationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState('');

  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('jobTitle') || 'Job';
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      name,
      email,
      phone,
      coverLetter,
      experience,
      resume,
      jobTitle,
    };

    try {
      const response = await fetch('http://localhost:5000/api/job-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Application submitted for ${jobTitle} by ${name}!`);
        
        setName('');
        setEmail('');
        setPhone('');
        setCoverLetter('');
        setExperience('');
        setResume('');
        router.push('/');
      } else {
        alert(`Error: ${result.error || 'Failed to submit application.'}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Apply for {jobTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Cover Letter:
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Experience:
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Resume (URL):
            <input
              type="url"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}
