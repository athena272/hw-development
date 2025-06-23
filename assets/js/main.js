document.addEventListener('DOMContentLoaded', function () {

    console.log('[DEBUG] DOM content fully loaded.');

    // =========================================================================
    //  LOGIC FOR THE VSL PAGE (index.html)
    // =========================================================================
    const vslPageIdentifier = document.getElementById('vsl-video-section');
    if (vslPageIdentifier) {
        console.log('[DEBUG] VSL page detected. Initializing VSL script.');

        // Dynamically load YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let player;
        let videoTriggered = false;

        // This function is called automatically when the YouTube IFrame API is ready
        window.onYouTubeIframeAPIReady = function () {
            console.log('[DEBUG] YouTube IFrame API is ready.');
            try {
                player = new YT.Player('youtube-player', {
                    events: { 'onStateChange': onPlayerStateChange }
                });
                console.log('[DEBUG] YouTube Player object created successfully:', player);
            } catch (error) {
                console.error('[DEBUG] Failed to create YouTube Player. Check if iframe with id="youtube-player" exists.', error);
            }
        }

        /**
         * Trigger when YouTube Player state changes (e.g., playing, paused, ended)
         */
        function onPlayerStateChange(event) {
            console.log(`[DEBUG] Player state changed. New state: ${event.data}`);

            // Start checking video time only once, after the video starts playing
            if (event.data == YT.PlayerState.PLAYING && !videoTriggered) {
                console.log('[DEBUG] Video is playing. Starting to monitor time...');
                const timeInterval = setInterval(() => {
                    const currentTime = player.getCurrentTime();
                    console.log(`[DEBUG] Checking current video time: ${Math.round(currentTime)}s`);

                    if (currentTime > 1214) { // Trigger at 20 minutes and 14 seconds
                        console.log('%c[DEBUG] TRIGGER! Video time threshold reached!', 'color: lightgreen; font-weight: bold;');
                        showHiddenContent();
                        clearInterval(timeInterval);
                        videoTriggered = true;
                    }
                }, 1000);
            }
        }

        /**
         * Reveal hidden sections and start countdown timer
         */
        function showHiddenContent() {
            console.log('[DEBUG] Executing showHiddenContent function.');
            const hiddenContent = document.getElementById('vsl-hidden-content');
            if (hiddenContent) {
                hiddenContent.style.display = 'block';
                console.log('[DEBUG] Hidden content is now visible.');
                const twentyMinutes = 60 * 20;
                console.log('[DEBUG] Starting countdown timer on all counters.');
                startCountdown(twentyMinutes);
            }
        }

        /**
         * Countdown timer logic: updates all elements with .countdown-timer
         * @param {number} duration - Total time in seconds
         */
        function startCountdown(duration) {
            let timer = duration, minutes, seconds;
            const displays = document.querySelectorAll('.countdown-timer');

            const interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                const timeString = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

                displays.forEach(display => {
                    display.textContent = timeString;
                });

                if (--timer < 0) {
                    displays.forEach(display => {
                        display.textContent = "00:00";
                    });
                    clearInterval(interval);
                }
            }, 1000);
        }

        // =====================================================================
        // Purchase Modal Logic (Bootstrap Modal for order finalization)
        // =====================================================================
        const purchaseModal = document.getElementById('purchaseModal');
        if (purchaseModal) {
            console.log('[DEBUG] Purchase modal logic initialized.');

            // Populate modal fields when it is shown
            purchaseModal.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget;
                const selectedQty = button.getAttribute('data-qty');
                const selectedTotal = button.getAttribute('data-total');
                const selectedName = button.getAttribute('data-name');
                const modalProductName = purchaseModal.querySelector('#modal-product-name');
                modalProductName.textContent = selectedName;

                // Store selected quantity and total as temporary data for checkout
                modalProductName.setAttribute('data-qty-temp', selectedQty);
                modalProductName.setAttribute('data-total-temp', selectedTotal);
                console.log(`[DEBUG] Modal data populated for product: ${selectedName}`);
            });

            // Handle purchase finalization button click
            const finalizeBtn = document.getElementById('finalize-purchase-btn');
            finalizeBtn.addEventListener('click', function () {
                const customerName = document.getElementById('customer-name').value;
                const customerEmail = document.getElementById('customer-email').value;
                const selectedQty = purchaseModal.querySelector('#modal-product-name').getAttribute('data-qty-temp');
                const selectedTotal = purchaseModal.querySelector('#modal-product-name').getAttribute('data-total-temp');

                if (customerName.trim() === '' || customerEmail.trim() === '') {
                    alert('Please fill in your name and email.');
                    return;
                }

                console.log('[DEBUG] Finalizing purchase and redirecting to Thank You page.');
                const thankYouUrl = `thank-you.html?name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}&qty=${selectedQty}&total=${selectedTotal}`;
                window.location.href = thankYouUrl;
            });
        }
    }

    // =========================================================================
    // LOGIC FOR THE THANK YOU PAGE (thank-you.html)
    // =========================================================================
    const thankyouPageIdentifier = document.getElementById('thankyou-title-section');
    if (thankyouPageIdentifier) {
        console.log('[DEBUG] Thank You page detected. Initializing content population...');

        // Extract data from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const email = urlParams.get('email');
        const qty = urlParams.get('qty');
        const total = urlParams.get('total');

        // Populate placeholders with customer info
        const customerNameEl = document.getElementById('customer-name-placeholder');
        const customerEmailEl = document.getElementById('customer-email-placeholder');
        const productImageEl = document.getElementById('product-image-placeholder');
        const productQtyEl = document.getElementById('product-qty-placeholder');
        const productTotalEl = document.getElementById('product-total-placeholder');
        const bonusContentEl = document.getElementById('bonus-content-placeholder');

        if (name) customerNameEl.textContent = name;
        if (email) customerEmailEl.textContent = email;
        if (qty) productQtyEl.textContent = qty;
        if (total) productTotalEl.textContent = total;

        // Define product bonus mapping
        const bonuses = {
            '2': {
                image: 'bonus3.webp',
                title: 'Skin-Firming Blueprint',
                productImg: 'img-2-bottles.webp'
            },
            '3': {
                image: 'bonus2.webp',
                title: 'Cravings Crusher',
                productImg: 'img-3-bottles.webp'
            },
            '6': {
                image: 'bonus1.webp',
                title: 'Firm & Fit',
                productImg: 'img-6-bottles.webp'
            }
        };

        // Display the correct bonus based on quantity
        const selectedBonus = bonuses[qty];
        if (selectedBonus) {
            productImageEl.src = `./assets/images/${selectedBonus.productImg}`;
            bonusContentEl.innerHTML = `
                <p>For your purchase of <strong>${qty} bottles</strong>, you’ll receive the ebook <strong>'${selectedBonus.title}'</strong>. ENJOY!</p>
                <img src="./assets/images/${selectedBonus.image}" alt="${selectedBonus.title}" class="img-fluid" style="max-width: 250px;" loading="lazy">
            `;
        }
    }
});