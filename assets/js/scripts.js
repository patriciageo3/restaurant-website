const MENU_BOX = document.getElementsByClassName("container")[0];
const LOGO = document.getElementById("logo");
const MENU = document.getElementsByTagName("nav")[0];
const BRK_POINTS = document.querySelectorAll(".breakpoint");
const SCROLL_DISTANCES = [];
const LINKS = Array.from(document.getElementsByClassName("menu_link"));


function debounce(func, delay = 40) {
	let timer;
	return function() {
		let context = this;
		let args = arguments;
		let functionToDelay = function() {
			func.apply(context, args);
		}
		clearTimeout(timer);
		timer = setTimeout(functionToDelay, delay);
	};
}

function fixMenu(e) {
	let scrolling = window.pageYOffset || document.documentElement.scrollTop;

	if (scrolling > MENU_BOX.scrollHeight) {
		if (!MENU_BOX.classList.contains("fixed_menu")) {
			MENU_BOX.classList.add("fixed_menu");
			LOGO.classList.add("fixed");
			MENU.classList.add("fixed");
		}
	} else {
		MENU_BOX.className = "container";
		LOGO.classList.remove("fixed");
		MENU.classList.remove("fixed");
	}
}

function getDistanceFromDocumentTop(elem) {
        let location = 0;
        if (elem.offsetParent) {
            do {
                location += elem.offsetTop;
                elem = elem.offsetParent;
            } while (elem);
        }
        return location;
}

function getBreakPoints() {
	//if resize is done, we need to empty our distances array before setting new breakpoints!!!
	SCROLL_DISTANCES.length = 0; 
	
    BRK_POINTS.forEach(elem => {
        let targetId = elem.id;
        let distance = getDistanceFromDocumentTop(elem);
        let obj = {};
        obj.id = targetId;
        obj.position = distance;
        SCROLL_DISTANCES.push(obj);
    });
}

getBreakPoints();

function cleanUpMenu() {
    LINKS.forEach(elem => {
        if (elem.classList.contains("active")) {
            elem.classList.remove("active");
        }
    }); 
}

function activateMenuOnScroll() {
    let scrollDistance = window.pageYOffset;
    let scrollLength = scrollDistance + window.innerHeight;
	let totalHeight = document.body.offsetHeight;
	//get height of menu when fixed to the top:
	let navHeight = document.querySelector("header .container").offsetHeight;
	let section = document.getElementsByTagName("section")[0]; // all sections have the same margin-top
	let sectionStyles = section.currentStyle || window.getComputedStyle(section);
	let margin = parseInt(sectionStyles.marginTop.replace(/[^0-9]/g, ""), 10);

    cleanUpMenu();
    
  if (scrollDistance < SCROLL_DISTANCES[0].position - navHeight - margin) {
        //Activate Welcome when scrolled to the top/ clicked on Welcome menu item
        LINKS[0].classList.add("active");
        return;
    }  else if (scrollLength >= totalHeight) {
        //Activate Reservations in menu when scrolled to the bottom of page (because we do not have a contact page section yet)
		// This might seem useless at first, but there are cases in which, for certain sizes of the screen, the breakpoint of the Reservations section is never scrolled passed, so the tab needs to be activated forcefully.
        LINKS[LINKS.length - 3].classList.add("active");
        return;
    }
    
    SCROLL_DISTANCES.forEach(elem => {
        if (scrollDistance >= elem.position - (navHeight + margin)) {
            cleanUpMenu();
			
            let currentLink = "#" + elem.id;
            let currentNavElem = LINKS.find(x => x.getAttribute("href") === currentLink);
            currentNavElem.classList.add("active");
        }
    });
}

function distanceToTop(elem) {
    return Math.floor(elem.getBoundingClientRect().top);
}

function smoothScroll(e) {
    e.preventDefault();
    let targetId = this.getAttribute("href");
    let targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    
    let toTop = distanceToTop(targetSection);
    window.scrollBy({ top: toTop, left: 0, behavior: "smooth" });

    let checkIfDone = setInterval(function() {
        let reachedBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
        if (distanceToTop(targetSection) === 0 || reachedBottom) {
            targetSection.tabIndex = "-1";
            targetSection.focus();
            window.history.pushState("", "", targetId);
            clearInterval(checkIfDone);
        }
    }, 100);
}

window.addEventListener("scroll", debounce(fixMenu));
window.addEventListener("resize", debounce(getBreakPoints, 500));
window.addEventListener("scroll", debounce(activateMenuOnScroll));
LINKS.forEach(MenuLink => MenuLink.addEventListener("click", smoothScroll));

