const prompt = require('prompt-sync')();
const bcrypt = require('bcryptjs');

const password = prompt('Enter your password: ');
const password2 = prompt('Confirm your password: ');

async function createHash() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Hashed password:', hash);

    const isMatch = await bcrypt.compare(password2, hash);
    if (isMatch) {
        console.log('Passwords match!');
    } else {
        console.log('Passwords do not match!');
    }
}

createHash();