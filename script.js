document.addEventListener('DOMContentLoaded', () => {

            // 1. Mobile Menu Toggle
            const hamburgerBtn = document.getElementById('hamburger-btn');
            const navLinks = document.querySelector('.nav-links');
            const navLinkItems = document.querySelectorAll('.nav-link a');

            hamburgerBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close menu when a link is clicked
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }
                });
            });

            // 2. Dark Mode Toggle
            const themeToggleBtn = document.getElementById('theme-toggle');
            const currentTheme = localStorage.getItem('theme');

            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }

            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                let theme = 'light';
                if (document.body.classList.contains('dark-mode')) {
                    theme = 'dark';
                }
                localStorage.setItem('theme', theme);
            });

            // 3. Scroll Reveal Animations
            const revealElements = document.querySelectorAll('.reveal');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            revealElements.forEach(el => {
                revealObserver.observe(el);
            });

            // 4. Contact Form Submission
            const contactForm = document.getElementById('contact-form');
            const successMsg = document.getElementById('form-success-msg');

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // ---
                // In a real-world scenario, you would send this data to a backend server.
                // For this demo, we'll just show the success message.
                // ---
                
                successMsg.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after a few seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 4000);
            });
            
            // 5. Hero Subtitle Typing Animation
            const subtitleEl = document.getElementById('hero-subtitle');
            const text = subtitleEl.textContent;
            let currentText = "";
            let i = 0;
            subtitleEl.innerHTML = `<span>${text}</span><span class="typing-cursor">|</span>`;
            const span = subtitleEl.querySelector('span');
            span.textContent = "";

            function type() {
                if (i < text.length) {
                    span.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100); // Typing speed
                }
            }
            
            // Start typing after a short delay
            setTimeout(type, 1000);

            // 6. Project Modal Logic (Added)
            const modal = document.getElementById('project-modal');
            const modalCloseBtn = document.getElementById('modal-close');
            const modalBody = modal.querySelector('.modal-body');
            const projectCards = document.querySelectorAll('.project-card');
            const modalTemplates = document.getElementById('modal-templates');

            projectCards.forEach(card => {
                card.addEventListener('click', () => {
                    const modalId = card.getAttribute('data-modal');
                    const template = document.getElementById(modalId);
                    
                    if (template) {
                        modalBody.innerHTML = template.innerHTML;
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden'; // Prevent background scroll
                    }
                });
            });

            function closeModal() {
                modal.style.display = 'none';
                modalBody.innerHTML = ''; // Clear content
                document.body.style.overflow = 'auto'; // Restore scroll
            }

            modalCloseBtn.addEventListener('click', closeModal);

            // Close modal by clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

        });
