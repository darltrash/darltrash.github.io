/*
	MIT License
	-----------
	Copyright (c) 2021 Nelson "darltrash" Lopez

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
*/

/*
	I seriously hate javascript, i never do any javascript and i hate nodejs even more.
	So, if this code is bad, it's because i dont want to work with this language.
*/

if (window.location.href.indexOf("?") != -1) {
	var arguments = window.location.href.slice(window.location.href.indexOf("?") + 1)
	if (arguments.indexOf("@") != -1) {
		loadPost(arguments.slice(0, arguments.indexOf("@")), arguments.slice(arguments.indexOf("@")+1))
	} else {
		listPosts(arguments)
	}
}

async function listPosts(kind) {
	let index = await fetch("https://raw.githubusercontent.com/darltrash/" + kind + "/main/index.json")
	let header = await fetch("https://raw.githubusercontent.com/darltrash/" + kind + "/main/index.md")
	if (index.ok) {
		var postshtml = "<div class='posts'>\n"
		var json = await index.json()

		json.posts.forEach(function (post) {
		    postshtml += `
		    	<a href="` + window.location.href + `@` + post.file + `">
			    	<div class="post">
				    	<h2>` + post.title + `</h2>
				    	<h5 style="opacity: 0.4">#` + post.topics.join(", #") + `</h5>
			    	</div>
			    </a>
		    `
		})

		document.getElementById('content').innerHTML = marked(await header.text()) + postshtml + "</div>"
	} else {
		document.getElementById('content').innerHTML = `
			<h1> Something got wrong! :( </h1>
			<p1> Sorry, The section you tried to access may not exist! </p1>
			<h5 style="opacity: 0.4"> ERROR CODE: ` + index.status + ` </h5>
		`;
	}
	document.title = "/" + kind;
}

async function loadPost(kind, id) {
	//alert("https://raw.githubusercontent.com/darltrash/"+ kind + "/main/" + id + ".md")
	let content = await fetch("https://raw.githubusercontent.com/darltrash/" + kind + "/main/" + id + ".md")

	if (content.ok) {
		document.getElementById('content').innerHTML = marked(await content.text())
	} else {
		document.getElementById('content').innerHTML = `
			<h1> Something got wrong! :( </h1>
			<p1> Sorry, The post you tried to access may not exist! </p1>
			<h5 style="opacity: 0.4"> ERROR CODE: ` + content.status + ` </h5>
		`;
	}
	document.title = id + ".md";
}
