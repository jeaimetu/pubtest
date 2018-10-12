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

exports.getAsset = function(userid, callback){
	console.log("getAsset", userid);
}

exports.newAccount = function(userid, callback){
	eos.transaction(contractOwner, myaccount => {
		const options = { authorization: [ `eoscafekorea@active` ] };
		myaccount.newaccount(userid, options);
	}).then((output) => {
		console.log("success");
		callback("success");
	}).catch((err)=>{
		console.log("fail");
		callback("fail");
	});
}
