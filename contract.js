const Eos = require('eosjs');

var testers = [
	[60065,$publyto,10000.0000 PUB],
[60074,$thatzit12,10000.0001 PUB],
[60085,$rangkenins,10000.0002 PUB],
[60106,$hoonishere,10000.0003 PUB],
[60107,$fehu,10000.0004 PUB],
[60108,$infinitywarz,10000.0005 PUB],
[60109,$jhbae,10000.0006 PUB],
[60110,$stdupont,10000.0007 PUB],
[60111,$jeniestellar,10000.0008 PUB],
[60112,$simjy,10000.0009 PUB],
[60113,$teo,10000.0010 PUB],
[60114,$dubu,10000.0011 PUB],
[60115,$pagetolinkor,10000.0012 PUB],
[60116,$miki,10000.0013 PUB],
[60117,$managerkyle,10000.0014 PUB],
[60118,$huamandubear,10000.0015 PUB],
[60119,$ritmusv,10000.0016 PUB],
[60120,$creamer,10000.0017 PUB],
[60121,$funkrider,10000.0018 PUB],
[60122,$tabgun,10000.0019 PUB],
[60123,$maxmax,10000.0020 PUB],
[60124,$awesomteddy,10000.0021 PUB],
[60125,$chenish,10000.0022 PUB],
[60126,$eternize,10000.0023 PUB],
[60127,$nihonman,10000.0024 PUB],
[60128,$seol.e.b,10000.0025 PUB],
[60129,$love,10000.0026 PUB],
[60130,$baboragi,10000.0027 PUB],
[60131,$turtlev,10000.0028 PUB],
[60132,$setinoby,10000.0029 PUB],
[60133,$zeromepub,10000.0030 PUB],
[60135,$eunsik,10000.0031 PUB],
[60136,$nani,10000.0032 PUB],
[60137,$yonghyun,10000.0033 PUB],
[60138,$gazua,10000.0034 PUB],
[60141,$atom,10000.0035 PUB],
[60142,$sara,10000.0036 PUB],
[60143,$healings,10000.0037 PUB],
[60145,$roy,10000.0038 PUB],
[60148,$publytoman,10000.0039 PUB],
[60149,$rot,10000.0040 PUB],
[60153,$pubcbtu11112,10000.0041 PUB],
[60156,$rangken4,10000.0042 PUB],
[60157,$pooka,10000.0043 PUB],
[60158,$lshwee,10000.0044 PUB],
[60159,$boldfire,10000.0045 PUB],
[60161,$misuk,10000.0046 PUB]
	];

config = {
  //chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // 32 byte (64 char) hex string
  chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca",
  keyProvider: process.env.key, // WIF string or array of keys..
  //httpEndpoint: 'https://mainnet.eoscalgary.io',
  httpEndpoint:	"http://jungle.cryptolions.io:18888",
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

