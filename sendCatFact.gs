// This was for learning..
//TODO: insert your token from url
function sendCatFact() {
  const token = '<<GET FROM WEBSITE>>';
  var url = 'https://catfact.ninja/fact';
  var options = {
    "method": "GET",
    "headers": { 
      "accept": 'application/json',
      "X-CSRF-TOKEN": token
    }
  }
  var r = UrlFetchApp.fetch(url,options);
  var data = JSON.parse(r.getContentText());
  let msg = data.fact
  const recipient = 'me@example.com';
  const homies = 'name1@3example.com,name2@example.com,name3@example.com' 
  const subject = 'A little something to start the morning'
  const message = "<p>Good Morning,</p><p>You know, there is no better way to start the morning than with a cat fact!<br>Enjoy!</p><p>"+msg+"</p>";
  MailApp.sendEmail(recipient, subject, message,{htmlBody:message, bcc:homies});
}
