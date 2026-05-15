document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // In a real scenario, this array would contain different image paths.
    // We'll use the same image but change a query parameter to simulate different images if needed,
    // or just keep it simple since we only generated one image.
    const images = [
        "assets/images/hdpe_pipe_hero.png",
        "assets/images/fishnet_manufacturing.png",
        "assets/images/industrial_pipe_fitting.png",
        "assets/images/pipe_installation_workers.png",
        "assets/images/manufacturing_process_extrusion.png",
        "assets/images/hdpe_pipe_hero.png"
    ];

    let currentIndex = 0;

    function updateSlider(index) {
        // Update active thumbnail class
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');

        // Update main image
        mainImage.src = images[index];
        currentIndex = index;
    }

    // Thumbnail click event
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Prev button click
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        updateSlider(newIndex);
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) {
            newIndex = 0;
        }
        updateSlider(newIndex);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const icon = faq.querySelector('svg path');
                if (icon) {
                    icon.setAttribute('d', 'm6 9 6 6 6-6'); // Down arrow
                }
            });

            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('svg path');
                if (icon) {
                    icon.setAttribute('d', 'm18 15-6-6-6 6'); // Up arrow
                }
            }
        });
    });

    // Applications Slider
    const appSlider = document.getElementById('appSlider');
    const prevAppBtn = document.querySelector('.prev-app');
    const nextAppBtn = document.querySelector('.next-app');
    
    if (appSlider && prevAppBtn && nextAppBtn) {
        let appCurrentIndex = 0;
        
        function updateAppSlider() {
            const card = appSlider.querySelector('.app-card');
            const cardWidth = card.offsetWidth;
            const gap = parseFloat(window.getComputedStyle(appSlider).gap) || 24;
            const scrollAmount = cardWidth + gap;
            
            appSlider.style.transform = `translateX(-${appCurrentIndex * scrollAmount}px)`;
        }

        nextAppBtn.addEventListener('click', () => {
            const cards = appSlider.querySelectorAll('.app-card');
            const visibleCards = Math.floor(appSlider.parentElement.offsetWidth / cards[0].offsetWidth);
            const maxIndex = Math.max(0, cards.length - visibleCards);
            
            if (appCurrentIndex < maxIndex) {
                appCurrentIndex++;
                updateAppSlider();
            }
        });

        prevAppBtn.addEventListener('click', () => {
            if (appCurrentIndex > 0) {
                appCurrentIndex--;
                updateAppSlider();
            }
        });
        
        window.addEventListener('resize', () => {
            // Adjust current index if resizing makes it out of bounds
            const cards = appSlider.querySelectorAll('.app-card');
            const visibleCards = Math.floor(appSlider.parentElement.offsetWidth / cards[0].offsetWidth);
            const maxIndex = Math.max(0, cards.length - visibleCards);
            
            if (appCurrentIndex > maxIndex) {
                appCurrentIndex = maxIndex;
            }
            updateAppSlider();
        });
    }

    // Process Tabs
    const processTabs = document.querySelectorAll('.process-tab');
    
    processTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            processTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // In a full implementation, this would also update the content (.process-text-col)
            // based on the clicked tab.
        });
    });

    // Process Image Carousel
    const processImg = document.getElementById('processImg');
    const prevProcBtn = document.querySelector('.prev-btn-proc');
    const nextProcBtn = document.querySelector('.next-btn-proc');
    
    if (processImg && prevProcBtn && nextProcBtn) {
        let procCurrentIndex = 0;
        
        function updateProcSlider(index) {
            processImg.src = images[index];
            procCurrentIndex = index;
        }

        prevProcBtn.addEventListener('click', () => {
            let newIndex = procCurrentIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1;
            }
            updateProcSlider(newIndex);
        });

        nextProcBtn.addEventListener('click', () => {
            let newIndex = procCurrentIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0;
            }
            updateProcSlider(newIndex);
        });
    }

    // Testimonials Slider
    const testiTrack = document.getElementById('testimonialsTrack');
    if (testiTrack) {
        let testiIndex = 0;
        const cards = testiTrack.querySelectorAll('.testimonial-card');
        if (cards.length > 0) {
            function updateTestiSlider() {
                const cardWidth = cards[0].offsetWidth;
                const gap = 32; // 2rem
                const scrollAmount = cardWidth + gap;
                
                // Check if we need to loop back
                const visibleWidth = testiTrack.parentElement.offsetWidth;
                const maxScroll = testiTrack.scrollWidth - visibleWidth;
                const currentScroll = testiIndex * scrollAmount;
                
                if (currentScroll > maxScroll) {
                    testiIndex = 0;
                }
                
                testiTrack.style.transform = `translateX(-${testiIndex * scrollAmount}px)`;
            }

            // Auto slide every 5 seconds
            setInterval(() => {
                testiIndex++;
                updateTestiSlider();
            }, 5000);

            window.addEventListener('resize', updateTestiSlider);
        }
    }
});


