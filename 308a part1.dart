const breedSelect = document.getElementById("breedSelect");

async function intialLoad() {}
try{
const res = await fetch("https://api.theapi.com/v1/breeds");
const data = await res.json();

data.forEach(breed => {
const option = document.createElement("option");
option.value = breed.id;
option.textContent = breed.name;
breedSelect.appendChild(option);

});
//importnant: load first breed automatically
breedSelect.dispatchEvent(new Event("change"));


} catch (err) {
    console.error("Error loading breeds:,err);
}

initialLoad();

//Part 2 

breedSelect.addEventListener("change",async (e) =>
const breedId = e.target.value;

const res = await fetch(
https://thecatapi.com/
);

const images = await res.json();

const carousel = document.getElementById("carousel")
const infoDump = document.getElementById("infoDump")

carousel.innerHTML = "";
infoDump.innerHTML = "";

images.forEach(img=> {
const imageEl= document.createElement("img");
imageEl.src = img.url;
carousel.appendChild(imageEl);

});

if (images[0]?.breeds?.length) {
const breed = images[0].breeds[0];

infoDump.innerHTML =
<h2>${breed.name}</h2>
<p>${breed.description}</p>
<p><b>Origin:</b>${breed.orgin}</p>
<p><b>Temperament:</b>${breed.temperament}</p>
;
}
});