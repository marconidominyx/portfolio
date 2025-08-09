// Theme Management
document.addEventListener("DOMContentLoaded", () => {
	initializeTheme();
	setupThemeToggle();
	updateCopyright();
	setupEventListeners();
	setupScrollReveal();
});

// Theme Functions
function initializeTheme() {
	const savedTheme = localStorage.getItem("theme") || "light";
	applyTheme(savedTheme);
}

function applyTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
	const icon = document.querySelector("#themeToggle i");
	if (icon) {
		icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
	}
	localStorage.setItem("theme", theme);
}

function setupThemeToggle() {
	const themeToggle = document.getElementById("themeToggle");
	if (themeToggle) {
		themeToggle.addEventListener("click", toggleTheme);
		themeToggle.addEventListener("touchend", (e) => {
			e.preventDefault();
			toggleTheme();
		});
	}
}

function toggleTheme() {
	const currentTheme =
		document.documentElement.getAttribute("data-theme") || "light";
	const newTheme = currentTheme === "light" ? "dark" : "light";
	applyTheme(newTheme);
}

// Resume Modal Functions
function openResumeModal() {
	document.getElementById("resumeModal").style.display = "block";
	document.body.style.overflow = "hidden";
}

function closeResumeModal() {
	document.getElementById("resumeModal").style.display = "none";
	document.body.style.overflow = "auto";
	const resumeImage = document.querySelector(".resume-image");
	if (resumeImage) {
		resumeImage.style.transform = "scale(1)";
	}
}

function zoomResume(direction) {
	const resumeImage = document.querySelector(".resume-image");
	const currentScale =
		parseFloat(
			(resumeImage?.style.transform || "")
				.replace("scale(", "")
				.replace(")", "")
		) || 1;
	const newScale =
		direction === "in" ? currentScale + 0.2 : Math.max(0.5, currentScale - 0.2);
	if (resumeImage) resumeImage.style.transform = `scale(${newScale})`;
}

// Utility Functions
function updateCopyright() {
	const yearSpan = document.getElementById("currentYear");
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}
}

// Event Listeners Setup
function setupEventListeners() {
	// Modal close on outside click
	window.onclick = function (event) {
		const modal = document.getElementById("resumeModal");
		if (event.target === modal) {
			closeResumeModal();
		}
	};

	// Modal close on escape key
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeResumeModal();
		}
	});

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		});
	});
}

// Scroll Reveal
function setupScrollReveal() {
	const revealEls = document.querySelectorAll(".reveal-up");
	if (!("IntersectionObserver" in window) || revealEls.length === 0) {
		revealEls.forEach((el) => el.classList.add("is-visible"));
		return;
	}
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.2,
			rootMargin: "0px 0px -10% 0px",
		}
	);
	revealEls.forEach((el) => observer.observe(el));
}
