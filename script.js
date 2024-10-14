const characterList = document.querySelector(".character_list");
const loadingTitle = document.querySelector('.loading_text');
const previousBtn = document.querySelector(".previous_button");
const nextBtn = document.querySelector(".next_button");
const pagesCount = document.querySelector(".count_of_pages");
const url = 'https://rickandmortyapi.com/api/character';
let nextPageUrl;
let previousPageUrl;

function getPageNumberFromUrl(url) {
    let position = url.indexOf('=');
    return parseInt(url.slice(position+1));
}

function showCharacterList(data) {
    let characterItems = '';
    data.results.forEach(character => {
        characterItems += `
        <li class="character_item">
            <img class="item_img" src=${character.image}>
            <h3 class="item_name text">${character.name}</h3>
            <p class="item_description text">${character.status}</p>
        </li>
    `
    })
    characterList.innerHTML = characterItems;
}

function pagination (data) {
    const pageNumber = data.info.next ? getPageNumberFromUrl(data.info.next) - 1 : data.info.pages;
    pagesCount.innerHTML = `Page: ${pageNumber}`;

    if (data.info.next) {
        nextBtn.disabled = false;
        nextPageUrl = data.info.next;
        nextBtn.classList.remove("disabled_btn");
    } else {
        nextBtn.disabled = true;
        nextBtn.classList.add("disabled_btn");
    }

    if (data.info.prev) {
        previousBtn.disabled = false;
        previousPageUrl = data.info.prev;
        previousBtn.classList.remove("disabled_btn");
    } else {
        previousBtn.disabled = true;
        previousBtn.classList.add("disabled_btn");
    }
}

async function fetchCharacters(url) {
    characterList.classList.add("hide");
    loadingTitle.classList.remove("hide");

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        showCharacterList(data);
        pagination(data);

    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        loadingTitle.classList.add("hide");
        characterList.classList.remove("hide");
    }
}

fetchCharacters(url)

nextBtn.addEventListener('click', () => {
    if (nextPageUrl) {
        fetchCharacters(nextPageUrl);
    }
});

previousBtn.addEventListener('click', () => {
    if (previousPageUrl) {
        fetchCharacters(previousPageUrl);
    }
});



