import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

const categoryColors = {
  commands: "#e8be00",
  logic: "#8c00ff",
  loops: "#00ff26",
  values: "#0ac4a2"
};

// Reusable validator to limit input length
const maxLengthValidator = (max) => (text) => {
  return text.length > max ? text.slice(0, max) : text;
};

// Override default block colors to match your categories
const originalIfInit = Blockly.Blocks['controls_if'].init;
Blockly.Blocks['controls_if'].init = function () {
  originalIfInit.call(this);
  this.setColour(categoryColors.logic);
};
const originalCompareInit = Blockly.Blocks['logic_compare'].init;
Blockly.Blocks['logic_compare'].init = function () {
  originalCompareInit.call(this);
  this.setColour(categoryColors.logic);
};
const originalOperationInit = Blockly.Blocks['logic_operation'].init;
Blockly.Blocks['logic_operation'].init = function () {
  originalOperationInit.call(this);
  this.setColour(categoryColors.logic);
};
const originalBooleanInit = Blockly.Blocks['logic_boolean'].init;
Blockly.Blocks['logic_boolean'].init = function () {
  originalBooleanInit.call(this);
  this.setColour(categoryColors.logic);
};
const originalWhileInit = Blockly.Blocks['controls_whileUntil'].init;
Blockly.Blocks['controls_whileUntil'].init = function () {
  originalWhileInit.call(this);
  this.setColour(categoryColors.loops);
};
const originalFlowInit = Blockly.Blocks['controls_flow_statements'].init;
Blockly.Blocks['controls_flow_statements'].init = function () {
  originalFlowInit.call(this);
  this.setColour(categoryColors.loops);
};

// Custom Blocks
Blockly.Blocks["wait_for"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Cakať")
      .appendField(new Blockly.FieldNumber(0, 0, 100, 1), "SEC")
      .appendField("sekúnd");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.logic);
    this.setTooltip("Turns the light on or off.");
  },
};
javascriptGenerator.forBlock["wait_for"] = function (block) {
  const secnd = block.getFieldValue("SEC");
  return `await functions.wait_for(${secnd});\n`;
};

Blockly.Blocks["read_sensor"] = {
  init: function () {
    this.appendDummyInput().appendField("Read sensor value");
    this.setOutput(true, "Number");
    this.setColour(categoryColors.logic);
    this.setTooltip("Reads the value of a sensor.");
  },
};
javascriptGenerator.forBlock["read_sensor"] = function () {
  return ["readSensor()", javascriptGenerator.ORDER_NONE];
};

Blockly.Blocks["lights"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Nastavíť svetla")
      .appendField(new Blockly.FieldDropdown([
        ["Zapínuť svetlo", "on"],
        ["Vypnuť svetlo", "off"],
      ]), "COMMAND");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.commands);
    this.setTooltip("Zapína biele svetlo alebo vypína svetlo");
  },
};
javascriptGenerator.forBlock["lights"] = function (block) {
  const command = block.getFieldValue("COMMAND");
  return `functions.lights("${command}");\n`;
};

Blockly.Blocks["lights-color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Nastavíť farbu svetla")
      .appendField(new Blockly.FieldDropdown([
        ["červená", "ff0000"],
        ["zelená", "00ff00"],
        ["modrá", "0000ff"],
        ["žltá", "ffff00"],
        ["oranžová", "ffa500"],
        ["ružová", "ff69b4"],
        ["fialová", "800080"],
        ["hnedá", "8b4513"],
        ["tyrkysová", "00ffff"],
        ["tmavomodrá", "00008b"],
        ["svetlozelená", "90ee90"],
        ["svetlomodrá", "add8e6"],
        ["svetloružová", "ffb6c1"],
        ["svetlofialová", "dda0dd"],
        ["svetlohnedá", "d2b48c"]
      ]), "COMMAND");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.commands);
    this.setTooltip("Nastaví farby svetla");
  },
};
javascriptGenerator.forBlock["lights-color"] = function (block) {
  const command = block.getFieldValue("COMMAND");
  return `functions.lights("${command}");\n`;
};

Blockly.Blocks["say"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Povedať")
      .appendField(new Blockly.FieldDropdown([
        ["Vitajte v OpenLab-e", "Vitajte v OpenLab-e"],
        ["Dovidenia", "Dovidenia"],
        ["Milujem Programovanie", "Milujem Programovanie"]
      ]), "WORD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.commands);
    this.setTooltip("Hovorí vybrané slovo");
  },
};
javascriptGenerator.forBlock["say"] = function (block) {
  const word = block.getFieldValue("WORD");
  return `functions.say("${word}");\nawait functions.wait_for(5);\n`;
};

Blockly.Blocks["play"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Prehrať zvuk")
      .appendField(new Blockly.FieldDropdown([
        ["Priroda", "https://drive.google.com/file/d/1uFdzMhLlYZnMPBpyqePznELT646wJX7x/view?usp=drive_link"],
        ["Výstraha", "https://drive.google.com/file/d/1E1v8ZqU3QlA8VcZww-cUTEteJXzxc4E4/view?usp=drive_link"],
        ["Potlesk", "https://drive.google.com/file/d/1dG6iCJ7n8cZAAaNqRejT5QMASbvugltb/view?usp=drive_link"]
      ]), "SOUND");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.commands);
    this.setTooltip("Prehrá vybraný zvuk");
  },
};
javascriptGenerator.forBlock["play"] = function (block) {
  const sound = block.getFieldValue("SOUND");
  return `functions.play("${sound}");\nawait functions.wait_for(5);\n`;
};

Blockly.Blocks["declare_variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Ohlásiť premennú")
      .appendField(new Blockly.FieldTextInput("nazov", maxLengthValidator(30)), "VAR")
      .appendField("so hodnotou")
      .appendField(new Blockly.FieldTextInput("", maxLengthValidator(30)), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.values);
    this.setTooltip("Deklaruje novú premennú s reťazcovou hodnotou.");
  },
};
javascriptGenerator.forBlock["declare_variable"] = function (block) {
  const varName = block.getFieldValue("VAR");
  const value = JSON.stringify(block.getFieldValue("VALUE"));
  return `let ${varName} = ${value};\n`;
};

Blockly.Blocks["assign_variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Priradiť")
      .appendField(new Blockly.FieldTextInput("", maxLengthValidator(30)), "VALUE")
      .appendField("do premennej")
      .appendField(new Blockly.FieldTextInput("nazov", maxLengthValidator(30)), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(categoryColors.values);
    this.setTooltip("Priradí novú hodnotu do existujúcej premennej.");
  },
};
javascriptGenerator.forBlock["assign_variable"] = function (block) {
  const varName = block.getFieldValue("VAR");
  const value = JSON.stringify(block.getFieldValue("VALUE"));
  return `${varName} = ${value};\n`;
};

Blockly.Blocks["value_literal"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Hodnota")
      .appendField(new Blockly.FieldTextInput("", maxLengthValidator(30)), "LITERAL");
    this.setOutput(true, "String");
    this.setColour(categoryColors.values);
    this.setTooltip("Vracia hodnotu ako reťazec.");
  },
};
javascriptGenerator.forBlock["value_literal"] = function (block) {
  const value = block.getFieldValue("LITERAL");
  return [JSON.stringify(value), javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks["get_variable"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Hodnota premennej")
      .appendField(new Blockly.FieldTextInput("nazov", maxLengthValidator(30)), "VAR_NAME");
    this.setOutput(true, "String");
    this.setColour(categoryColors.values);
    this.setTooltip("Získa aktuálnu hodnotu premennej");
  },
};
javascriptGenerator.forBlock["get_variable"] = function (block) {
  const name = block.getFieldValue("VAR_NAME");
  return [name, javascriptGenerator.ORDER_ATOMIC];
};
