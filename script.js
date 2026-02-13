/* ======================================
   SAHEB PORTFOLIO — PREMIUM INTERACTIONS
   ====================================== */

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initParticles();
    initNavigation();
    initScrollProgress();
    initScrollReveal();
    initTimer();
    initSkillBars();
    initBackToTop();
    initTypingAnimation();
    initCardTilt();
});

/* ======================================
   LOADING SCREEN
   ====================================== */
function initLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger initial reveals after loading screen hides
            setTimeout(() => {
                document.querySelectorAll('#home .reveal, #home .reveal-scale').forEach(el => {
                    el.classList.add('visible');
                });
            }, 300);
        }, 1200);
    });

    // Fallback: hide loader after 4 seconds max
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 4000);
}

/* ======================================
   TOAST NOTIFICATION SYSTEM
   ====================================== */
function showToast(title, message, duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.setProperty('--toast-duration', duration + 'ms');
    toast.innerHTML = `
        <button class="toast-close" onclick="this.parentElement.classList.add('hide'); setTimeout(() => this.parentElement.remove(), 400);">✕</button>
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
    });

    // Auto-dismiss
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 500);
    }, duration);
}

/* ======================================
   NAVIGATION
   ====================================== */
function initNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Header shrink on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Highlight active nav link with IntersectionObserver
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.25,
        rootMargin: '-80px 0px 0px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

/* ======================================
   SCROLL PROGRESS BAR
   ====================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ======================================
   SCROLL REVEAL ANIMATIONS
   ====================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve so elements stay visible
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ======================================
   BACK TO TOP BUTTON
   ====================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ======================================
   TYPING ANIMATION
   ====================================== */
function initTypingAnimation() {
    const headline = document.getElementById('main-headline');
    if (!headline) return;

    const fullHTML = headline.innerHTML;
    headline.innerHTML = '';
    headline.style.visibility = 'visible';

    // Parse text content only (preserve HTML tags by using a different approach)
    const text = "I am SAHEB your next tripod to have perfect life on.";
    const highlightWord = "SAHEB";
    let i = 0;

    function type() {
        if (i < text.length) {
            const current = text.substring(0, i + 1);
            // Replace SAHEB with highlighted version
            const displayHTML = current.replace(highlightWord, `<span class="highlight">${highlightWord}</span>`);
            headline.innerHTML = displayHTML + '<span class="typing-cursor"></span>';
            i++;
            const delay = Math.random() * 50 + 30;
            setTimeout(type, delay);
        } else {
            // Remove cursor after typing completes
            setTimeout(() => {
                headline.innerHTML = fullHTML;
            }, 1500);
        }
    }

    // Start typing after loading screen
    setTimeout(type, 2000);
}

/* ======================================
   CARD TILT EFFECT
   ====================================== */
function initCardTilt() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ======================================
   PARTICLE BACKGROUND
   ====================================== */
function initParticles() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 1 + 0.3;
            this.opacity = Math.random() * 0.5 + 0.15;
            this.drift = Math.random() * 0.5 - 0.25;
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ff4d6d';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
            ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
            ctx.fill();
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Heart());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

/* ======================================
   INTERACTIVE FEATURES (HOME)
   ====================================== */
function sendRose() {
    // Rose bloom animation
    const rose = document.createElement('div');
    rose.className = 'romantic-rose';
    rose.innerHTML = "🌹";
    rose.style.top = '50%';
    rose.style.left = '50%';
    rose.style.fontSize = '5rem';
    rose.style.animation = 'roseBloom 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    document.body.appendChild(rose);

    // Glow effect
    const glow = document.createElement('div');
    glow.className = 'love-glow';
    glow.style.top = '50%';
    glow.style.left = '50%';
    glow.style.marginTop = '-40px';
    glow.style.marginLeft = '-40px';
    glow.style.background = 'radial-gradient(circle, rgba(249, 194, 209, 0.5), rgba(200, 16, 46, 0.2))';
    document.body.appendChild(glow);

    // Heart burst
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '✨', '🌸'];
    const numHearts = 16;

    for (let i = 0; i < numHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'love-heart';
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.top = '50%';
            heart.style.left = '50%';

            const angle = (i / numHearts) * Math.PI * 2;
            const distance = 180 + Math.random() * 80;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 120;

            heart.style.setProperty('--tx', tx + 'px');
            heart.style.setProperty('--ty', ty + 'px');
            heart.style.marginTop = '-20px';
            heart.style.marginLeft = '-20px';

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2500);
        }, i * 40);
    }

    setTimeout(() => rose.remove(), 3000);
    setTimeout(() => glow.remove(), 1500);

    setTimeout(() => {
        showToast("🌹 Rose Sent!", "A flush of love has been sent to your heart! Every rose carries my deepest feelings for you. 💕✨", 5000);
    }, 600);
}

function showSecret() {
    showToast("🔒 Secret Message", "Saheb thinks you're production-ready and absolutely beautiful. 💖", 4000);
}

/* ======================================
   CURSOR TRAIL
   ====================================== */
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.12) return;
    const h = document.createElement('div');
    h.className = 'trail-heart';
    h.innerHTML = ["💖", "✨", "🌸", "❤️", "💕"][Math.floor(Math.random() * 5)];
    h.style.left = e.pageX + 'px';
    h.style.top = e.pageY + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1500);
});

/* ======================================
   TIMER (WEEK SECTION)
   ====================================== */
function initTimer() {
    const timerElem = document.getElementById("vday-timer");
    if (!timerElem) return;

    function updateTimer() {
        const end = new Date("Feb 14, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const d = end - now;

        if (d < 0) {
            timerElem.innerHTML = "🎉 Happy Valentine's Day! 💝";
            return;
        }

        const days = Math.floor(d / (1000 * 60 * 60 * 24));
        const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((d % (1000 * 60)) / 1000);
        timerElem.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

function confirmJourney() {
    showToast("🌹 Journey Begins!", "Our Valentine's journey starts now. Every moment with you is a treasure. Let's make this week unforgettable! 💕", 5000);
}

/* ======================================
   WEEK DAY CARD MESSAGES
   ====================================== */
function showDayMessage(title, message) {
    showToast(title, message, 6000);
}

/* ======================================
   SKILL BARS (SKILLS SECTION)
   ====================================== */
function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    observer.observe(skillsSection);
}

function animateSkills() {
    const skills = [
        { id: 'skill-1', conf: 'conf-1', value: 100 },
        { id: 'skill-2', conf: 'conf-2', value: 98 },
        { id: 'skill-3', conf: 'conf-3', value: 100 },
        { id: 'skill-4', conf: 'conf-4', value: 95 },
        { id: 'skill-5', conf: 'conf-5', value: 95 },
        { id: 'skill-6', conf: 'conf-6', value: 99 },
        { id: 'skill-7', conf: 'conf-7', value: 96 },
        { id: 'skill-8', conf: 'conf-8', value: 100 },
        { id: 'skill-9', conf: 'conf-9', value: 97 }
    ];

    let delay = 0;
    skills.forEach(skill => {
        setTimeout(() => {
            const bar = document.getElementById(skill.id);
            const conf = document.getElementById(skill.conf);
            if (bar && conf) {
                bar.style.width = skill.value + '%';
                // Animate the number counting up
                animateCounter(conf, 0, skill.value, 1500);
            }
        }, delay);
        delay += 150;
    });

    // Overall score with counter animation
    setTimeout(() => {
        const avg = Math.round(skills.reduce((a, b) => a + b.value, 0) / skills.length);
        const scoreElem = document.getElementById('overall-score');
        if (scoreElem) animateCounter(scoreElem, 0, avg, 2000);
    }, delay + 500);
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.round(start + (end - start) * eased);
        element.innerText = current + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function experienceMe() {
    showToast("✨ Skills Unlocked!", "Thank you for exploring my skills! I'm ready to show you why I'm the perfect partner. Let's make magic happen together! 💕", 5000);
}

/* ======================================
   CONNECT SECTION
   ====================================== */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("📋 Copied!", `Email copied to clipboard: ${text}. Now go reach out! 💌`, 3000);
    }).catch(() => {
        showToast("📧 Email", text, 3000);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    showToast(`💌 Got it, ${name}!`, `Your message received! I'll reach out to you at ${email} as soon as possible. Can't wait to talk! ❤️`, 6000);
    document.getElementById('contact-form-el').reset();
}

function sendMessage() {
    showToast("💬 Let's Connect!", "Thanks for reading my bio! Ready to explore what we could build together? 💕", 4000);
    setTimeout(() => {
        document.getElementById('connect').scrollIntoView({ behavior: 'smooth' });
    }, 800);
}
