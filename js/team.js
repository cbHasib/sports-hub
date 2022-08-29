const mainBody = document.getSelection('main');
const progress = document.getElementById('progress');


const clearAll = () => {
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = ``;

    const teamContainer = document.getElementById('team-container');
    teamContainer.innerHTML = ``;
}


const loadTeam = () => {
    // mainBody.classList.add('hidden');
    progress.classList.remove('hidden');

    fetch('https://www.thesportsdb.com/api/v1/json/2/all_sports.php')
    .then(res => res.json())
    .then(data => displayTeam(data.sports))
}

const searchPlayerLoad = (playerName) => {
    progress.classList.remove('hidden');

    fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`)
    .then(res => res.json())
    .then(data => displaySearch(data.player))
}


const displayTeam = (teams) => {
    const teamContainer = document.getElementById('team-container');
    teamContainer.innerHTML = ``;

    progress.classList.add('hidden');
    // mainBody.style.display = 'block';
    // progress.style.display = 'none';
    teams.forEach(team => {
        const {idSport, strSport, strSportDescription, strSportThumb, strSportIconGreen} = team;
        const div = document.createElement('div');
        div.classList.add('card', 'card-compact', 'w-full', 'h-full', 'bg-base-100', 'shadow-lg', 'text-center');
        div.innerHTML = `
        <figure><img class="w-full" src="${strSportThumb}" alt="${strSport}" onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';"/></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${strSport}</h2>
            <p>${strSportDescription.slice(0, 90)}</p>
            <div class="card-actions justify-center">   
            </div>
        </div>
    `;
    teamContainer.appendChild(div);
    })
}

const modalData = (playerId) => {
    const modalContainer = document.getElementById('modal-body');
    modalContainer.innerHTML = '';
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`)
    .then(res => res.json())
    .then(data => modalBody(data.players[0]))
}

const modalBody = player => {
    const {dateBorn, strPlayer, strThumb, strSport} = player;
    // console.log(dateBorn, strPlayer, strSport);

    const modalContainer = document.getElementById('modal-body');
    const div = document.createElement('div');
    // div.classList.add('modal-box');
    div.innerHTML = `<div class="modal-box card w-full bg-base-100 shadow-xl">
    <figure class="px-5 pt-5">
    <img class="rounded-xl h-60 w-full object-cover" src="${strThumb}" alt="${strPlayer}" onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';"/>
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${strPlayer}</h2>
        <p>${strSport}</p>
        <p>${dateBorn}</p>
        <div class="card-actions">
        <label for="my-modal" class="btn btn-primary mt-2">Close</label>
        </div>
    </div>
    </div>`;
    modalContainer.appendChild(div);
}


const displaySearch = (players) => {
    const searchContainer = document.getElementById('search-container');
    searchContainer.innerHTML = ``;

    const teamContainer = document.getElementById('team-container');
    teamContainer.innerHTML = ``;

    progress.classList.add('hidden');
    // mainBody.style.display = 'block';
    // progress.style.display = 'none';
    players.forEach(player => {
        const {strPlayer, strThumb, strDescriptionEN, idPlayer} = player;
        const div = document.createElement('div');
        div.classList.add('card', 'card-compact', 'w-full', 'h-full', 'bg-base-100', 'shadow-lg', 'text-center');
        div.innerHTML = `
        <figure><img class="w-full" src="${strThumb}" alt="${strPlayer}" onerror="this.onerror=null;this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';"/></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${strPlayer}</h2>
            <p>${strDescriptionEN? (strDescriptionEN.slice(0, 90)) : "No Description Found"}</p>
            <div class="card-actions justify-center">
            <label for="my-modal" class="btn btn-primary" onclick="modalData('${idPlayer}')">Details</label>
            </div>
        </div>
    `;
    searchContainer.appendChild(div);
    })
}


document.getElementById('btn-search').addEventListener('click', function(){
    const searchInput = document.getElementById('input-search');
    const searchValue = searchInput.value;
    searchPlayerLoad(searchValue)
    
})
document.getElementById('input-search').addEventListener('keypress', function(event){
    
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById('btn-search').click();
    }
    const searchInput = document.getElementById('input-search');
    const searchValue = searchInput.value;


    // searchPlayerLoad(searchValue)
    
})


// loadTeam();