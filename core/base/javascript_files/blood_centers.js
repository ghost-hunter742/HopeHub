const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'hope_hub'
};

// API Endpoint for Blood Data
app.get('/api/blood-requirements', async (req, res) => {
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        
        // WE ONLY SELECT: type, quantity, level, and location details
        // We EXCLUDE: patient names, IDs, or phone numbers
        const query = `
            SELECT 
                center_name, 
                blood_type, 
                units_needed, 
                urgency_level, 
                location_address, 
                city 
            FROM blood_requests_table 
            WHERE status = 'Open' 
            ORDER BY urgency_level DESC`;

        const [rows] = await conn.execute(query);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch data" });
    } finally {
        if (conn) await conn.end();
    }
});

app.listen(3000, () => console.log('Blood Monitor active on port 3000'));