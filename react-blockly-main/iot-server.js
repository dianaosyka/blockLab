const express = require("express");

const app = express();
const PORT = 6000;

app.use(express.json());

// Fake IoT Device Endpoint
app.post("/iot-action", (req, res) => {
    try{
        const { command, value } = req.body;
        console.log(`📡 IoT Device received: Command = ${command}, Value = ${value}`);
        res.json({ message: `IoT Device executed: ${command} with value: ${value}` });
    } catch (error) {
        console.error("❌ IoT Request Failed:", error);
    }
});

app.listen(PORT, () => {
  console.log(`🚀 IoT Simulation Server running on http://localhost:${PORT}`);
});
