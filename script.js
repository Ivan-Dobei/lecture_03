const characterList = document.querySelector(".character_list");
const previousBtn = document.querySelector(".previous_button");
const nextBtn = document.querySelector(".next_button");
const pagesCount = document.querySelector(".count_of_pages");
const url = 'https://rickandmortyapi.com/api/character';

async function fetchCharacters(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// todo: add page counter
// todo: add pagination

fetchCharacters(url).then(response => {
    let characterItems = '';
    response.results.forEach(character => {
        characterItems += `
        <li class="character_item">
            <img class="item_img" src=${character.image}>
            <h3 class="item_name text">${character.name}</h3>
            <p class="item_description text">${character.status}</p>
        </li>
    `
    })
    characterList.innerHTML = characterItems;
})


