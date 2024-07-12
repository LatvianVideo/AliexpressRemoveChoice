# What is it?
It's a [Tampermonkey]([https://pages.github.com/](https://www.tampermonkey.net/)) script, which will remove "choice" listings when searching on Aliexpress.


# What doesn't it do?
It wont remove choice listings from your home page or "related items" when viewing an item


# Why was it created?
Choice listings were annoying me, as i wanted to order items worth less than 10eur, but not need to pay 2eur shipping.


##
Created in a short time using chatgpt, expect errors.

Simple, but works for now.


```
// ==UserScript==
// @name         Remove Listings with Any Image in Specific Container on Aliexpress
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove Aliexpress listings with any image inside a specific service container div with width greater than 12, and refresh listings on page change
// @author       Your Name
// @match        https://www.aliexpress.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let hiddenListings = new Set();

    // Function to remove listings with any image inside the specific container with width greater than 12
    function removeListings() {
        // Restore previously hidden listings
        hiddenListings.forEach(listing => listing.style.display = '');

        // Select all listing elements
        const listings = document.querySelectorAll('.search-item-card-wrapper-gallery');
        hiddenListings = new Set();

        listings.forEach(listing => {
            // Check if the listing contains the specific container with any image
            const serviceContainer = listing.querySelector('div.multi--serviceContainer--3vRdzWN');
            if (serviceContainer) {
                const images = serviceContainer.querySelectorAll('img');
                images.forEach(img => {
                    if (img.width > 12) {
                        // Hide the listing if any image with width greater than 12 is found inside the service container
                        listing.style.display = 'none';
                        hiddenListings.add(listing);
                    }
                });
            }
        });
    }

    // Observe for new listings being added dynamically
    const observer = new MutationObserver(removeListings);
    observer.observe(document.body, { childList: true, subtree: true });

    // Observe for page changes to refresh listings
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            removeListings();
        }
    }).observe(document, { subtree: true, childList: true });

    // Run the function initially
    removeListings();
})();

```
