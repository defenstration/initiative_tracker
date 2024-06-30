// Script for functions of creating and deleting enemy cards

// function to save enemy data
export const saveEnemyData = (enemyName, enemyStats, enemyData) => {

    let enemyStatsData = { name: enemyName };

    enemyStats.forEach((stat) => {
        const statInput = document.getElementById(`enemy-${stat}-input`);
        enemyStatsData[stat] = statInput && statInput.value ? statInput.value : 0;
    });

    enemyData.push(enemyStatsData);
    localStorage.setItem('enemyData', JSON.stringify(enemyData));
};

// function to generate enemy cards from local storage data
export const generateEnemyCards = (enemyData, enemyCardContainer, enemyStats) => {
    
    enemyCardContainer.innerHTML = ''; 

    enemyData.forEach((enemy) => {
        const card = document.createElement("div");
        card.className = "enemy-card";

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

// function to create the enemy entry form
export const generateEnemyForm = (enemyEntryForm, enemyStats) => {
    enemyEntryForm.style.display = "block";
    enemyEntryForm.innerHTML = `
        <span class="close" id="close-enemy-form">&times;</span>
    `;
    enemyStats.forEach((stat) => {
        enemyEntryForm.innerHTML += `
            <label class="label">${stat}</label>
            <input id="enemy-${stat}-input">
            <br>
        `;
    });
    enemyEntryForm.innerHTML += `
        <button type="submit" id="enemy-submit-btn">Submit</button>
    `;
}

// function to submit enemy entry
export const enemySubmit = (enemyEntryForm, enemyStats, enemyData, enemyCardContainer) => {
    const enemySubmitBtn = document.getElementById("enemy-submit-btn");

    enemySubmitBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        enemyEntryForm.style.display = "none";

        // Create card from form inputs
        const cardName = document.getElementById("enemy-Name-input").value;

        if (cardName) {
            saveEnemyData(cardName, enemyStats, enemyData);
            generateEnemyCards(enemyData, enemyCardContainer, enemyStats);
        }
    });

}

// function to delete enemy
export const deleteEnemy = (enemyData) => {
    let i = 0
    const deletePopUp = document.querySelector("#deletion-pop-up");
    const deletionTarget = document.getElementById("deletion-target");
    const confirmDeleteBtn = document.getElementById("confirm-deletion")
    const cancelDeleteBtn = document.getElementById("cancel-deletion");

    document.querySelectorAll(".enemy-card").forEach((card) => {
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

            deletePopUp.style.display = 'flex'
            console.log(enemyData[enemyBtnId])
            deletionTarget.textContent = `${enemyData[enemyBtnId]['name']}`

            confirmDeleteBtn.addEventListener("click", () => {
                console.log(enemyData[enemyBtnId])
                enemyData.splice(enemyBtnId, 1)

                localStorage.setItem('enemyData', JSON.stringify(enemyData))

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