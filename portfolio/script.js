/*
 * Minimalist Portfolio Script
 * Handles theme toggling and simple interactions
 */

document.addEventListener("DOMContentLoaded", () => {
	// Theme Toggle
	const themeToggleBtn = document.getElementById("themeToggle");
	const body = document.body;

	// Check local storage or system preference
	const savedTheme = localStorage.getItem("theme");
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// Mouse tracking for glow effects
	document.addEventListener("mousemove", (e) => {
		const cards = document.querySelectorAll(".project-card");
		cards.forEach((card) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			card.style.setProperty("--mouse-x", `${x}px`);
			card.style.setProperty("--mouse-y", `${y}px`);
		});
	});

	if (savedTheme === "dark" || (!savedTheme && systemDark)) {
		body.setAttribute("data-theme", "dark");
		updateIcon(true);
	}

	themeToggleBtn.addEventListener("click", () => {
		const isDark = body.getAttribute("data-theme") === "dark";

		if (isDark) {
			body.removeAttribute("data-theme");
			localStorage.setItem("theme", "light");
			updateIcon(false);
		} else {
			body.setAttribute("data-theme", "dark");
			localStorage.setItem("theme", "dark");
			updateIcon(true);
		}
	});

	function updateIcon(isDark) {
		const icon = themeToggleBtn.querySelector("i");
		if (isDark) {
			icon.className = "fas fa-sun";
		} else {
			icon.className = "fas fa-moon";
		}
	}

	// Hamburger Menu Toggle
	const hamburgerBtn = document.getElementById("hamburgerBtn");
	const navMenu = document.getElementById("navMenu");

	if (hamburgerBtn && navMenu) {
		hamburgerBtn.addEventListener("click", () => {
			hamburgerBtn.classList.toggle("active");
			navMenu.classList.toggle("active");
		});

		// Close menu when clicking on a nav link
		document.querySelectorAll(".nav-right .nav-link").forEach((link) => {
			link.addEventListener("click", () => {
				hamburgerBtn.classList.remove("active");
				navMenu.classList.remove("active");
			});
		});

		// Close menu when clicking outside
		document.addEventListener("click", (e) => {
			if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
				hamburgerBtn.classList.remove("active");
				navMenu.classList.remove("active");
			}
		});
	}

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

	// Render Contribution Graph
	renderContributionGraph();

	// Init Typing Animation
	initTypingAnimation();
});

function initTypingAnimation() {
	const textElement = document.querySelector(".typing-text");
	if (!textElement) return;

	const words = ["Vibe Coder.", "Creator.", "Minimalist."];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typeSpeed = 100;

	function type() {
		const currentWord = words[wordIndex];

		if (isDeleting) {
			textElement.textContent = currentWord.substring(0, charIndex - 1);
			charIndex--;
			typeSpeed = 50; // Faster deletion
		} else {
			textElement.textContent = currentWord.substring(0, charIndex + 1);
			charIndex++;
			typeSpeed = 100; // Normal typing
		}

		if (!isDeleting && charIndex === currentWord.length) {
			isDeleting = true;
			typeSpeed = 2000; // Pause at end of word
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			typeSpeed = 500; // Pause before starting new word
		}

		setTimeout(type, typeSpeed);
	}

	type();
}

function renderContributionGraph() {
	const graphContainer = document.getElementById("contribution-graph");
	if (!graphContainer) return;

	// Bitmaps for letters (7 rows height)
	const charMap = {
		D: [
			[1, 1, 1, 1, 0],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 1, 1, 0],
		],
		O: [
			[0, 1, 1, 1, 0],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[0, 1, 1, 1, 0],
		],
		M: [
			[1, 0, 0, 0, 1],
			[1, 1, 0, 1, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
		],
	};

	// Calculate start positions to center "DOM"
	// Grid provides ~52 columns.
	// D(5) + sp(1) + O(5) + sp(1) + M(5) = 17 cols.
	// Start around col 18?
	const textStartCol = 20;

	// Create container structure
	graphContainer.innerHTML = "";

	// Top Row: Months
	const monthsRow = document.createElement("div");
	monthsRow.className = "months-row";
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	// Approximate month positions
	let monthHTML = "";
	// Simple spread for visual label
	months.forEach((m) => {
		monthHTML += `<span style="grid-column: span 4">${m}</span>`;
	});
	monthsRow.innerHTML = monthHTML;
	graphContainer.appendChild(monthsRow);

	// Grid Container
	const gridDiv = document.createElement("div");
	gridDiv.className = "grid-container";

	// Generate 365 days (approx 53 weeks x 7 days)
	// We treat the grid as 53 cols x 7 rows
	const totalCols = 53;
	const totalRows = 7;

	for (let col = 0; col < totalCols; col++) {
		for (let row = 0; row < totalRows; row++) {
			const cell = document.createElement("div");
			cell.className = "cell";

			// Determine date for this cell (rough approximation starting Jan 1 = Row 0, Col 0??
			// GitHub graph fills vertical first (col 0 row 0 -> col 0 row 6 -> col 1 row 0)
			// But CSS grid auto-flow: column handles the flow if we utilize DOM order correctly?
			// Actually, with grid-template-rows: repeat(7, 1fr) and grid-auto-flow: column,
			// we should just append cells and they fill col 0 (rows 0-6), then col 1.

			// Calculate Day of Year (approx)
			const dayOfYear = col * 7 + row + 1;

			// Check for Birthday: Oct 10
			// Oct 10 is approx 283rd day
			// Let's use specific math if possible or just hardcode visually
			// 283 / 7 = 40.4 -> Col ~40, Row ~3
			const isBirthday = col === 40 && row === 3;

			// Check for Text Pattern "DOM"
			let level = 0;
			let tooltip = `Contribution count: ${Math.floor(Math.random() * 5)}`;

			// Check D
			if (col >= textStartCol && col < textStartCol + 5) {
				const localCol = col - textStartCol;
				if (charMap.D[row][localCol]) level = 3;
			}
			// Check O
			else if (col >= textStartCol + 6 && col < textStartCol + 11) {
				const localCol = col - (textStartCol + 6);
				if (charMap.O[row][localCol]) level = 3;
			}
			// Check M
			else if (col >= textStartCol + 12 && col < textStartCol + 17) {
				const localCol = col - (textStartCol + 12);
				if (charMap.M[row][localCol]) level = 3;
			}

			// Scatter random data if not text
			if (level === 0 && Math.random() > 0.8) {
				level = Math.floor(Math.random() * 2) + 1;
			}

			if (level === 3) {
				tooltip = "DOM - Creator";
			}

			if (isBirthday) {
				cell.classList.add("birthday");
				tooltip = "🎉 Birthday: Oct 10";
				level = 3; // Ensure it looks active
			}

			cell.setAttribute("data-level", level);
			cell.setAttribute("data-tooltip", tooltip);
			gridDiv.appendChild(cell);
		}
	}

	graphContainer.appendChild(gridDiv);
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
