var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var path = require('path');

const contract = require("./contract");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (err, req, res, next) {
	if(req.headers.apikey == "1234")
		next();
	else{
  		console.error(err.stack)
  		res.status(500).send('Magic code is different')
	}
})


app.post("/v1/users/link-to-eos-account", function(req, res) { 

	  var username = req.body.username;
	  var eosAccount = req.body.eosAccount;

	  console.log("link-to-eos-account event", username, eosAccount);
	  ///calling smart contract
	contract.linkAccount (username, eosAccount, (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
	
});

app.post("/v1/users/thanks", function(req, res) { 
	  var username = req.body.username;
	  var contentId = req.body.contentId
	  var ink = req.body.ink
	  console.log("/v1/users/thanks", username, contentId, ink);
	contract.thanks(username, contentId, ink, (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
	  
});

app.post("/v1/users/newaccount", function(req, res) {
	console.log("/v1/users/newaccount", req.body.username);
	contract.newAccount(req.body.username, (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
});

app.post("/v1/users/refund", function(req, res) {
	console.log("/v1/users/refund", req.body.from, req.body.to);
	contract.refund(req.body.from, req.body.to,  (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
});

app.post("/v1/users/update", function(req, res) {
	console.log("/v1/users/update", req.body.username, req.body.quantity);
	contract.update(req.body.username, req.body.quantity,  (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
});

app.post("/v1/users/transfer", function(req, res) { 

	  var from = req.body.senderName;
	  var to = req.body.receiverName;
	  var amount = req.body.amount;
	  var memo = req.body.memo;
	  console.log("/v1/users/transfer", from, to, amount, memo);
	  //save this data to mongoDB//
	contract.pubTransfer (from, to, amount, memo, (result) => {
		res.send(result);
	});
});

app.post("/v1/users/stake", function(req, res) { 

	  var username = req.body.username;
	  var isReceiverLinkedToEosAccount = req.body.isReceiverLinkedToEosAccount;
	  var receiverPublytoUsername = req.body.receiverPublytoUsername;
	  var receiverEosAccount = req.body.receiverEosAccount;
	  var amount = req.body.amount;
	  console.log("/v1/users/stake", isReceiverLinkedToEosAccount, receiverPublytoUsername, receiverEosAccount, amount);
	  //save this data to mongoDB//
	
	contract.stake(username, receiverPublytoUsername, amount, (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
});

app.post("/v1/users/unstake", function(req, res) { 

	  var username = req.body.username;
	  var isReceiverLinkedToEosAccount = req.body.isReceiverLinkedToEosAccount;
	  var receiverPublytoUsername = req.body.receiverPublytoUsername;
	  var receiverEosAccount = req.body.receiverEosAccount;
	  var amount = req.body.amount;
	  console.log("/v1/users/unstake", isReceiverLinkedToEosAccount, receiverPublytoUsername, receiverEosAccount, amount);
	  //save this data to mongoDB//
	
	contract.unStake(username, receiverPublytoUsername, amount, (result) => {
		var body = {
			"result" : result
		};
		res.send(body);
	});
});

app.post("/v1/users/assets", function(req, res) { 

	  console.log(req.headers.apikey);
	  var iuser = req.body.iuser;
	  var euser = req.body.euser;
	  console.log("/v1/users/assets", iuser, euser);
	  //save this data to mongoDB//
	  contract.getAsset(iuser, euser, (result) => {
		   res.send(result);
	  });
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
