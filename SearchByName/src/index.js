
import {URL, ACCESS_KEY} from './constant.js';

const mainDiv = document.querySelector(".search-results");
const moreButton = document.getElementById("show-more-button");
let currentPage = 1;
let clear = false;


async function getQuery(page, event) {
  const error = document.querySelector(".error");
  try {
    event.preventDefault();
    let query = document.getElementById("search-input").value;
    query = typeof query === "string" ? query.trim() : "";
    const resp = await fetch(`
       ${URL}?page=${page}&query=${query}&client_id=${ACCESS_KEY}`);
    const respResult = await resp.json();
    const results = respResult.results;
    if(clear){
      mainDiv.innerHTML = "";
    }
    for (let i = 0; i < 10; i++) {
      const div = document.createElement("div");
      div.className = "search-result";
      mainDiv.appendChild(div);
      div.innerHTML = `
      <img src = ${results[i].urls.small}>;
      <a href=https://unsplash.com/photos/g-${results[i].id} target ="_blank">an image of a ${query}</a>
      `;
    }
    moreButton.style.display = "block";
    clear = true;
  } catch {
    error.innerText = "Opssssssssssssssss";
  }
}
function getMore() {
  clear = false;
  currentPage++;
  getQuery(currentPage, event);
}

document.getElementById("search-button").addEventListener("click", function(event) {
  getQuery(1, event);
});

document.getElementById("show-more-button").addEventListener("click", getMore);
