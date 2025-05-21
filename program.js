
const functions = require("./functions.js");
(async () => {
  try {
    while (true) {
  functions.lights("off");
}

    console.log("✅ Program finished execution!");
  } catch (error) {
    console.error("❌ Error in program execution:", error);
  }
})();
