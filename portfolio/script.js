document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Greeting
    updateDynamicGreeting();
    
    // View Switching Logic
    const navLinks = document.querySelectorAll('.nav-link-item[data-view]');
    const views = document.querySelectorAll('.content-view');
    
    function switchView(viewId) {
        // Update Nav Active State
        navLinks.forEach(l => {
            if (l.getAttribute('data-view') === viewId) l.classList.add('active');
            else l.classList.remove('active');
        });
        
        // Hide all views first
        views.forEach(v => {
            v.style.display = 'none';
            v.style.opacity = '0';
        });
        
        // Show target view
        const target = document.getElementById(`view-${viewId}`);
        if(target) {
            target.style.display = 'block';
            // Slight delay to allow display:block to render before opacity transition
            setTimeout(() => {
                target.style.opacity = '1';
                // Trigger re-animation of children if needed
                triggerAnimations(target);
            }, 50);
        }
        
        window.scrollTo(0, 0);
    }
    
    // Attach Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            switchView(viewId);
        });
    });
    
    // Initial Animation Trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.project-card, .skill-category, .hero-section').forEach(el => {
        el.classList.add('chk-anim'); // marker class
        observer.observe(el);
    });

    // Handle initial hash if present (e.g. #projects)
    // Optional: implement hash routing
});

function updateDynamicGreeting() {
    const greetingElement = document.getElementById("dynamic-greeting");
    if (!greetingElement) return;
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[new Date().getDay()];
    greetingElement.textContent = `How's your ${dayName}?`;
}

function triggerAnimations(container) {
    // Reset animations for items in container
    const items = container.querySelectorAll('.chk-anim');
    items.forEach(el => {
        el.classList.remove('in-view');
        // Force reflow
        void el.offsetWidth;
        el.classList.add('in-view');
    });
}
