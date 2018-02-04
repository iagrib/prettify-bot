const https = require("https");

module.exports = code => new Promise((res, rej) => {
	const req = https.request({host: "hastebin.com", path: "/documents", method: "POST"}, r => {
		let result = "";
		r.on("data", d => result += d);
		r.on("end", () => res(`https://hastebin.com/${JSON.parse(result).key}`));
	}).on("error", rej);
	req.write(code);
	req.end();
});