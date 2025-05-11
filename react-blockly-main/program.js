
const functions = require("./functions.js");
(async () => {
  try {
    let nazov = "5";
nazov = "6";
if (nazov == "5") {
  functions.lights("on");
}

    console.log("✅ Program finished execution!");
  } catch (error) {
    console.error("❌ Error in program execution:", error);
  }
})();
