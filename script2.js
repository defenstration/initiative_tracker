// queries
const addPlayerBtn = document.getElementById('add-player-btn');
const addEnemyBtn = document.getElementById('add-enemy-btn');
const playerEntryForm = document.getElementById("player-entry-form");
const enemyEntryForm = document.getElementById("enemy-entry-form");
//const enemySubmitBtn = document.getElementById("enemy-submit-btn");
const playerCardContainer = document.getElementById("player-card-container");
const enemyCardContainer = document.getElementById("enemy-card-container");
const playerDeleteBtn   = document.getElementById("delete-player-btn");
const enemyDeleteBtn = document.getElementById('delete-enemy-btn');
//const body = document.querySelector("body");
//const initiativePopUp = document.getElementById("initiative-pop-up")
const rollForInitiativeBtn = document.getElementById("initiative-btn");
//const popUpContents =document.getElementById("pop-up-container");

// --variables

// list of player stats
const playerStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

// list of enemy stats
const enemyStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

// load player data
let playerData = JSON.parse(localStorage.getItem('playerData')) || []

// load enemy data
let enemyData = JSON.parse(localStorage.getItem('enemyData')) || []

// --imports
import * as pf from "./modules/playerFunctions.js";
import * as ef from "./modules/enemyFunctions.js";
import * as initiative from "./modules/initiative.js"

// --Player based functions 

// Creates player cards from local storage on page load
window.addEventListener('load', () => {
    pf.generatePlayerCards(playerData, playerCardContainer, playerStats);
});

// Add player button creates entry form
addPlayerBtn.addEventListener("click", () => {
    pf.generatePlayerForm(playerEntryForm, playerStats)
    pf.playerSubmit(playerEntryForm, playerStats, playerData, playerCardContainer)

    // Add close button functionality
    const closeBtn = document.getElementById("close-player-form");
    closeBtn.addEventListener("click", () => {
        playerEntryForm.style.display = "none";
    });
});

// Delete player button
playerDeleteBtn.addEventListener("click", () => {
    pf.deletePlayer(playerData)
})

// --Enemy based functions

// Creates enemy cards from local storage on page load
window.addEventListener('load', () => {
    ef.generateEnemyCards(enemyData, enemyCardContainer, enemyStats);
});

// Add enemy button creates entry form
addEnemyBtn.addEventListener("click", () => {
    ef.generateEnemyForm(enemyEntryForm, enemyStats)
    ef.enemySubmit(enemyEntryForm, enemyStats, enemyData, enemyCardContainer)

    // Add close button functionality
    const closeBtn = document.getElementById("close-enemy-form");
    closeBtn.addEventListener("click", () => {
        enemyEntryForm.style.display = "none";
    });
});

// Delete enemy button
enemyDeleteBtn.addEventListener("click", () => {
    ef.deleteEnemy(enemyData)
})

// --Initiative functions

// Roll for initiative
rollForInitiativeBtn.addEventListener("click", () => {
    initiative.determineInitiative(rollForInitiativeBtn, playerData, enemyData)
})