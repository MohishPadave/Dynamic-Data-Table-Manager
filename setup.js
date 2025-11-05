
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Dynamic Data Table Manager...\n');

const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error(' Node.js 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('Node.js version check passed:', nodeVersion);

console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log(' Dependencies installed successfully');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, '# Add your environment variables here\n');
  console.log('Created .env.local file');
}

console.log('\n Setup complete!');
console.log('\nNext steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Try importing the sample-data.csv file to see the features in action');
