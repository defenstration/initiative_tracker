const addPlayerBtn = document.getElementById('add-player-btn');
const addEnemyBtn = document.getElementById('add-enemy-btn');
const playerEntryForm = document.getElementById("player-entry-form");
const enemyEntryForm = document.getElementById("enemy-entry-form");
const enemySubmitBtn = document.getElementById("enemy-submit-btn");
const playerCardContainer = document.getElementById("player-card-container");
const enemyCardContainer = document.getElementById("enemy-card-container");
const playerDeleteBtn   = document.getElementById("delete-player-btn");
const enemyDeleteBtn = document.getElementById('delete-enemy-btn');
const body = document.querySelector("body");
const deletePopUp = document.querySelector("#deletion-pop-up");
const initiativePopUp = document.getElementById("initiative-pop-up")
const deletionTarget = document.getElementById("deletion-target");
const confirmDeleteBtn = document.getElementById("confirm-deletion");
const cancelDeleteBtn = document.getElementById("cancel-deletion");
const rollForInitiativeBtn = document.getElementById("initiative-btn");
const popUpContents =document.getElementById("pop-up-container");


// list of player stats
const playerStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

// list of enemy stats
const enemyStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

// load player data
let playerData = JSON.parse(localStorage.getItem('playerData'))

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
            expandedContent.style.display = "flex";
        });

        card.addEventListener("mouseout", () => {
            minimalContent.style.display = "flex";
            expandedContent.style.display = "none";
        });

        playerCardContainer.appendChild(card);
    });
};

// Creates player cards from local storage on page load
window.addEventListener('load', () => {
    generatePlayerCards();
});


// load enemy data
let enemyData = JSON.parse(localStorage.getItem('enemyData'))

// function to save enemy data
const saveEnemyData = (enemyName) => {
    let enemyData = JSON.parse(localStorage.getItem('enemyData')) || [];

    let enemyStatsData = { name: enemyName };

    enemyStats.forEach((stat) => {
        const statInput = document.getElementById(`${stat}-input`);
        enemyStatsData[stat] = statInput && statInput.value ? statInput.value : 0;
    });

    enemyData.push(enemyStatsData);
    localStorage.setItem('enemyData', JSON.stringify(enemyData));
};

// function to generate enemy cards from local storage data
const generateEnemyCards = () => {
    const enemyData = JSON.parse(localStorage.getItem('enemyData')) || [];

    enemyCardContainer.innerHTML = ''; // Clear previous cards

    enemyData.forEach((enemy) => {
        const card = document.createElement("div");
        card.className = "card";

        // Minimal state content
        const minimalContent = document.createElement("div");
        minimalContent.className = "minimal-content";
        minimalContent.innerHTML = `<h3>${enemy.Name}</h3>`;

        // Expanded state content
        const expandedContent = document.createElement("div");
        expandedContent.className = "expanded-content";
        enemyStats.forEach((stat) => {
            expandedContent.innerHTML += `<div>${stat}: ${enemy[stat]}</div>`;
        });

        card.appendChild(minimalContent);
        card.appendChild(expandedContent);

        // Hover effect to toggle between minimal and expanded states
        card.addEventListener("mouseover", () => {
            minimalContent.style.display = "none";
            expandedContent.style.display = "flex";
        });

        card.addEventListener("mouseout", () => {
            minimalContent.style.display = "flex";
            expandedContent.style.display = "none";
        });

        enemyCardContainer.appendChild(card);
    });
};

// Creates player cards from local storage on page load
window.addEventListener('load', () => {
    generateEnemyCards();
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
            generatePlayerCards();
        }
    });
});

// Delete player button
playerDeleteBtn.addEventListener("click", () => {
    let i = 0
    document.querySelectorAll(".card").forEach((card) => {
        let btnExists = card.querySelector(".delete-player")

        if (btnExists) {
            return

        } else {
            card.innerHTML += `
                <span class="delete-player" id="${i}">&times;</span>
            `;
            card.style.display = 'flex'
            card.style.justifyContent = "center"
            i++
        }
        
    })

    let playerDeleteBtn = document.querySelectorAll(".delete-player")

    playerDeleteBtn.forEach((btn) => {
        
                
        btn.addEventListener("click", () => {
            let playerBtnId = btn.id
            let playerStorageData = JSON.parse(localStorage.getItem('playerData'))
            

            deletePopUp.style.display = 'flex'
            deletionTarget.textContent = `${playerStorageData[playerBtnId]['name']}`

            confirmDeleteBtn.addEventListener("click", () => {
                console.log(playerStorageData[playerBtnId])
                playerStorageData.splice(playerBtnId, 1)

                localStorage.setItem('playerData', JSON.stringify(playerStorageData))

                deletePopUp.style.display = 'none'
                deletionTarget.textContent = ''
                location.reload()
            })

            cancelDeleteBtn.addEventListener("click", () => {
                deletePopUp.style.display = 'none'
                deletionTarget.textContent = ''
                location.reload()
            })
        })


        
    })
})


// Add enemy button to add enemy card
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

        // Create card from form inputs
        const cardName = document.getElementById("Name-input").value;

        if (cardName) {
            saveEnemyData(cardName);
            generateEnemyCards();
        }
    });
});


// Delete enemy button
enemyDeleteBtn.addEventListener("click", () => {
    let i = 0
    document.querySelectorAll(".card").forEach((card) => {
        let btnExists = card.querySelector(".delete-enemy")

        if (btnExists) {
            return

        } else {
            card.innerHTML += `
                <span class="delete-enemy" id="${i}">&times;</span>
            `;
            card.style.display = 'flex'
            card.style.justifyContent = "center"
            i++
        }
        
    })

    let enemyDeleteBtn = document.querySelectorAll(".delete-enemy")

    enemyDeleteBtn.forEach((btn) => {
        
                
        btn.addEventListener("click", () => {
            let enemyBtnId = btn.id
            let enemyStorageData = JSON.parse(localStorage.getItem('enemyData'))
            

            deletePopUp.style.display = 'flex'
            deletionTarget.textContent = `${enemyStorageData[enemyBtnId]['name']}`

            confirmDeleteBtn.addEventListener("click", () => {
                console.log(enemyStorageData[enemyBtnId])
                enemyStorageData.splice(enemyBtnId, 1)

                localStorage.setItem('enemyData', JSON.stringify(enemyStorageData))

                deletePopUp.style.display = 'none'
                deletionTarget.textContent = ''
                location.reload()
            })

            cancelDeleteBtn.addEventListener("click", () => {
                deletePopUp.style.display = 'none'
                deletionTarget.textContent = ''
                location.reload()
            })
        })


        
    })
})


// Roll for initiative
rollForInitiativeBtn.addEventListener("click", () => {
    rollForInitiativeBtn.style.display = "none"
    initiativePopUp.style.display = "block"

    playerData.forEach((player) => {
        popUpContents.innerHTML += `
        <div>${player.Name} Initative: ${player.Initiative} <input class = "initaitive-roll" id = "${player.Name}-roll" type = 'number' required></div>
        `
        
    })

    //submit initiative
    let savedInitiative = []
    let confirmInitiative = document.getElementById("confirm-initiative")
    let inputs = document.querySelectorAll(".initiative-roll")

    confirmInitiative.addEventListener("click", () => {


    })
    

    // Reset in cancelling initiative
    let cancelInitiative = document.getElementById("cancel-initiative")

    cancelInitiative.addEventListener("click", () => {
        popUpContents.innerHTML = ''
        initiativePopUp.style.display = 'none'
        rollForInitiativeBtn.style.display = "block"

    })

    


})