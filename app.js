const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const maxRetries = 3; // Maximum number of retries
  let attempt = 0;
  let success = false;

  while (attempt < maxRetries && !success) {
    attempt++;
    console.log(`Attempt ${attempt} to submit the application...`);

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
     
      console.log("Navigating to job listing page...");
      await page.goto('https://codecrafttech.com/current-openings/?awsm_job_openings=technical-architect-sr-staff-engineer');

      
      if (attempt === 1) {
        throw new Error("Simulated failure to test retry functionality.");
      }

      
      console.log("Waiting for the form header...");
      await page.waitForSelector('xpath=//*[@id="wp--skip-link--target"]/div[3]/div/div[2]/div/h2');

      console.log("Filling out Full Name...");
      await page.fill('xpath=//*[@id="awsm-applicant-name"]', 'John Doe');

      console.log("Filling out Email...");
      await page.fill('xpath=//*[@id="awsm-applicant-email"]', 'john.doe@example.com');

      console.log("Filling out Phone...");
      await page.fill('xpath=//*[@id="awsm-applicant-phone"]', '1234567890');

      console.log("Filling out Cover Letter...");
      await page.fill(
        'xpath=//*[@id="awsm-cover-letter"]',
        'I am very interested in the Technical Architect position.'
      );

      
      console.log("Uploading Resume...");
      const resumePath = path.resolve(__dirname, 'MridulaPrabhakar_CV.pdf');
      await page.setInputFiles('xpath=//*[@id="awsm-application-file"]', resumePath);

      
      console.log("Selecting the privacy policy checkbox...");
      await page.click('xpath=//*[@id="awsm_form_privacy_policy"]');

      
      console.log("Attempting to handle the reCAPTCHA...");
      try {
        const frame = await page.frameLocator('iframe[title="reCAPTCHA"]').locator('#recaptcha-anchor');
        await frame.click();
      } catch (error) {
        console.warn("Automated reCAPTCHA handling failed. Please complete it manually.");
      }

    
      console.log("Submitting the application...");
      await page.click('xpath=//*[@id="awsm-application-submit-btn"]');
      await page.waitForTimeout(3000);

      console.log("Application submitted successfully.");
      success = true; 
    } catch (error) {
      console.error(`Error during attempt ${attempt}:`, error);

      if (attempt < maxRetries) {
        console.log("Retrying...");
      } else {
        console.error("Maximum retries reached. Exiting.");
      }
    } finally {
      await browser.close();
    }
  }


  if (!success) {
    console.error("Automation script failed after maximum retries.");
    process.exit(1); 
  }
})();
