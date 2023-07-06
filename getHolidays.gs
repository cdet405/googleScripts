// fetch US holidays and insert them into spreadsheet
function getHolidays() {
  var url = 'https://holidayapi.netlify.app/api/holidays';
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());
  var holidays = [];

  for (var i = 0; i < data.holidays.length; i++) {
    var name = data.holidays[i].name.replace('(', '').replace(')', '');
    var date = data.holidays[i].prettyDate.replace('(', '').replace(')', '');
    var day = data.holidays[i].dayOfWeek.replace('(', '').replace(')', '');
    var observedOn = data.holidays[i].observedOn;

    var holiday = {
      'name': name,
      'date': date,
      'day': day,
      'observedOn': observedOn
    };

    holidays.push(holiday);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange(2, 1, holidays.length, 4);
  var values = holidays.map(function(holiday) {
    return [holiday.name, holiday.date, holiday.day, holiday.observedOn];
  });

  range.setValues(values);
  Logger.log('Script Complete');
}
