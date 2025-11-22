// Theme Management
document.addEventListener("DOMContentLoaded", () => {
	initializeTheme();
	setupThemeToggle();
	updateCopyright();
	setupEventListeners();
	setupScrollReveal();
	initializeCollapsibleSections();
});

// Theme Functions
function initializeTheme() {
	const savedTheme = localStorage.getItem("theme") || "dark"; // Changed default to dark
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
// Resume Modal Functions
function openResumeModal() {
	const modal = document.getElementById("resumeModal");
	if (!modal) return;

	// Default to PDF view
	switchResumeView("pdf");

	modal.style.display = "block";
	modal.offsetHeight;
	modal.classList.add("show");
	document.body.style.overflow = "hidden";
}

function closeResumeModal() {
	const modal = document.getElementById("resumeModal");
	if (modal) {
		modal.classList.remove("show");
		setTimeout(() => {
			modal.style.display = "none";
		}, 300);
		document.body.style.overflow = "auto";
	}
}

function switchResumeView(mode) {
	const pdfFrame = document.getElementById("resumePdfFrame");
	const imgView = document.getElementById("resumeImgView");
	const btnPdf = document.getElementById("btnViewPdf");
	const btnImg = document.getElementById("btnViewImg");

	if (mode === "pdf") {
		if (pdfFrame) pdfFrame.style.display = "block";
		if (imgView) imgView.style.display = "none";
		if (btnPdf) btnPdf.classList.add("active");
		if (btnImg) btnImg.classList.remove("active");
	} else {
		if (pdfFrame) pdfFrame.style.display = "none";
		if (imgView) imgView.style.display = "block";
		if (btnPdf) btnPdf.classList.remove("active");
		if (btnImg) btnImg.classList.add("active");
	}
}

// Persona Modal Functions
function openPersonaModal() {
	const modal = document.getElementById("personaModal");
	if (modal) {
		modal.style.display = "block";
		modal.offsetHeight;
		modal.classList.add("show");
		document.body.style.overflow = "hidden";
	}
}

function closePersonaModal() {
	const modal = document.getElementById("personaModal");
	if (modal) {
		modal.classList.remove("show");
		setTimeout(() => {
			modal.style.display = "none";
		}, 300);
		document.body.style.overflow = "auto";
	}
}

// Donate Modal Functions
function openDonateModal() {
	const modal = document.getElementById("donateModal");
	if (!modal) return;
	modal.style.display = "block";
	modal.offsetHeight;
	modal.classList.add("show");
	document.body.style.overflow = "hidden";
}
function closeDonateModal() {
	const modal = document.getElementById("donateModal");
	if (!modal) return;
	modal.classList.remove("show");
	setTimeout(() => (modal.style.display = "none"), 300);
	document.body.style.overflow = "auto";
}

function copyFromSelector(selector) {
	const el = document.querySelector(selector);
	if (!el) return false;
	const text = (el.textContent || el.value || "").trim();
	if (!text) return false;
	navigator.clipboard
		.writeText(text)
		.then(showCopyToast)
		.catch(() => {
			// Fallback
			const tmp = document.createElement("textarea");
			tmp.value = text;
			document.body.appendChild(tmp);
			tmp.select();
			try {
				document.execCommand("copy");
				showCopyToast();
			} catch (e) {}
			document.body.removeChild(tmp);
		});
	return true;
}
function showCopyToast() {
	const toast = document.getElementById("copyToast");
	if (!toast) return;
	toast.classList.add("show");
	setTimeout(() => toast.classList.remove("show"), 1300);
}

// Utility Functions
function updateCopyright() {
	const yearSpan = document.getElementById("currentYear");
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}
}

// Collapsible Section Toggle
function toggleSection(sectionId) {
	const content = document.getElementById(sectionId + "-content");
	const toggle = content.previousElementSibling; // the button

	if (content.classList.contains("expanded")) {
		// Collapse
		content.classList.remove("expanded");
		toggle.classList.remove("active");
	} else {
		// Expand
		content.classList.add("expanded");
		toggle.classList.add("active");
	}
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
	// Start with sections collapsed
	const contents = document.querySelectorAll(".collapsible-content");
	const toggles = document.querySelectorAll(".section-toggle");

	contents.forEach((content) => {
		content.classList.remove("expanded");
	});

	toggles.forEach((toggle) => {
		toggle.classList.remove("active");
	});
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

	// Crypto network select behavior
	const networkSelect = document.getElementById("cryptoNetwork");
	if (networkSelect) {
		const addresses = {
			bsc: "0x927e3f1ad89d68c13a50c4e54dc4d5a9eeb8b8f6",
			trx: "TSkPDn3ii6wrFnKZ4hKBjkoaZfyeU8YkQd",
			eth: "0x927e3f1ad89d68c13a50c4e54dc4d5a9eeb8b8f6",
			matic: "0x927e3f1ad89d68c13a50c4e54dc4d5a9eeb8b8f6",
			sol: "6wHvkK7vHp2K4imMEmk3UHf6y8ZXEDQg6pGeoQBdJLBJ",
		};
		const addrSpan = document.getElementById("cryptoAddr");
		const updateAddr = () => {
			const key = networkSelect.value;
			addrSpan.textContent = addresses[key] || "";
		};
		networkSelect.addEventListener("change", updateAddr);
		updateAddr();
	}

	// Modal close on escape key - include donate
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeResumeModal();
			closeDonateModal();
			closePersonaModal();
		}
	});

	// Resume modal close button
	const resumeModal = document.getElementById("resumeModal");
	if (resumeModal) {
		const closeBtn = resumeModal.querySelector(".close");
		if (closeBtn) {
			closeBtn.addEventListener("click", closeResumeModal);
		}
	}

	// Persona modal close button
	const personaModal = document.getElementById("personaModal");
	if (personaModal) {
		const closeBtn = personaModal.querySelector(".close");
		if (closeBtn) {
			closeBtn.addEventListener("click", closePersonaModal);
		}
	}

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

	// Donate toggle button
	const donateToggle = document.getElementById("donateToggle");
	if (donateToggle) {
		donateToggle.addEventListener("click", toggleDonateModal);
	}

	// Copy buttons in donate modal
	document.querySelectorAll(".copy-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			const target = btn.getAttribute("data-copy-target");
			if (target) copyFromSelector(target);
		});
	});

	// Close donate modal on outside click
	window.addEventListener("click", function (event) {
		const donateModal = document.getElementById("donateModal");
		if (event.target === donateModal) {
			closeDonateModal();
		}
	});

	// Close persona modal on outside click
	window.addEventListener("click", function (event) {
		const personaModal = document.getElementById("personaModal");
		if (event.target === personaModal) {
			closePersonaModal();
		}
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

// Scroll to home function with modal closure
function scrollToHome() {
	const homeSection = document.getElementById("home");
	if (homeSection) {
		// Close any open modals first
		closeResumeModal();
		closePersonaModal();
		closeDonateModal();

		// Wait for modal closing animation to complete, then scroll to home
		setTimeout(() => {
			homeSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}, 350); // Slightly longer than the modal closing animation (300ms)
	}
}

// Enhanced donate modal toggle - close if open, open if closed
function toggleDonateModal() {
	const modal = document.getElementById("donateModal");
	if (!modal) return;

	if (modal.classList.contains("show")) {
		// Modal is open, close it
		closeDonateModal();
	} else {
		// Modal is closed, open it
		openDonateModal();
	}
}
