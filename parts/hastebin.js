"use strict";

const https = require("https");

module.exports = code => new Promise((res, rej) => {
	const req = https.request({host: "hastebin.com", path: "/documents", method: "POST", timeout: 10000}, r => {
		if(r.statusCode !== 200) return rej(`Got HTTP response ${r.statusCode}`);

		let result = "";
		r.on("data", d => result += d);
		r.on("end", () => {
			try {
				res(`https://hastebin.com/${JSON.parse(result).key}`);
			} catch(e) {
				rej("Couldn't parse response body.");
			}
		});
	}).on("error", rej);
	req.write(code);
	req.end();
});