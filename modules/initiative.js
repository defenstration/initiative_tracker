// functions regarding initiative setting and progression


export const determineInitiative = (rollForInitiativeBtn, playerData, enemyData) => {
    const initiativePopUp = document.getElementById("initiative-pop-up")
    const popUpContents =document.getElementById("pop-up-container");

    rollForInitiativeBtn.style.display = "none"
    initiativePopUp.style.display = "block"

    let savedPlayerInitiative = []
    let savedEnemyInitiative = []
    let playerKey = 0
    let enemyKey = 0

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


    //submit initiative
    
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
        savedPlayerInitiative = []
        savedEnemyInitiative = []
        playerKey = 0
        enemyKey = 0
    })
}