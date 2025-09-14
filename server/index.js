require("dotenv").config({ path: ".env" });
const express = require('express');
const app = express();
const cors = require("cors");
const { connectDB } = require('./config/db');
const path = require('path');

const DIRNAME = path.resolve();

app.use(express.json());
const PORT = process.env.PORT || 3000;

//cors configurations
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))


//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/trip", require("./routes/tripRoutes"));

//serve frontend from backend
app.use(express.static(path.join(DIRNAME, 'ai-trip-planner', 'dist')));
app.get('/*spat', (req, res) => {
    res.sendFile(path.resolve(DIRNAME, 'ai-trip-planner', 'dist', 'index.html'));
})


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening at PORT ${PORT}`);
})