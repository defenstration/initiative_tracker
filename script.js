const addPlayerBtn = document.getElementById('add-player-btn')
const addEnemyBtn = document.getElementById('add-enemy-btn')
const playerEntryForm = document.getElementById("player-entry-form")
const enemyEntryForm = document.getElementById("enemy-entry-form")
const enemySubmitBtn = document.getElementById("enemy-submit-btn")
const playerCardContainer = document.getElementById("player-card-container")
const enemyCardContainer = document.getElementById("enemy-card-container")


// list of player stats
const playerStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]

// list of enemy stats
const enemyStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]

// function to create player cards
const createPlayerCard = () => {
    const card = document.createElement("div")
    card.className = "card"
    let cardContent = []
    
    playerStats.forEach((stat) => {
        let statValue;
        const statInput = document.getElementById(`${stat}-input`)
        if (statInput && statInput.value != null) {
            statValue = statInput.value
            console.log(statValue)
        } else {
            statValue = 0
            //console.log(statValue)
        }
        
        cardContent.push( {stat: statValue} )
 
        
    })

    console.log(cardContent) 
    card.innerText = cardContent;
    playerCardContainer.appendChild(card);
}

// creates player cards from local storage on page load
window.addEventListener('load', () => {
    const savedCards = JSON.parse(localStorage.getItem('playerCards')) || [];
    savedCards.forEach(cardName => createPlayerCard(cardName))
})

// add player button creates entry form
addPlayerBtn.addEventListener("click", () => {
    // makes entry form visible
    playerEntryForm.style.display = "block";
    // generates form fields using player stats list
    playerEntryForm.innerHTML = `
        <span class= "close" id = "close">&times;</span>
    `;
    playerStats.forEach((stat) => {
        playerEntryForm.innerHTML += `
        <label class = "label">${stat}</label>
        <input class = "${stat}-input">
        </br>
        `
    });
    playerEntryForm.innerHTML += `
    <button type = "submit" id = "player-submit-btn">Submit</button>
    ` 

    //Add close button functionality
    const closeBtn = document.getElementById("close")

    closeBtn.addEventListener("click", () => {
        playerEntryForm.style.display = "none"
        console.log('clicked')
    })
    // add player submit button functionality on form 
    const playerSubmitBtn = document.getElementById("player-submit-btn")

    playerSubmitBtn.addEventListener("click", () => {
        //hides player entry form
        playerEntryForm.style.display = "none";

        // create card from form inputs
        const cardName = document.querySelector(".Name-input").value;

        
        if (cardName) {
            createPlayerCard();
            // save card to local storage
            const savedCards = JSON.parse(localStorage.getItem('playerCards')) || [];
            savedCards.push(cardName);
            localStorage.setItem("playerCards", JSON.stringify(savedCards))
        }
    })
})




addEnemyBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "block"

    enemyEntryForm.innerHTML = `
    <span class= "close" id = "close">&times;</span>
`;

    //Add close button functionality
    const closeBtn = document.getElementById("close")

    closeBtn.addEventListener("click", () => {
        enemyEntryForm.style.display = "none"
        console.log('clicked')
    })
})



enemySubmitBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "none";
})

