import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import "blockly/msg/en";
import "./customBlocks/custom_Blocks";
import messages from "./messages/en.json";

export default function App() {
  const blocklyDiv = useRef(null);
  const [workspace, setWorkspace] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    Object.keys(messages).forEach((key) => {
      Blockly.Msg[key] = messages[key];
    });
  }, []);

  // Fetch the program's running status
  const checkStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/status");
      const data = await response.json();
      setIsRunning(data.running);
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  // Automatically check the status every 2 seconds
  useEffect(() => {
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const toolboxConfiguration = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Prikazy",
        colour: "#5CA699",
        contents: [
          { kind: "block", type: "lights" },
          { kind: "block", type: "lights-color" },
          { kind: "block", type: "say" },
          { kind: "block", type: "play" },
        ],
      },
      {
        kind: "category",
        name: "Logika",
        colour: "#5C81A6",
        contents: [
          { kind: "block", type: "controls_if" },
          { kind: "block", type: "logic_compare" },
          { kind: "block", type: "logic_operation" },
          { kind: "block", type: "logic_boolean" },
          { kind: "block", type: "value_literal" },
          { kind: "block", type: "get_variable" },
          { kind: "block", type: "assign_variable" },
          { kind: "block", type: "declare_variable" },
          { kind: "block", type: "wait_for" },
        ],
      },
      {
        kind: "category",
        name: "Cyklusy",
        colour: "#5CA65C",
        contents: [
          { kind: "block", type: "controls_whileUntil" },
          { kind: "block", type: "controls_flow_statements" },
        ],
      },
    ],
  };

  useEffect(() => {
    const workspaceInstance = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxConfiguration,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
      trashcan: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
    });

    setWorkspace(workspaceInstance);
  }, []);

  const runProgram = async () => {
    if (!workspace) {
      console.error("Workspace is not initialized!");
      return;
    }

    setIsRunning(true); // ✅ Disable buttons while running

    const code = javascriptGenerator.workspaceToCode(workspace);
    console.log("Generated Code:", code);

    try {
      // Save Code
      const saveResponse = await fetch("http://localhost:5000/save-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const saveData = await saveResponse.json();
      console.log("Save Response:", saveData);

      if (!saveResponse.ok) {
        throw new Error(`Failed to save: ${saveData.error}`);
      }

      // Run the saved program
      const runResponse = await fetch("http://localhost:5000/run-code", {
        method: "POST",
      });

      const runData = await runResponse.json();
      console.log("Run Response:", runData);

      if (!runResponse.ok) {
        throw new Error(`Execution error: ${runData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsRunning(false); // ✅ Re-enable buttons after execution
    }
  };

  const stopProgram = async () => {
    try {
      const response = await fetch("http://localhost:5000/stop-code", {
        method: "POST",
      });

      const data = await response.json();
      console.log("Stop Response:", data);

      setIsRunning(false); // ✅ Re-enable buttons after stopping
    } catch (error) {
      console.error("Error stopping program:", error);
    }
  };

  return (
    <div style={{ height: "105vh", width: "100vw" }}>
      <div ref={blocklyDiv} style={{ height: "80%", width: "100%" }}></div>
      <button
        onClick={runProgram}
        style={{ width: "60%", padding: "10px", fontSize: "16px", marginLeft: "20%" }}
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Run Program"}
      </button>
      <button
        onClick={stopProgram}
        style={{ width: "60%", padding: "10px", fontSize: "16px", marginLeft: "20%",marginTop: "7px", backgroundColor: "red", color: "white" }}
        disabled={!isRunning} // ✅ Only enabled when a program is running
      >
        Stop Program
      </button>
    </div>
  );
}

