const addPlayerBtn = document.getElementById('add-player-btn');
const addEnemyBtn = document.getElementById('add-enemy-btn');
const playerEntryForm = document.getElementById("player-entry-form");
const enemyEntryForm = document.getElementById("enemy-entry-form");
const enemySubmitBtn = document.getElementById("enemy-submit-btn");
const playerCardContainer = document.getElementById("player-card-container");
const enemyCardContainer = document.getElementById("enemy-card-container");

// list of player stats
const playerStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

// list of enemy stats
const enemyStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

// function to save player data
const savePlayerData = (playerName) => {
    let playerData = JSON.parse(localStorage.getItem('playerData')) || [];

    let playerStatsData = { name: playerName };

    playerStats.forEach((stat) => {
        const statInput = document.getElementById(`${stat}-input`);
        playerStatsData[stat] = statInput && statInput.value ? statInput.value : 0;
    });

    playerData.push(playerStatsData);
    localStorage.setItem('playerData', JSON.stringify(playerData));
};

// function to generate player cards from local storage data
const generatePlayerCards = () => {
    const playerData = JSON.parse(localStorage.getItem('playerData')) || [];

    playerCardContainer.innerHTML = ''; // Clear previous cards

    playerData.forEach((player) => {
        const card = document.createElement("div");
        card.className = "card";

        // Minimal state content
        const minimalContent = document.createElement("div");
        minimalContent.className = "minimal-content";
        minimalContent.innerHTML = `<h3>${player.Name}</h3>`;

        // Expanded state content
        const expandedContent = document.createElement("div");
        expandedContent.className = "expanded-content";
        playerStats.forEach((stat) => {
            expandedContent.innerHTML += `<div>${stat}: ${player[stat]}</div>`;
        });

        card.appendChild(minimalContent);
        card.appendChild(expandedContent);

        // Hover effect to toggle between minimal and expanded states
        card.addEventListener("mouseover", () => {
            minimalContent.style.display = "none";
            expandedContent.style.display = "block";
        });

        card.addEventListener("mouseout", () => {
            minimalContent.style.display = "block";
            expandedContent.style.display = "none";
        });

        playerCardContainer.appendChild(card);
    });
};

// Creates player cards from local storage on page load
window.addEventListener('load', () => {
    generatePlayerCards();
});

// Add player button creates entry form
addPlayerBtn.addEventListener("click", () => {
    playerEntryForm.style.display = "block";
    playerEntryForm.innerHTML = `
        <span class="close" id="close-player-form">&times;</span>
    `;
    playerStats.forEach((stat) => {
        playerEntryForm.innerHTML += `
            <label class="label">${stat}</label>
            <input id="${stat}-input">
            <br>
        `;
    });
    playerEntryForm.innerHTML += `
        <button type="submit" id="player-submit-btn">Submit</button>
    `;

    // Add close button functionality
    const closeBtn = document.getElementById("close-player-form");
    closeBtn.addEventListener("click", () => {
        playerEntryForm.style.display = "none";
    });

    // Add player submit button functionality on form
    const playerSubmitBtn = document.getElementById("player-submit-btn");
    playerSubmitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        playerEntryForm.style.display = "none";

        // Create card from form inputs
        const cardName = document.getElementById("Name-input").value;

        if (cardName) {
            savePlayerData(cardName);
            generatePlayerCards(); // Refresh player cards
        }
    });
});

addEnemyBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "block";
    enemyEntryForm.innerHTML = `
        <span class="close" id="close-enemy-form">&times;</span>
    `;
    enemyStats.forEach((stat) => {
        enemyEntryForm.innerHTML += `
            <label class="label">${stat}</label>
            <input id="${stat}-input">
            <br>
        `;
    });
    enemyEntryForm.innerHTML += `
        <button type="submit" id="enemy-submit-btn">Submit</button>
    `;

    // Add close button functionality
    const closeBtn = document.getElementById("close-enemy-form");
    closeBtn.addEventListener("click", () => {
        enemyEntryForm.style.display = "none";
    });

    // Add enemy submit button functionality on form
    const enemySubmitBtn = document.getElementById("enemy-submit-btn");
    enemySubmitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        enemyEntryForm.style.display = "none";

        // You can implement saveEnemyData and generateEnemyCards similar to player functions if needed
    });
});
