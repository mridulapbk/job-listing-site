const mysql = require('mysql2/promise');
const { chromium } = require('playwright');

(async () => {
 
  const connection = await mysql.createConnection({
    host: 'localhost', 
    user: 'root',      
    password: 'Root@1234#', 
    database: 'job_application_db' 
  });

  
  const [rows] = await connection.execute('SELECT * FROM job_applications WHERE id = 1'); 
  const applicationData = rows[0];

 
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  
  console.log('Navigating to job listings...');
  await page.goto('http://localhost:3000');

  
  console.log('Clicking Apply button...');
  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Apply for Software Engineer')
  ]);

  console.log('Waiting for the application form...');
  await page.waitForSelector('form');

 
  console.log('Filling in First Name...');
  await page.fill('body > div > form > div:nth-child(1) > label > input', applicationData.firstName);

  console.log('Filling in Last Name...');
  await page.fill('body > div > form > div:nth-child(2) > label > input', applicationData.lastName);

  console.log('Filling in Phone Number...');
  await page.fill('body > div > form > div:nth-child(3) > label > input[type=tel]', applicationData.phone);

  console.log('Filling in Cover Letter...');
  await page.fill('body > div > form > div:nth-child(4) > label > textarea', applicationData.coverLetter);

  console.log('Filling in Years of Experience...');
  await page.fill('body > div > form > div:nth-child(5) > label > input[type=number]', applicationData.yearsOfExperience.toString());

  console.log('Filling in Resume URL...');
  await page.fill('body > div > form > div:nth-child(6) > label > input[type=url]', applicationData.resumeUrl);

  console.log('Submitting the form...');
  await page.click('button[type="submit"]');

  console.log('Waiting to observe the result...');
  await page.waitForTimeout(3000);

  console.log('Closing the browser...');
  await browser.close();

  
  await connection.end();
})();
