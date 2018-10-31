const Eos = require('eosjs');

config = {
  //chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 32 byte (64 char) hex string
  chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca",
  keyProvider: process.env.key, // WIF string or array of keys..
  //httpEndpoint: 'https://mainnet.eoscalgary.io',
  httpEndpoint:	"http://193.93.219.219:8888",
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}

eos = Eos(config);

const contractOwner = "eoscafekorea";

async function getInternalBalance(account){
	
	var body = {
		"balance" : 0,
		"staked" : 0,
		"unstaked" : 0,
		"refund" : 0,
		"ink" : 0,
		"staketbl" : 0,
		"unstaketbl" : 0
	};
		
	let bal = await eos.getTableRows({json : true,
                 code : contractOwner,
                 scope: account,
                 table: "pubtbl",
                 }).catch((err) => {
  			return null});
	
	if(bal.rows.length != 0){
		body.balance = bal.rows[0].balance;
		body.ink = bal.rows[0].ink;
	}else{
		console.log("there is no pubtable table for this account", account);
	}
	
	bal = await eos.getTableRows({json : true,
                 code : contractOwner,
                 scope: account,
                 table: "staketbl3",
                 }).catch((err) => {
  			return null});
	
	if(bal.rows.length != 0){
		for(i = 0;i<bal.rows.length;i++){
			let res = bal.rows[i].balance.split("PUB");
			body.staked += parseFloat(res[0]);
		}
		body.staketbl = bal;
	}else{
		console.log("there is no stake table for this account", account);
	}
	
	bal = await eos.getTableRows({json : true,
                 code : contractOwner,
                 scope: account,
                 table: "unstaketbl",
                 }).catch((err) => {
  			return null});
	
	if(bal.rows.length != 0){
		for(i = 0;i<bal.rows.length;i++){
			let res = bal.rows[i].balance.split("PUB");
			body.unstaked += parseFloat(res[0]);
		}
		body.unstaketbl = bal;
	}else{
		console.log("there is no unstake table for this account", account);
	}
	
	return body;
}

async function getExternalBalance(account){
	let bal = await eos.getTableRows({json : true,
                 code : contractOwner,
                 scope: account,
                 table: "accounts",
                 }).catch((err) => {
  			return null});
	
	if(bal.rows.length != 0)
		return bal.rows[0].balance;
	else
		return 0;
}

exports.getAsset = async function(iuser, euser, callback){
	console.log("getAsset", iuser, euser);
	let [internalBalance, externalBalance] = 
	    await Promise.all([getInternalBalance(iuser),
			       getExternalBalance(euser)
			       ]);
	//internalBalance.balance += externalBalance;
	internalBalance.balance = parseFloat(externalBalance, 10) + parseFloat(internalBalance.balance, 10);
	//adding unit "PUB"
	internalBalance.balance = internalBalance.balance.toFixed(4) + " PUB";
	internalBalance.staked = internalBalance.staked.toFixed(4) + " PUB";
	internalBalance.unstaked = internalBalance.unstaked.toFixed(4) + " PUB";
	internalBalance.refund = internalBalance.refund.toFixed(4) + " PUB";
	callback(internalBalance);
}

exports.newAccount = function(userid, callback){
	
	var body = {
		"result" : "200"
	};
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.newaccount(userid, options);
	}).then((output) => {
		console.log("success");		
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.refund = function(from, to, callback){
	var body = {
		"result" : "200"
	};
	  
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.refund(from, to, options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.update = function(user, amount, callback){
	var body = {
		"result" : "200"
	};
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.update(user, amount, options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.linkAccount = function(username, eosAccount, callback){
	var body = {
		"result" : "200"
	};
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.check(eosAccount, username, "link internal account to external account", options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.thanks = function(username, contentId, ink, callback){
	var body = {
		"result" : "200"
	};
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.thanks(username, ink, contentId, options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.stake = function(from, to, quantity, callback){
	//internal flag processing
	//from must be internal or internal info provided
	//to can be both.
	let isInternalTo = 1;
	if(to.indexOf("$") == -1)
		isInternalTo = 0;
	
	var body = {
		"result" : "200"
	};
	
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.stake(from, 1, to, isInternalTo, quantity, options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.unStake = function(from, to, quantity, callback){
	//internal flag processing
	//from must be internal or internal info provided
	//to can be both.
	let isInternalTo = 1;
	if(to.indexOf("$") == -1)
		isInternalTo = 0;
	
	var body = {
		"result" : "200"
	};
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.unstake(from, 1, to, isInternalTo, quantity, options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

exports.pubTransfer = function(from, to, quantity, memo, callback){
	//internal flag processing
	let isInternalTo = 1;
	if(to.indexOf("$") == -1)
		isInternalTo = 0;
	else{
		to = to.substring(1);
	}
	let isInternalFrom = 1;
	if(from.indexOf("$") == -1)
		isInternalFrom = 0;
	else{
		from = from.substring(1);
	}

	var body = {
		"result" : "200"
	};
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.pubtransfer(from, isInternalFrom, to, isInternalTo, quantity, memo, options);
	}).then((output) => {
		console.log("success");
		callback(body);
	}).catch((err)=>{
		console.log("fail");
		body.result = "409";
		callback(body);
	});
}

