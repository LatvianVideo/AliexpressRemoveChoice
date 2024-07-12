// ==UserScript==
// @name         Remove Listings with Any Image in Specific Container on Aliexpress
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove Aliexpress listings with any image inside a specific service container div
// @author       Latvian Video
// @match        https://www.aliexpress.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove listings with any image inside the specific container
    function removeListings() {
        // Select all listing elements
        const listings = document.querySelectorAll('.search-item-card-wrapper-gallery');

        listings.forEach(listing => {
            // Check if the listing contains the specific container with any image
            const serviceContainer = listing.querySelector('div.multi--serviceContainer--3vRdzWN');
            if (serviceContainer && serviceContainer.querySelector('img')) {
                // Remove the listing if any image is found inside the service container
                listing.remove();
            }
        });
    }

    // Run the function initially
    removeListings();

    // Optional: Observe for new listings being added dynamically
    const observer = new MutationObserver(removeListings);
    observer.observe(document.body, { childList: true, subtree: true });
})();
