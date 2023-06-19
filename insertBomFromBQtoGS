// enable bq connector

/****************************************** 
  Randy the Racoon He will run this script
   fetch the results from Big Query
  and insert it to your googlesheet
                 __        .-.
             .-"` .`'.    /\\|
     _(\-/)_" ,  .   ,\  /\\\/
    {(#b^d#)} .   ./,  |/\\\/
    `-.(Y).-`  ,  |  , |\.-`
         /~/,_/~~~\,__.-`
        ////~    // ~\\
      ==`==`   ==`   ==`
*****************************************/

function runQuery() {
  // Insert ProjectID
  const projectId = '<INSERT PROJECT ID>>';

  const request = {
    // Add Query in annoying format
    // Make sure to include leading/trailing <space> for concat
    query: ' SELECT o.product_code output, i.product_code input, i.quantity, i.input_uom_name UoM, b.active, b.is_built_on_the_fly BotF, IFNULL(b.warehouse_name,"HQ Warehouse") warehouse_name '
      + ' FROM `<PROJECT>.<DATASET>.production_boms` b'
      + ' LEFT JOIN UNNEST(inputs) i'
      + ' LEFT JOIN UNNEST(outputs) o'
      + ' ORDER BY o.product_code;',
    useLegacySql: false
  };
  let queryResults = BigQuery.Jobs.query(request, projectId);
  const jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  let sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  // Get all the rows of results.
  let rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }

  if (!rows) {
    Logger.log('No rows returned.');
    return;
  }
  // Creates a new spreadsheet
  //const spreadsheet = SpreadsheetApp.create('BiqQuery Results');
  
  // Selects current spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('BQallBom');

  // clears data already on the sheet - WILL ERROR IF SHEET IS ALREADY EMPTY
  sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()).clearContent();


  // Append the headers.
  const headers = queryResults.schema.fields.map(function(field) {
    return field.name;
  });
  sheet.appendRow(headers);

  // Append the results.
  var data = new Array(rows.length);
  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].f;
    data[i] = new Array(cols.length);
    for (let j = 0; j < cols.length; j++) {
      data[i][j] = cols[j].v;
    }
  }
  sheet.getRange(2, 1, rows.length, headers.length).setValues(data);

  Logger.log('Results Inserted: %s',
      spreadsheet.getUrl());
}
