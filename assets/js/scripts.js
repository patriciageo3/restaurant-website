function fixMenu() {
	let menuBox = document.getElementsByClassName("container")[0];
	let logo = document.getElementById("logo");
	let menu = document.getElementsByTagName("nav")[0];
	let scrolling = window.pageYOffset || document.documentElement.scrollTop;
	
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

window.addEventListener("scroll", fixMenu);