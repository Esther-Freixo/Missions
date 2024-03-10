const fs = require('fs').promises;
const { log } = require('console');
const path = require('path')

async function readMissionsData() {
    try{
        const data = await fs.readFile(path.resolve(__dirname, '../../data/missions.json'))
        const missions = JSON.parse(data)
        return missions
    } catch (error) {
        console.log(`Erro na leitura do arquivo: ${error}`)
    }
}

module.exports = {
    readMissionsData
}

readMissionsData()

