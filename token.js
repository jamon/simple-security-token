#!/usr/bin/env node
var crypto = require("crypto");
if(process.argv.length < 4) {
    console.log("usage: node token.js <secret> <username> [+offset|-offset|timestamp]")
    process.exit();
}
var secret = process.argv[2];
var user = process.argv[3];
var timestamp;
if(process.argv.length < 5 || process.argv[4].substr(0, 1) === "+" || process.argv[4].substr(0, 1) === "-") {
    var timeOffsetInSeconds = process.argv.length >= 5 ? parseInt(process.argv[4], 10) : 0;
    timestamp = (Math.floor((new Date()).getTime() / 1000) + timeOffsetInSeconds).toString();
} else {
    timestamp = process.argv[4];
}
var hash = crypto.createHash("md5").update([secret, user, timestamp].join(":")).digest("hex");
console.log([hash, user, timestamp].join(":"));
