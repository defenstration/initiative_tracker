// Script for player functions for creation and deleting of player cards

// function to save player data
export const savePlayerData = (playerName, playerStats, playerData) => {

    let playerStatsData = { name: playerName };

    playerStats.forEach((stat) => {
        const statInput = document.getElementById(`${stat}-input`);
        playerStatsData[stat] = statInput && statInput.value ? statInput.value : 0;
    });

    playerData.push(playerStatsData);
    localStorage.setItem('playerData', JSON.stringify(playerData));
};

// function to generate player cards from local storage data
export const generatePlayerCards = (playerData, playerCardContainer, playerStats) => {
    
    playerCardContainer.innerHTML = ''; 

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

// function to create the player entry form
export const generatePlayerForm = (playerEntryForm, playerStats) => {
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
}

// function to submit player entry
export const playerSubmit = (playerEntryForm, playerStats, playerData, playerCardContainer) => {
    const playerSubmitBtn = document.getElementById("player-submit-btn");

    playerSubmitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        playerEntryForm.style.display = "none";

        // Create card from form inputs
        const cardName = document.getElementById("Name-input").value;

        if (cardName) {
            savePlayerData(cardName, playerStats, playerData);
            generatePlayerCards(playerData, playerCardContainer, playerStats);
        }
    });

}

// function to delete player
export const deletePlayer = (playerData) => {
    let i = 0
    const deletePopUp = document.querySelector("#deletion-pop-up");
    const deletionTarget = document.getElementById("deletion-target");
    const confirmDeleteBtn = document.getElementById("confirm-deletion")
    const cancelDeleteBtn = document.getElementById("cancel-deletion");

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

            deletePopUp.style.display = 'flex'
            deletionTarget.textContent = `${playerData[playerBtnId]['name']}`

            confirmDeleteBtn.addEventListener("click", () => {
                console.log(playerData[playerBtnId])
                playerData.splice(playerBtnId, 1)

                localStorage.setItem('playerData', JSON.stringify(playerData))

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
}