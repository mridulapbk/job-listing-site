const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule the script to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running automation script...');
  exec('go run main.go', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      return;
    }
    console.log(`Script stdout: ${stdout}`);
  });
});

console.log('Scheduler is running...');
