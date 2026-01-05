const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'hope_hub'
};

// Main Route to Handle Appointment Submission
app.post('/submit-appointment', async (req, res) => {
    const { hospital, date, time, name, doctor_id } = req.body;
    const requestedHour = time.split(':')[0];

    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        // --- STEP 1: CHECK DOCTOR LEAVE ---
        const [leaveRows] = await connection.execute(
            `SELECT id FROM doctor_leave_table 
             WHERE doctor_id = ? AND leave_date = ?`,
            [doctor_id, date]
        );

        if (leaveRows.length > 0) {
            return res.send(`
                <script>
                    alert("The doctor is on leave on ${date}. Please choose another date.");
                    window.history.back();
                </script>
            `);
        }

        // --- STEP 2: CHECK HOURLY CAPACITY (Max 20) ---
        const [countRows] = await connection.execute(
            `SELECT COUNT(*) as total FROM appointment_table 
             WHERE appointment_date = ? AND HOUR(appointment_time) = ?`,
            [date, requestedHour]
        );

        if (countRows[0].total >= 20) {
            return res.send(`
                <script>
                    alert("This time slot is full (20/20). Please pick a different hour.");
                    window.history.back();
                </script>
            `);
        }

        // --- STEP 3: ADD DATA TO DATABASE ---
        const sqlInsert = `INSERT INTO appointment_table 
            (hospital_name, appointment_date, appointment_time, patient_name, doctor_id) 
            VALUES (?, ?, ?, ?, ?)`;
        
        await connection.execute(sqlInsert, [hospital, date, time, name, doctor_id]);

        // Success Response
        res.send(`
            <div style="text-align:center; padding:50px; font-family:Arial;">
                <h1 style="color:#6ed8fe;">Success!</h1>
                <p>Your appointment at <b>${hospital}</b> has been booked for ${date} at ${time}.</p>
                <a href="/appointment.html" style="color:#53b2f6;">Go Back</a>
            </div>
        `);

    } catch (error) {
        console.error(error);
        res.status(500).send("A server error occurred. Please try again later.");
    } finally {
        if (connection) await connection.end();
    }
});

app.listen(3000, () => console.log('Hope Hub Server running on port 3000'));