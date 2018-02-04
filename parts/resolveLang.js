const langs = {
	js: ".js",
	javascript: ".js",
	html: ".html",
	css: ".css",
	rb: ".rb",
	ruby: ".rb",
	py: ".py",
	python: ".py",
	sh: ".sh",
	shell: ".sh",
	cpp: ".cpp",
	cplusplus: ".cpp",
	"c++": ".cpp",
	c: ".c",
	coffee: ".coffee",
	"coffee-script": ".coffee",
	coffeescript: ".coffee",
	json: ".json"
}

module.exports = lang => langs[lang] || "";