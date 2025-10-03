const fs = require('fs');
const { exec } = require('child_process');

// Try using chrome/chromium headless for conversion
exec('which google-chrome chromium-browser chromium', (error, stdout) => {
  const browser = stdout.trim().split('\n')[0];
  
  if (!browser) {
    console.log('No browser found for conversion');
    console.log('Please use an online converter or install Inkscape');
    process.exit(1);
  }
  
  const cmd = `${browser} --headless --screenshot=/home/mohsen/sylvanity-training-site/public/attachments/sylvanity-training-flyer-final.png --window-size=750,1000 --default-background-color=0 /home/mohsen/sylvanity-training-site/public/attachments/sylvanity-training-flyer-final.svg`;
  
  exec(cmd, (err) => {
    if (err) {
      console.error('Conversion failed:', err);
    } else {
      console.log('Conversion successful!');
    }
  });
});
