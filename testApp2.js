//****************************************************************
//App that calls Published APIs from Catalog2 developers portal.
//Calling the GetTweetsByLocation API. gets one paramter - the location of the tweets we want to filter by
//****************************************************************
var http = require("http");
var https = require("https");
var tools = require("./tools.js");

//**********************************************************
//Requesting the data - Calling the API
//**********************************************************


var dict;
var htmlTable ='';
var APIpath = "/eladorgbl1-eladspacebl1/catalog2/api/GetTweetsByLocation?location=";
var options = {
  "method": "GET",
  "hostname": "api.eu.apiconnect.ibmcloud.com",
  "port": null,
  "path": APIpath + process.argv[2]+"",
  "headers": {
    "x-ibm-client-id": "468cb429-ec4f-4a42-9aa5-aaaf70f6baee",
    "x-ibm-client-secret": "xQ5lM2sC1sH2lU6hI7nB2mP6kH4wT5mI4bO8gQ6jI3vC0aU5bW",
    "content-type": "application/json",
    "accept": "application/json"
  }
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
	dict=JSON.parse(body.toString());
	htmlTable = tools.CreateTable(dict);
    //console.log(dict);
  });
});

req.end();


//************************************************
//Writing the HTML Page
//************************************************


var htmlStarter = "<html><head><title>IBM Tweets Window</title></head><body>" +
					"<h1>IBM Tweets App - Tweets by Location</h1>" +
					"";
var htmlEnder = "</body></html>";
var htmlLastUpdate = '<br>' +'LastUpdated: ' + tools.TheDate() + '<br>';
var counter=0;


http.createServer(function(request, response) {  
		response.writeHeader(200, {"Content-Type": "text/html"}); 
		html= htmlStarter+ htmlTable + htmlLastUpdate+htmlEnder;
        response.write(html);  
        response.end(); 
		counter++;
		
    }).listen(8000);
console.log( "Listening on port 8000...");

