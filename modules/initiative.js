// functions regarding initiative setting and progression

// determine initiative to set turn order
export const determineInitiative = (rollForInitiativeBtn, playerData, enemyData) => {
    const initiativePopUp = document.getElementById("initiative-pop-up")
    const popUpContents =document.getElementById("pop-up-container");

    rollForInitiativeBtn.style.display = "none"
    initiativePopUp.style.display = "block"

    let savedPlayerInitiative = []
    let savedEnemyInitiative = []
    let playerKey = 0
    let enemyKey = 0

    // generate forms to enter initiative
    playerData.forEach((player) => {
        popUpContents.innerHTML += `
        <div>${player.Name} Initative: ${player.Initiative} <input class = "initaitive-roll" id = "${player.Name}-roll" type = 'number' required></div>
        `;
        savedPlayerInitiative.push({name: player.Name, initiative: player.Initiative, key: playerKey})
        playerKey += 1
    })

    enemyData.forEach((enemy) => {
        popUpContents.innerHTML += `
        <div>${enemy.Name} Initative: ${enemy.Initiative} <input class = "initaitive-roll" id = "${enemy.Name}-roll" type = 'number' required></div>
        ` ;
        savedEnemyInitiative.push({name: enemy.Name, initiative: enemy.Initiative, key: enemyKey})
        enemyKey += 1        
    })


    //submit initiative and save after rolls
    
    let confirmInitiative = document.getElementById("confirm-initiative")
    let endCombat = document.getElementById("end-combat-button")

    confirmInitiative.addEventListener("click", () => {

        savedPlayerInitiative.forEach((player) => {
            let input = document.getElementById(`${player.name}-roll`)
            if (input && input.value) {
                player.initiative = parseInt(input.value) + parseInt(playerData[player.key]['Initiative'])
            }
        })


        savedEnemyInitiative.forEach((enemy) => {
            let input = document.getElementById(`${enemy.name}-roll`)
            if (input && input.value) {
                enemy.initiative = parseInt(input.value) + parseInt(enemyData[enemy.key]['Initiative'])
            }
        })


        initiativePopUp.style.display = "none"
        endCombat.style.display = "flex"

        // set up player and enemy markers on initiative boards
        populateTracker(savedPlayerInitiative, savedEnemyInitiative)



        // button to forcably end combat

        
        endCombat.addEventListener("click", () => {
            console.log('clicked')
            rollForInitiativeBtn.style.display = "inline-block"
            endCombat.style.display = "none"
        })
    })


    // Reset in cancelling initiative
    let cancelInitiative = document.getElementById("cancel-initiative")

    cancelInitiative.addEventListener("click", () => {
        popUpContents.innerHTML = ''
        initiativePopUp.style.display = 'none'
        rollForInitiativeBtn.style.display = "block"
        savedPlayerInitiative = []
        savedEnemyInitiative = []
        playerKey = 0
        enemyKey = 0
    })
}

    // set up player and enemy markers on initiative board
const populateTracker = (savedPlayerInitiative, savedEnemyInitiative) => {
    let playerInitiativeBar = document.getElementById("player-initiative")
    let enemyInitiativeBar = document.getElementById("enemy-initiative")
    let initiativeList = []

    savedPlayerInitiative.forEach((player) => {
        playerInitiativeBar.innerHTML += `<div id = "${player.name}-marker" class = "initiative-marker player-marker">${player.name}</div>`
        initiativeList.push(parseInt(player.initiative))

    })

    savedEnemyInitiative.forEach((enemy) => {
        enemyInitiativeBar.innerHTML += `<div id = "${enemy.name}-marker" class = "initiative-marker enemy-marker">${enemy.name}</div>`
        initiativeList.push(parseInt(enemy.initiative))
    })
    console.log(initiativeList)
    let initMax = Math.max(...initiativeList)
    console.log(initMax)
    let initMin = Math.min(...initiativeList)
    let initModifier = initMax - initMin
    console.log(initModifier)

}