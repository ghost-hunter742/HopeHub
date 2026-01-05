// Add this route to your existing Node.js server
app.get('/api/blood-inventory', async (req, res) => {
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        
        // This query calculates:
        // 1. Total quantity per blood type per hospital
        // 2. The days remaining until the oldest bag in that category expires
        const query = `
            SELECT 
                hospital_name, 
                city, 
                blood_type, 
                SUM(quantity) as quantity, 
                DATEDIFF(MIN(expiry_date), CURDATE()) as days_remaining 
            FROM blood_inventory_table 
            WHERE expiry_date > CURDATE() 
            GROUP BY hospital_name, blood_type, city
            ORDER BY hospital_name ASC`;

        const [rows] = await conn.execute(query);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (conn) await conn.end();
    }
});