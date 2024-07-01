// functions to set initiative scores and add markers to containers

// create initiative form

export const createInitiativeForm = (playerData, enemyData) => {
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
}

// determine initiative scores

export const determineInitiativeValues = () => {
    

}

// generate player and enemy markers

// cancel combat