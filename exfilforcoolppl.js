// flipper_zero_password_extractor.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'passwords.txt');

function extractPasswords() {
    // Simulate password extraction from the device
    const passwords = [
        'password1',
        'password2',
        'password3',
        // Add more passwords as needed
    ];

    fs.writeFileSync(outputPath, passwords.join('\n'), 'utf8');
    console.log('Passwords extracted and saved to', outputPath);
}

function createMassStorageDevice() {
    exec('mkfs.vfat /dev/sdX1', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating mass storage device: ${error.message}`);
            return;
        }
        console.log('Mass storage device created successfully.');
        copyPasswordsToDevice();
    });
}

function copyPasswordsToDevice() {
    exec(`cp ${outputPath} /media/flipper_zero/`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error copying passwords to device: ${error.message}`);
            return;
        }
        console.log('Passwords copied to mass storage device successfully.');
    });
}

// Execute the functions
extractPasswords();
createMassStorageDevice();
