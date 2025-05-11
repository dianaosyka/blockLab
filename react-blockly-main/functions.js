// const LINK = "https://api.openlab.kpi.fei.tuke.sk";
const LINK = "http://localhost:6000";

async function lights(command) {
  const fetch = (await import("node-fetch")).default; // Dynamic import

  try {
    const response = await fetch(`${LINK}/openlab/lights/all/${command}`, {
      method: "GET"
    });

    const data = await response.json();
    console.log("✅ IoT Response:", data.message);
  } catch (error) {
    console.error("❌ IoT Request Failed:", error);
  }
}

async function wait_for(num) {
  return new Promise(resolve => setTimeout(resolve, num * 1000));
}

async function say(word) {
  const fetch = (await import("node-fetch")).default; // Dynamic import

  try {
    const response = await fetch(`${LINK}/openlab/audio/say/${word}`, {
      method: "GET"
    });

    const data = await response.json();
    console.log("✅ IoT Response:", data.message);
  } catch (error) {
    console.error("❌ IoT Request Failed:", error);
  }
}

async function play(sound) {
  const fetch = (await import("node-fetch")).default; // Dynamic import

  try {
    const response = await fetch(`${LINK}/openlab/audio/play/${sound}`, {
      method: "GET"
    });

    const data = await response.json();
    console.log("✅ IoT Response:", data.message);
  } catch (error) {
    console.error("❌ IoT Request Failed:", error);
  }
}

module.exports = {lights, wait_for, say, play};
//https://api.openlab.kpi.fei.tuke.sk/openlab/lights/all/off/5000
//https://api.openlab.kpi.fei.tuke.sk/openlab/lights/all/on/5000