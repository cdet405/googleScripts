// Returns Data Types of Cells in Range
function getDataTypesOfCells() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Copy of Project 100');
  var range = sheet.getRange('K5:P11');
  var values = range.getValues();
  var dataTypes = [];

  for (var i = 0; i < values.length; i++) {
    var row = [];
    for (var j = 0; j < values[i].length; j++) {
      var cellValue = values[i][j];
      var dataType = typeof cellValue;

      if (dataType === 'object' && cellValue instanceof Date) {
        dataType = 'date';
      }

      row.push(dataType);
    }
    dataTypes.push(row);
  }

  Logger.log('[Copy of Project 100] Data types of cells K5:P11 are: ');
  dataTypes.forEach(function (row) {
    Logger.log(row.join(', '));
  });
}
