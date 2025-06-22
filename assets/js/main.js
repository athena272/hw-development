document.addEventListener('DOMContentLoaded', function () {

    console.log('[DEBUG] DOM content fully loaded.');

    // ===================================================================
    //  LOGIC FOR THE VSL PAGE (index.html)
    // ===================================================================
    const vslPageIdentifier = document.getElementById('vsl-video-section');
    if (vslPageIdentifier) {
        console.log('[DEBUG] VSL page detected. Initializing VSL script.');

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let player;
        let videoTriggered = false;

        window.onYouTubeIframeAPIReady = function () {
            console.log('[DEBUG] YouTube IFrame API is ready.');
            try {
                player = new YT.Player('youtube-player', {
                    events: { 'onStateChange': onPlayerStateChange }
                });
                console.log('[DEBUG] YouTube Player object created successfully:', player);
            } catch (error) {
                console.error('[DEBUG] Failed to create YouTube Player. Is the iframe with id="youtube-player" present?', error);
            }
        }

        function onPlayerStateChange(event) {
            console.log(`[DEBUG] Player state changed. New state: ${event.data}`);
            // YT.PlayerState.PLAYING is 1
            if (event.data == YT.PlayerState.PLAYING && !videoTriggered) {
                console.log('[DEBUG] Video is playing. Starting to check time...');
                const timeInterval = setInterval(() => {
                    const currentTime = player.getCurrentTime();
                    console.log(`[DEBUG] Checking time: ${Math.round(currentTime)}s`);

                    // if (currentTime > 5) { // Test time set to 5 seconds
                    if (currentTime > 1214) { // 20 minutes and 14 seconds
                        console.log('%c[DEBUG] TRIGGER! Time threshold reached!', 'color: lightgreen; font-weight: bold;');
                        showHiddenContent();
                        clearInterval(timeInterval);
                        videoTriggered = true;
                    }
                }, 1000);
            }
        }

        function showHiddenContent() {
            console.log('[DEBUG] Executing showHiddenContent function.');
            const hiddenContent = document.getElementById('vsl-hidden-content');
            if (hiddenContent) {
                hiddenContent.style.display = 'block';
                console.log('[DEBUG] Hidden content is now visible.');
                const twentyMinutes = 60 * 20;
                const display = document.querySelector('#countdown-timer');
                if (display) {
                    console.log('[DEBUG] Starting countdown timer.');
                    startCountdown(twentyMinutes, display);
                }
            }
        }

        function startCountdown(duration, display) {
            let timer = duration, minutes, seconds;
            const interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                display.textContent = minutes + ":" + seconds;
                if (--timer < 0) {
                    timer = 0;
                    display.textContent = "00:00";
                    clearInterval(interval);
                }
            }, 1000);
        }

        const purchaseModal = document.getElementById('purchaseModal');
        if (purchaseModal) {
            console.log('[DEBUG] Purchase modal logic initialized.');
            purchaseModal.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget;
                const selectedName = button.getAttribute('data-name');
                console.log(`[DEBUG] Modal opened for product: ${selectedName}`);
                // ... (resto da lógica do modal)
            });
            const finalizeBtn = document.getElementById('finalize-purchase-btn');
            finalizeBtn.addEventListener('click', function () {
                const customerName = document.getElementById('customer-name').value;
                const customerEmail = document.getElementById('customer-email').value;
                const selectedQty = purchaseModal.querySelector('#modal-product-name').getAttribute('data-qty-temp'); // Get data from modal
                const selectedTotal = purchaseModal.querySelector('#modal-product-name').getAttribute('data-total-temp');

                if (customerName.trim() === '' || customerEmail.trim() === '') {
                    alert('Please fill in your name and email.');
                    return;
                }
                console.log(`[DEBUG] Finalizing purchase. Redirecting to thank-you.html...`);
                const thankYouUrl = `thank-you.html?name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}&qty=${selectedQty}&total=${selectedTotal}`;
                window.location.href = thankYouUrl;
            });

            purchaseModal.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget;
                const selectedQty = button.getAttribute('data-qty');
                const selectedTotal = button.getAttribute('data-total');
                const selectedName = button.getAttribute('data-name');
                const modalProductName = purchaseModal.querySelector('#modal-product-name');
                modalProductName.textContent = selectedName;
                // Store data temporarily on an element for the finalize button to access
                modalProductName.setAttribute('data-qty-temp', selectedQty);
                modalProductName.setAttribute('data-total-temp', selectedTotal);
            });
        }
    }

    // ===================================================================
    //  LOGIC FOR THE THANK YOU PAGE (thank-you.html)
    // ===================================================================
    const thankyouPageIdentifier = document.getElementById('thankyou-title-section');
    if (thankyouPageIdentifier) {
        // 1. Get data from URL
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const email = urlParams.get('email');
        const qty = urlParams.get('qty');
        const total = urlParams.get('total');

        // 2. Get references to placeholder elements
        const customerNameEl = document.getElementById('customer-name-placeholder');
        const customerEmailEl = document.getElementById('customer-email-placeholder');
        const productImageEl = document.getElementById('product-image-placeholder');
        const productQtyEl = document.getElementById('product-qty-placeholder');
        const productTotalEl = document.getElementById('product-total-placeholder');
        const bonusContentEl = document.getElementById('bonus-content-placeholder');

        // 3. Populate general info
        if (name) customerNameEl.textContent = name;
        if (email) customerEmailEl.textContent = email;
        if (qty) productQtyEl.textContent = qty;
        if (total) productTotalEl.textContent = total;

        // 4. Define bonus and product image data
        let bonusImage = '';
        let bonusText = '';
        let productImage = '';

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

        const selectedBonus = bonuses[qty];

        // 5. Apply the specific bonus and product image
        if (selectedBonus) {
            productImageEl.src = `./assets/images/${selectedBonus.productImg}`;
            bonusContentEl.innerHTML = `
                <p>For your purchase of <strong>${qty} bottles</strong>, you’ll receive the ebook <strong>'${selectedBonus.title}'</strong>, ENJOY!</p>
                <img src="./assets/images/${selectedBonus.image}" alt="${selectedBonus.title}" class="img-fluid" style="max-width: 250px;">
            `;
        }
    }
});