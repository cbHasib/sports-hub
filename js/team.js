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
        <figure><img class="w-full" src="${strSportThumb}" alt="${strSport}" /></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${strSport}</h2>
            <p>${strSportDescription.slice(0, 90)}</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary" onclick="console.log('${idSport}')">Details</button>
            </div>
        </div>
    `;
    teamContainer.appendChild(div);
    })
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
        const {strPlayer, strThumb, strDescriptionEN} = player;
        const div = document.createElement('div');
        div.classList.add('card', 'card-compact', 'w-full', 'h-full', 'bg-base-100', 'shadow-lg', 'text-center');
        div.innerHTML = `
        <figure><img class="w-full" src="${strThumb}" alt="${strPlayer}" /></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">${strPlayer}</h2>
            <p>${strDescriptionEN? (strDescriptionEN.slice(0, 90)) : "No Description Found"}</p>
            <div class="card-actions justify-center">
                <button class="btn btn-primary">Details</button>
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