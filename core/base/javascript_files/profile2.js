const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/*
  MOCK DATABASE
  (Replace later with MongoDB / SQL)
*/
const profileData = {
  name: "Satyam Kumar Mishra",
  role: "Patient",
  age: 22,
  bloodGroup: "B+",
  city: "Gorakhpur, UP",
  organNeeded: "Kidney",
  hospital: "AIIMS Delhi",
  doctor: "Dr. R. Sharma",
  status: "Verified by Hospital"
};

/*
  API: Get user profile
*/
app.get("/api/profile", (req, res) => {
  res.status(200).json(profileData);
});

/*
  API: Login (mock)
*/
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return res.json({
      success: true,
      message: "Login successful"
    });
  }

  res.status(400).json({
    success: false,
    message: "Invalid credentials"
  });
});

/*
  API: Logout (mock)
*/
app.post("/api/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

/*
  SERVER START
*/
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 HopeHub backend running on http://localhost:${PORT}`);
});
