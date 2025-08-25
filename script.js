// DOM Elements
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const scrollToTopBtn = document.getElementById("scroll-to-top");
const typingText = document.getElementById("typing-text");

// Navbar scroll effect with hide/show functionality
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener("scroll", () => {
	const currentScrollTop = window.scrollY;

	// Add scrolled class for styling
	if (currentScrollTop > 50) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}

	// Hide/show navbar based on scroll direction
	if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
		// Scrolling down - hide navbar
		navbar.classList.add("navbar-hidden");
	} else if (currentScrollTop < lastScrollTop) {
		// Scrolling up - show navbar
		navbar.classList.remove("navbar-hidden");
	}

	// Always show navbar when at top
	if (currentScrollTop <= 100) {
		navbar.classList.remove("navbar-hidden");
	}

	// Show navbar temporarily when user stops scrolling
	clearTimeout(scrollTimeout);
	scrollTimeout = setTimeout(() => {
		if (currentScrollTop > 100) {
			navbar.classList.remove("navbar-hidden");
			// Hide again after 2 seconds if still scrolled down
			setTimeout(() => {
				if (window.scrollY > 100) {
					navbar.classList.add("navbar-hidden");
				}
			}, 2000);
		}
	}, 150);

	lastScrollTop = currentScrollTop;

	// Show/hide scroll to top button
	if (window.scrollY > 500) {
		scrollToTopBtn.classList.add("visible");
	} else {
		scrollToTopBtn.classList.remove("visible");
	}

	// Update active nav link
	updateActiveNavLink();
});

// Mobile menu toggle with navbar visibility consideration
hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navLinks.classList.toggle("active");
	document.body.style.overflow = navLinks.classList.contains("active")
		? "hidden"
		: "auto";

	// Show navbar when opening mobile menu
	if (navLinks.classList.contains("active")) {
		navbar.classList.remove("navbar-hidden");
	}
});

// Close mobile menu when clicking on a link
navLinks.addEventListener("click", (e) => {
	if (e.target.tagName === "A") {
		hamburger.classList.remove("active");
		navLinks.classList.remove("active");
		document.body.style.overflow = "auto";
	}
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	});
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
	const sections = document.querySelectorAll("section[id]");
	const navLinksList = document.querySelectorAll(".nav-links a");

	let currentSection = "";

	sections.forEach((section) => {
		const sectionTop = section.offsetTop - 100;
		const sectionHeight = section.clientHeight;

		if (
			window.scrollY >= sectionTop &&
			window.scrollY < sectionTop + sectionHeight
		) {
			currentSection = section.getAttribute("id");
		}
	});

	navLinksList.forEach((link) => {
		link.classList.remove("active");
		if (link.getAttribute("href") === `#${currentSection}`) {
			link.classList.add("active");
		}
	});
}

// Typing animation for hero text
function typeWriter() {
	const texts = ["Aryan Kamal", "a Developer", "a Problem Solver"];
	let textIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typeSpeed = 100;

	function type() {
		const currentText = texts[textIndex];

		if (isDeleting) {
			typingText.textContent = currentText.substring(0, charIndex - 1);
			charIndex--;
			typeSpeed = 50;
		} else {
			typingText.textContent = currentText.substring(0, charIndex + 1);
			charIndex++;
			typeSpeed = 100;
		}

		if (!isDeleting && charIndex === currentText.length) {
			setTimeout(() => {
				isDeleting = true;
			}, 2000);
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			textIndex = (textIndex + 1) % texts.length;
		}

		setTimeout(type, typeSpeed);
	}

	type();
}

// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = "1";
			entry.target.style.transform = "translateY(0)";

			// Add stagger animation for grid items
			if (
				entry.target.classList.contains("skills-grid") ||
				entry.target.classList.contains("projects-grid") ||
				entry.target.classList.contains("achievements-grid") ||
				entry.target.classList.contains("profiles-grid")
			) {
				const items = entry.target.children;
				Array.from(items).forEach((item, index) => {
					setTimeout(() => {
						item.style.opacity = "1";
						item.style.transform = "translateY(0)";
					}, index * 100);
				});
			}
		}
	});
}, observerOptions);

// Observe elements for animations
function setupAnimations() {
	const animatedElements = document.querySelectorAll(
		[
			".section-title",
			".about-text",
			".education",
			".skills-category",
			".timeline-item",
			".project-card",
			".achievement-card",
			".profile-card",
			".contact-item",
		].join(",")
	);

	animatedElements.forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = "translateY(30px)";
		el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
		observer.observe(el);
	});

	// Setup grid animations
	const grids = document.querySelectorAll(
		[
			".skills-grid",
			".projects-grid",
			".achievements-grid",
			".profiles-grid",
		].join(",")
	);

	grids.forEach((grid) => {
		const items = grid.children;
		Array.from(items).forEach((item) => {
			item.style.opacity = "0";
			item.style.transform = "translateY(30px)";
			item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
		});
		observer.observe(grid);
	});
}

// Particle animation for hero background
function createParticleEffect() {
	const hero = document.querySelector(".hero");
	if (!hero) return;

	const particleCount = 50;

	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement("div");
		particle.className = "particle";
		particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
		hero.appendChild(particle);
	}

	// Add CSS animation for particles
	const style = document.createElement("style");
	style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
	document.head.appendChild(style);
}

// Skills hover effect
function setupSkillsHover() {
	const skillItems = document.querySelectorAll(".skill-item");

	skillItems.forEach((item) => {
		item.addEventListener("mouseenter", () => {
			item.style.transform = "translateY(-5px) scale(1.05)";
			item.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.3)";
		});

		item.addEventListener("mouseleave", () => {
			item.style.transform = "translateY(0) scale(1)";
			item.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
		});
	});
}

// Project card hover effects
function setupProjectHover() {
	const projectCards = document.querySelectorAll(".project-card");

	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", () => {
			card.style.transform = "translateY(-10px)";
			card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
		});

		card.addEventListener("mouseleave", () => {
			card.style.transform = "translateY(0)";
			card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
		});
	});
}

// Contact form handling
function setupContactForm() {
	const contactForm = document.getElementById("contact-form");

	if (contactForm) {
		contactForm.addEventListener("submit", (e) => {
			e.preventDefault();

			// Get form data
			const formData = new FormData(contactForm);
			const name = formData.get("name");
			const email = formData.get("email");
			const message = formData.get("message");

			// Basic validation
			if (!name || !email || !message) {
				showNotification("Please fill in all fields", "error");
				return;
			}

			if (!isValidEmail(email)) {
				showNotification("Please enter a valid email address", "error");
				return;
			}

			// Simulate form submission
			showNotification("Message sent successfully!", "success");
			contactForm.reset();
		});
	}
}

// Email validation
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
	const notification = document.createElement("div");
	notification.className = `notification ${type}`;
	notification.textContent = message;
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${
					type === "success"
						? "#10B981"
						: type === "error"
						? "#EF4444"
						: "#3B82F6"
				};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

	document.body.appendChild(notification);

	// Add slide animation
	const style = document.createElement("style");
	style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
	document.head.appendChild(style);

	// Remove notification after 3 seconds
	setTimeout(() => {
		notification.style.animation = "slideOut 0.3s ease";
		setTimeout(() => {
			if (notification.parentNode) {
				notification.parentNode.removeChild(notification);
			}
		}, 300);
	}, 3000);
}

// Progress bar animation for skills
function animateSkillBars() {
	const skillBars = document.querySelectorAll(".skill-progress");

	skillBars.forEach((bar) => {
		const progress = bar.getAttribute("data-progress") || "0";
		const progressBar = bar.querySelector(".progress-fill");

		if (progressBar) {
			setTimeout(() => {
				progressBar.style.width = progress + "%";
			}, 500);
		}
	});
}

// Lazy loading for images
function setupLazyLoading() {
	const images = document.querySelectorAll("img[data-src]");

	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove("lazy");
				imageObserver.unobserve(img);
			}
		});
	});

	images.forEach((img) => imageObserver.observe(img));
}

// Theme toggle functionality
function setupThemeToggle() {
	const themeToggle = document.getElementById("theme-toggle");
	const themeIcon = document.getElementById("theme-icon");
	const currentTheme = localStorage.getItem("theme") || "light";

	// Set initial theme
	document.documentElement.setAttribute("data-theme", currentTheme);
	updateThemeIcon(currentTheme);

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const currentTheme = document.documentElement.getAttribute("data-theme");
			const newTheme = currentTheme === "light" ? "dark" : "light";

			// Update theme
			document.documentElement.setAttribute("data-theme", newTheme);
			localStorage.setItem("theme", newTheme);

			// Update icon
			updateThemeIcon(newTheme);

			// Add smooth transition
			document.body.style.transition =
				"background-color 0.3s ease, color 0.3s ease";
		});
	}
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
	const themeIcon = document.getElementById("theme-icon");
	if (themeIcon) {
		if (theme === "dark") {
			themeIcon.className = "fas fa-sun";
			themeIcon.style.color = "#fbbf24"; // Yellow for sun
		} else {
			themeIcon.className = "fas fa-moon";
			themeIcon.style.color = "#667eea"; // Blue for moon
		}
	}
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// Add CSS for navbar hide/show transitions
	const navbarStyles = document.createElement("style");
	navbarStyles.textContent = `
        .navbar {
            transition: transform 0.3s ease-in-out, background-color 0.3s ease;
        }
        
        .navbar-hidden {
            transform: translateY(-100%);
        }
        
        .navbar.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Dark theme navbar styles */
        [data-theme="dark"] .navbar.scrolled {
            background-color: rgba(17, 24, 39, 0.95);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Ensure navbar stays on top */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        
        /* Mobile menu adjustments */
        @media (max-width: 768px) {
            .navbar-hidden .nav-links.active {
                transform: translateY(-100vh);
            }
        }
    `;
	document.head.appendChild(navbarStyles);

	// Start typing animation
	if (typingText) {
		typeWriter();
	}

	// Setup all animations and effects
	setupAnimations();
	createParticleEffect();
	setupSkillsHover();
	setupProjectHover();
	setupContactForm();
	animateSkillBars();
	setupLazyLoading();
	setupThemeToggle();

	// Add loading animation
	document.body.classList.add("loaded");
});

// Handle window resize
window.addEventListener("resize", () => {
	// Recalculate particle positions on resize
	const particles = document.querySelectorAll(".particle");
	particles.forEach((particle) => {
		particle.style.left = Math.random() * 100 + "%";
		particle.style.top = Math.random() * 100 + "%";
	});
});

// Add smooth reveal animations for sections
const revealSections = () => {
	const sections = document.querySelectorAll("section");

	sections.forEach((section) => {
		const sectionTop = section.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;

		if (sectionTop < windowHeight * 0.8) {
			section.classList.add("revealed");
		}
	});
};

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);
