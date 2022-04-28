// Search for a tv show using some form of category or search term
// Retrieve results from api
// Display results on page
// Results should include: Title, date, if it's running still, and an image

const form = document.querySelector("#search-form");
const resultsList = document.querySelector("#results");

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const userSearch = form.elements.query.value;
    const results = await searchTvShows(userSearch);
    await addSearchResults(results);
})

const searchTvShows = async (search) => {
    const config = { params: { q: search } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config );
    return res.data
}

const addSearchResults = async (display) => {
    for ( let shows of display) {
        const newIMG = document.createElement("IMG");
        const newDiv = document.createElement("div");
        const newParagraph = document.createElement("p");

        newParagraph.classList.add("text-center")
        newDiv.classList.add("col", "mb-3", "p-1");

        if ( shows.show.image ) {
            const showIMG = shows.show.image.medium;
            newIMG.src = showIMG
            newIMG.classList.add("rounded", "img-fluid", "align-items-bottom")
        }

        const showName = shows.show.name;

        newParagraph.innerHTML = showName;
        
        newDiv.append(newParagraph);
        newDiv.append(newIMG);

        resultsList.append(newDiv);
    }
}