document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector("input[type='text']");
    const searchButton = document.querySelector("input[type='submit']");
    const searchResultsContainer = document.querySelector(".search-results");

    searchButton.addEventListener("click", function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
            fetch(`https://products-api-2ttf.onrender.com/api/products?q=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    displaySearchResults(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            // Clear search results container if search term is empty
            searchResultsContainer.innerHTML = "";
        }
    });

    function displaySearchResults(results) {
        searchResultsContainer.innerHTML = "";

        if (results.length === 0) {
            const noResultsMessage = document.createElement("p");
            noResultsMessage.textContent = "No results found.";
            searchResultsContainer.appendChild(noResultsMessage);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement("div");
                resultItem.textContent = result.title;
                searchResultsContainer.appendChild(resultItem);
            });
        }
    }
});
