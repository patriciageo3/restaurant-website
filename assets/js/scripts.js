const menuBox = document.getElementsByClassName("container")[0];
const logo = document.getElementById("logo");
const menu = document.getElementsByTagName("nav")[0];

function debounce(func, delay = 40) {
	let timer;
	return function() {
		const context = this;
		const args = arguments;
		const functionToDelay = function() {
			func.apply(context, args);
		}
		clearTimeout(timer);
		timer = setTimeout(functionToDelay, delay);
	};
}

function fixMenu(e) {
	let scrolling = window.pageYOffset || document.documentElement.scrollTop;
	console.log(scrolling);
	console.count(e);
	if (scrolling > menuBox.scrollHeight) {
		if (!menuBox.classList.contains("fixed_menu")) {
			menuBox.classList.add("fixed_menu");
			logo.classList.add("fixed");
			menu.classList.add("fixed");
		}
	} else {
		menuBox.className = "container";
		logo.classList.remove("fixed");
		menu.classList.remove("fixed");
	}
}

window.addEventListener("scroll", debounce(fixMenu));