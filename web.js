var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/v1/users/link-to-eos-account", function(req, res) { 

	  var id = req.body.senderId;
	  var receiver = req.body.name;
	  var vcode = req.body.verificationCode;
	  var vote = req.body.vote;
	  console.log("link-to-eos-account event", id, receiver, vote);
	  //save this data to mongoDB//
	  result = 2;
	  result2 = 3;
	  var body = {
			  "result": "202",
			  "balance" : result,
			  "account" : result2
	  };
	  
	  res.send(body);
});

app.post("/v1/users/thanks", function(req, res) { 

	  var id = req.body.id;
	  var vote = req.body.vote;
	  console.log("vote event", id, vote);
	  //save this data to mongoDB//
		  result = 2;
	  result2 = 3;
	  var body = {
			  "result": "done",
			  "balance" : result,
			  "account" : result2
	  };
	  
	  res.send("done");
});

app.post("/v1/users/transfer", function(req, res) { 

	  var id = req.body.id;
	  var vote = req.body.vote;
	  console.log("vote event", id, vote);
	  //save this data to mongoDB//
		  result = 2;
	  result2 = 3;
	  var body = {
			  "result": "done",
			  "balance" : result,
			  "account" : result2
	  };
	  
	  res.send("done");
});

app.post("/v1/users/stake", function(req, res) { 

	  var id = req.body.id;
	  var vote = req.body.vote;
	  console.log("vote event", id, vote);
	  //save this data to mongoDB//
		  result = 2;
	  result2 = 3;
	  var body = {
			  "result": "done",
			  "balance" : result,
			  "account" : result2
	  };
	  
	  res.send("done");
});

app.post("/v1/users/unstake", function(req, res) { 

	  var id = req.body.id;
	  var vote = req.body.vote;
	  console.log("vote event", id, vote);
	  //save this data to mongoDB//
		  result = 2;
	  result2 = 3;
	  var body = {
			  "result": "done",
			  "balance" : result,
			  "account" : result2
	  };
	  
	  res.send("done");
});

app.get("/v1/users/assets", function(req, res) { 

	  var id = req.body.id;
	  var vote = req.body.vote;
	  console.log("vote event", id, vote);
	  //save this data to mongoDB//
		  result = 2;
	  result2 = 3;
	  var body = {
			  "result": "done",
			  "balance" : result,
			  "account" : result2
	  };
	  
	  res.send("done");
});




 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
	 console.log("app get", req.params[0]);
	 console.log("app get parameter", req.query.name);
     res.sendfile( __dirname + req.params[0]); 
 });

 var port = process.env.PORT || 5000;
console.log("port", port);

 app.listen(port, function() {
   console.log("Listening on " + port);
 });
