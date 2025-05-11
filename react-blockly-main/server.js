const express = require("express");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "program.js");

let isRunning = false; // ✅ Track execution state
let childProcess = null; // ✅ Store running process

// Route to save Blockly-generated code, including import statement
app.post("/save-code", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Ensure the script runs asynchronously
  const fullCode = `
const functions = require("./functions.js");
(async () => {
  try {
    ${code}
    console.log("✅ Program finished execution!");
  } catch (error) {
    console.error("❌ Error in program execution:", error);
  }
})();
`;

  fs.writeFile(filePath, fullCode, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save code" });
    }
    res.json({ message: "Code saved successfully with functions.js dynamically imported!" });
  });
});

// Route to run the saved program.js
app.post("/run-code", (req, res) => {
  if (isRunning) {
    return res.status(400).json({ error: "Program is already running!" });
  }

  isRunning = true;
  childProcess = spawn("node", [filePath], { stdio: "pipe" });

  // Capture output
  childProcess.stdout.on("data", (data) => {
    console.log(`Program Output: ${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    console.error(`Error Output: ${data}`);
  });

  childProcess.on("exit", (code) => {
    isRunning = false;
    console.log(`Program exited with code ${code}`);
  });

  res.json({ message: "Program started!" });
});

// Route to stop execution
app.post("/stop-code", (req, res) => {
  if (childProcess) {
    childProcess.kill("SIGTERM"); // 🔥 Force termination
    isRunning = false;
    res.json({ message: "Program execution stopped!" });
  } else {
    res.status(400).json({ error: "No program is currently running." });
  }
});

// Route to check program status
app.get("/status", (req, res) => {
  res.json({ running: isRunning });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
