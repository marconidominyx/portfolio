document.addEventListener("DOMContentLoaded", () => {
    // Hero Content Switching
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

    // Init Hero Typing
    initHeroTyping();
    
    // Typing Animation logic
    function initHeroTyping() {
        const textElement = document.querySelector('.typing-text');
        if (!textElement) return;

        // Text to type
        const textToType = "// web3 community builder";
        let charIndex = 0;
        let typeSpeed = 100;

        function type() {
            if (charIndex < textToType.length) {
                textElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                
                // Varied typing speed for realism
                const variation = Math.random() * 50;
                setTimeout(type, typeSpeed + variation);
            }
        }

        // Start after a slight delay
        setTimeout(type, 1000);
    }

    // Donate Modal
    const donateToggle = document.getElementById("donateToggle");
    if (donateToggle) {
        donateToggle.addEventListener("click", openDonateModal);
    }

    // Modal close on outside click
	window.addEventListener("click", function (event) {
		const donateModal = document.getElementById("donateModal");
		if (event.target === donateModal) {
			closeDonateModal();
		}
	});

    // Crypto Network Select
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

    // Copy Buttons
    document.querySelectorAll(".copy-btn").forEach((btn) => {
		btn.addEventListener("click", () => {
			const target = btn.getAttribute("data-copy-target");
			if (target) copyFromSelector(target);
		});
	});
});

// Modal Logic
function openDonateModal() {
	const modal = document.getElementById("donateModal");
	if (modal) {
        modal.style.display = "block";
        setTimeout(() => modal.classList.add("show"), 10);
    }
}

function closeDonateModal() {
	const modal = document.getElementById("donateModal");
	if (modal) {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }
}

// Copy Utils
function copyFromSelector(selector) {
	const el = document.querySelector(selector);
	if (!el) return;
	const text = (el.textContent || el.value || "").trim();
	if (!text) return;

	navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById("copyToast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    });
}
