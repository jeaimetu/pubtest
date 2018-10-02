var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/v1/users/link-to-eos-account", function(req, res) { 

	  var username = req.body.username;
	  var eosAccount = req.body.eosAccount;

	  console.log("link-to-eos-account event", username, eosAccount);
	  ///calling smart contract
	
	  var body = {
			  "result": "204",
	  };
	  
	  res.send(body);
});

app.post("/v1/users/thanks", function(req, res) { 
	  var username = req.body.username;
	  var contentId = req.body.contentId
	  var ink = req.body.ink
	  console.log("/v1/users/thanks", username, contentId, ink);
	  //save this data to mongoDB//
	  var body = {
			  "result": "204",
	  };
	  
	  res.send(body);
});

app.post("/v1/users/transfer", function(req, res) { 

	  var username = req.body.username;
	  var isReceiverLinkedToEosAccount = req.body.isReceiverLinkedToEosAccount;
	  var receiverPublytoUsername = req.body.receiverPublytoUsername;
	  var receiverEosAccount = req.body.receiverEosAccount;
	  var amount = req.body.amount;
	  console.log("/v1/users/transfer", isReceiverLinkedToEosAccount, receiverPublytoUsername, receiverEosAccount, amount);
	  //save this data to mongoDB//

	  var body = {
			  "result": "204",
	  };
	  
	  res.send(body);
});

app.post("/v1/users/stake", function(req, res) { 

	  var username = req.body.username;
	  var isReceiverLinkedToEosAccount = req.body.isReceiverLinkedToEosAccount;
	  var receiverPublytoUsername = req.body.receiverPublytoUsername;
	  var receiverEosAccount = req.body.receiverEosAccount;
	  var amount = req.body.amount;
	  console.log("/v1/users/stake", isReceiverLinkedToEosAccount, receiverPublytoUsername, receiverEosAccount, amount);
	  //save this data to mongoDB//

	  var body = {
			  "result": "204",
	  };
	  
	  res.send(body);
});

app.post("/v1/users/unstake", function(req, res) { 

	  var username = req.body.username;
	  var isReceiverLinkedToEosAccount = req.body.isReceiverLinkedToEosAccount;
	  var receiverPublytoUsername = req.body.receiverPublytoUsername;
	  var receiverEosAccount = req.body.receiverEosAccount;
	  var amount = req.body.amount;
	  console.log("/v1/users/unstake", isReceiverLinkedToEosAccount, receiverPublytoUsername, receiverEosAccount, amount);
	  //save this data to mongoDB//

	  var body = {
			  "result": "204",
	  };
	  
	  res.send(body);
});

app.get("/v1/users/assets", function(req, res) { 

	  var username = req.body.username;
	  console.log("/v1/users/assets", username);
	  //save this data to mongoDB//

	  var body = {
			  "result": "200",
			  "isLinkedToEosAccount" : true,
			  "staked" : 0,
		  	  "unstaked" : 0,
		  	  "refund" : 0,
		  	  "ink" : 0		  
	  };
	  
	  res.send(body);
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
