//axios-version.js

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = "live_ejyMbnHnAOFfo1sig8dFTGN1I2vMj7VnnD699IOMb68lFUfL1S6e7SrZyFoG4Loi";

axios.interceptors.request.use(config => {
console.log("Request started");
document.body.style.cursor = "progress";

const start = Date.now();
config.metadata = {startTime: start };

document.getElementById("progressBar").style.width ="0%";

return config;


});

axios.interceptors.response.use(response => {
const end = Date.now();
const duration = end - response.config.metadata.startTime;

console.log(`Request took ${duration}ms`);

document.body.style.cursor = "default";

return response;

});

function updateProgress(progressEvent) {
const progressBar = document.getElementById("progressBar");

const percent=Math.round(
(progressEvent.loaded * 100) / progressEvent.total
);
progressBar.style.width = percent+ "%";

}

const breedSelect = document.getElementById("breedSelect");

breedSelect.addEventListener("change", async (e) => {

    const breedId = e.target.value;

    const res = await axios.get("/images/search", {
        params: {
            breed_ids: breedId,
            limit: 5
        },
        onDownloadProgress: updateProgress
    });

    const images = res.data;

    const carousel = document.getElementById("carousel");
    const infoDump = document.getElementById("infoDump");

    carousel.innerHTML = "";
    infoDump.innerHTML = "";

    images.forEach(img => {
        const imageEl = document.createElement("img");
        imageEl.src = img.url;
        carousel.appendChild(imageEl);
    });

    if (images[0]?.breeds?.length) {
        const breed = images[0].breeds[0];

        infoDump.innerHTML = `
            <h2>${breed.name}</h2>
            <p>${breed.description}</p>
            <p>${breed.origin}</p>
            <p>${breed.temperament}</p>
        `;
    }
});
