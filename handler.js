document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

if (window.location.href.indexOf("?") != -1) {
	var arguments = window.location.href.slice(window.location.href.indexOf("?") + 1)
	if (arguments.indexOf("=") != -1) {
		loadPost(arguments.slice(0, arguments.indexOf("=")), arguments.slice(arguments.indexOf("=")+1))
	}
}

async function loadPost(kind, id) {
	//alert("https://raw.githubusercontent.com/darltrash/"+ kind + "/main/" + id + ".md")
	let content = await fetch("https://raw.githubusercontent.com/darltrash/"+ kind + "/main/" + id + ".md")

	if (content.ok) {
		document.getElementById('content').innerHTML = marked(await content.text())
	} else {
		document.getElementById('content').innerHTML = `
			<h1> Something got wrong! :( </h1>
			<p1> Sorry, The post you tried to access may not exist! </p1>
			<h5 style="opacity: 0.4"> ERROR CODE: ` + content.status + ` </h5>
		`;
	}
}
