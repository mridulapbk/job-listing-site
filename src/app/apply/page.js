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

  const handleSubmit = (e) => {
    e.preventDefault();

    
    console.log({
      name,
      email,
      phone,
      coverLetter,
      experience,
      resume,
      jobTitle,
    });

    alert(`Application submitted for ${jobTitle} by ${name}!`);
    router.push('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Apply for {jobTitle}</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        {/* Phone Number Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Phone Number:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        {/* Cover Letter Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Cover Letter:
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
              style={{ marginLeft: '10px', width: '100%', height: '100px' }}
            />
          </label>
        </div>

        {/* Experience Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Years of Experience:
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              min="0"
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        {/* Resume URL Field */}
        <div style={{ marginBottom: '10px' }}>
          <label>
            Resume (URL):
            <input
              type="url"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}
