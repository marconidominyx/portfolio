/*
 * Exact Design Replication: saumyachaturvedi.com
 * JavaScript for interactions and dynamic content
 */

document.addEventListener("DOMContentLoaded", () => {
	// Dynamic Greeting based on day of week
	updateDynamicGreeting();
	
	// Sidebar Navigation Active State
	updateSidebarActiveState();
	
	// Smooth Scroll for Navigation
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
				});
			}
		});
	});

	// Update sidebar active state on scroll
	window.addEventListener("scroll", updateSidebarActiveState);

	// Intersection Observer for fade-in animations
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = "1";
					entry.target.style.transform = "translateY(0)";
				}
			});
		},
		{ threshold: 0.1 }
	);

	// Animate sections on scroll
	document.querySelectorAll("section").forEach((section) => {
		section.style.opacity = "0";
		section.style.transform = "translateY(20px)";
		section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
		observer.observe(section);
	});
});

function updateDynamicGreeting() {
	const greetingElement = document.getElementById("dynamic-greeting");
	if (!greetingElement) return;
	
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const today = new Date().getDay();
	const dayName = days[today];
	
	greetingElement.textContent = `How's your ${dayName}?`;
}

function updateSidebarActiveState() {
	const sections = document.querySelectorAll("section[id]");
	const navIcons = document.querySelectorAll(".nav-icon");
	
	let currentSection = "";
	
	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		
		if (window.pageYOffset >= sectionTop - 200) {
			currentSection = section.getAttribute("id");
		}
	});
	
	navIcons.forEach((icon) => {
		icon.classList.remove("active");
		const href = icon.getAttribute("href");
		if (href === `#${currentSection}`) {
			icon.classList.add("active");
		}
	});
}

// Collapsible Section Toggle
function toggleSection(sectionId) {
	const content = document.getElementById(sectionId + "-content");
	const toggle = document.querySelector(
		`.section-toggle[onclick*="${sectionId}"]`
	);

	if (content.classList.contains("expanded")) {
		// Collapse
		content.classList.remove("expanded");
		toggle.setAttribute("aria-expanded", "false");
	} else {
		// Expand
		content.classList.add("expanded");
		toggle.setAttribute("aria-expanded", "true");
	}
}
