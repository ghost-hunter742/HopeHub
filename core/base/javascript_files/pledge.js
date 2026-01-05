const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY';

app.post('/api/verify-pledge', async (req, res) => {
    const { name, mobile, captchaToken } = req.body;

    if (!captchaToken) {
        return res.status(400).json({ success: false, message: "Captcha token missing" });
    }

    try {
        // Verify token with Google
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
        
        const response = await axios.post(googleVerifyUrl);
        const { success } = response.data;

        if (success) {
            // OPTIONAL: Save the user's intent to your MySQL database here
            // await db.query('INSERT INTO pledges (name, mobile) VALUES (?, ?)', [name, mobile]);
            
            res.json({ success: true, message: "Verification successful" });
        } else {
            res.status(400).json({ success: false, message: "Invalid CAPTCHA. Try again." });
        }
    } catch (error) {
        console.error("reCAPTCHA Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));