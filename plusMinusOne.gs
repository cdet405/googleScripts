// used for buttons to raise a cells value by 1
function plusOne() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = sheet.getRange("A1"); // specify cell (or modify to currentCell)
  var value = cell.getValue();
  cell.setValue(value + 1);
};
// used for buttons to decrease a cells value by 1
function minusOne() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = sheet.getRange("A1"); // specify cell (or modify to currentCell)
  var value = cell.getValue();
  cell.setValue(value - 1);
};
