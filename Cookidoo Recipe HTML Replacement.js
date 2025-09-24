// ==UserScript==
// @name         Cookidoo Recipe HTML Replacement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace the current page's HTML with content from an external URL.
// @author       You
// @match        *://*.cookidoo.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Regular expression to check if the URL ends with 'r' followed by digits
    const recipeIdRegex = /r\d+$/;

    // Get the current URL
    const currentUrl = window.location.href;

    // Check if the URL matches the pattern (ends with 'r' followed by digits)
    if (recipeIdRegex.test(currentUrl)) {
        // Extract the recipe ID (e.g., 'r510591')
        const recipeId = currentUrl.split('/').pop();

        // Construct the URL to fetch the HTML content from
        const newUrl = `https://raw.githubusercontent.com/gehzovvewhakgurRy0/tqzlfztfgr/vaspzooggj/r/${recipeId}.html`;

        // Fetch the HTML content from the external URL
        fetch(newUrl)
            .then(response => {
                if (response.status === 200) {
                    return response.text(); // Get the response as text (HTML) if status is 200
                } else {
                    throw new Error(`Failed to load: ${response.status}`); // Handle non-200 responses
                }
            })
            .then(htmlContent => {
                // Replace the current document's <html> content with the fetched HTML
                document.documentElement.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Failed to load external HTML:', error);
            });
    }
})();

