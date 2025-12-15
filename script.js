document.addEventListener("DOMContentLoaded", () => {
	const heroContent = document.getElementById("heroContent");
	if (!heroContent) return;

	const sections = {
		about: document.getElementById("tpl-about"),
		work: document.getElementById("tpl-work"),
		links: document.getElementById("tpl-links"),
	};

	function setHeroSection(key) {
		const tpl = sections[key];
		if (!tpl) return;

		heroContent.classList.add("is-switching");

		setTimeout(() => {
			heroContent.innerHTML = tpl.innerHTML;
			heroContent.classList.remove("is-switching");
		}, 180);

		// update active nav state
		document.querySelectorAll(".side-nav a[data-section]").forEach((link) => {
			if (link.getAttribute("data-section") === key) {
				link.classList.add("active");
			} else {
				link.classList.remove("active");
			}
		});
	}

	// nav clicks
	document.querySelectorAll(".side-nav a[data-section]").forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const key = link.getAttribute("data-section");
			setHeroSection(key);
		});
	});

	// initial state
	setHeroSection("about");
});
