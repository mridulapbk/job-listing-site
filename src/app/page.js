"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleApply = (jobTitle) => {
   
    router.push(`/apply?jobTitle=${encodeURIComponent(jobTitle)}`);
  };

  return (
    <div>
      <h1>Job Listings</h1>

      {/* Software Engineer Job Description */}
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
        <h2>Software Engineer</h2>
        <p>Exciting opportunity for a Software Engineer to join our team.</p>
        <h3>Responsibilities:</h3>
        <ul>
          <li>Develop and maintain web applications.</li>
          <li>Collaborate with cross-functional teams.</li>
          <li>Write clean, efficient code.</li>
        </ul>
        <h3>Requirements:</h3>
        <ul>
          <li>Experience with JavaScript frameworks (React, Angular).</li>
          <li>Strong knowledge of HTML, CSS, and JavaScript.</li>
        </ul>
        <button onClick={() => handleApply("Software Engineer")}>
          Apply for Software Engineer
        </button>
      </div>

      {/* Data Analyst Job Description */}
      <div style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
        <h2>Data Analyst</h2>
        <p>We are looking for a Data Analyst to analyze large datasets.</p>
        <h3>Responsibilities:</h3>
        <ul>
          <li>Analyze datasets and provide insights.</li>
          <li>Work closely with the product team.</li>
          <li>Create dashboards and reports.</li>
        </ul>
        <h3>Requirements:</h3>
        <ul>
          <li>Proficiency in SQL and Excel.</li>
          <li>Experience with data visualization tools (Tableau, Power BI).</li>
        </ul>
        <button onClick={() => handleApply("Data Analyst")}>
          Apply for Data Analyst
        </button>
      </div>
    </div>
  );
}
