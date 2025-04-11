
const accessKey = "pYbjVKBZdgUvYuYNxro6ciOODSfActncohYj8_zQtns";
const searchResultsEl = document.querySelector(".search-results");
const searchInputEl = document.getElementById("search-input");
const formEl = document.querySelector("form");
const showMoreButton = document.getElementById("show-more-button")
console.log(showMoreButton);
let page = 1;


/* async function searchImages(inputData){
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}
`);
const data = await response.json();

if(page > 1){
    showMoreButton.style.display = "block";
}

if(page === 1){
    searchResultsEl.innerHTML = "";
}

const results = data.results;

results.map((result) =>{
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result")
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
    
})

page++


}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const inputValue = searchInputEl.value;
    searchImages(inputValue);
    page = 1;
})
*/

async function searchImages(inputData) {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`);
    const data = await response.json();

    if (page === 1) {
        searchResultsEl.innerHTML = ""; // Clear results for a new search
    }

    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });

    // Show the "Show More" button for subsequent pages
    if (results.length > 0) {
        showMoreButton.style.display = "block";
    } else {
        showMoreButton.style.display = "none"; // Hide button if no more results
    }

    page++; // Increment the page for the next search
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = searchInputEl.value;
    page = 1; // Reset the page to 1 for a new search
    searchImages(inputValue);
});

// "Show More" button handler
showMoreButton.addEventListener("click", () => {
    const inputValue = searchInputEl.value;
    searchImages(inputValue); // Fetch the next page of results
    page++;
});



