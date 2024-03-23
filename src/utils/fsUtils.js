const fs = require('fs').promises;
const path = require('path');

const MISSION_DATA_PATH = '../../data/missions.json';

async function readMissionsData() {
        const data = await fs.readFile(path.resolve(__dirname, MISSION_DATA_PATH));
        const missions = JSON.parse(data);
        return missions;
}

async function writeNewMissionData(newMission) {
        const oldMissions = await readMissionsData();
        const newMissionWithId = { id: Date.now(), ...newMission };
        const allMissions = JSON.stringify([ ...oldMissions, newMissionWithId ]);

       await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), allMissions);
       return newMissionWithId;
}

async function updateMissionData(id, updatedMissionData) {
    const oldMissions = await readMissionsData();
    const updatedMission = { id, ...updatedMissionData };
    const updatedMissions = oldMissions.reduce((missionList, currentMission) => {
        if(currentMission.id === updatedMission.id) return [...missionList, updatedMission];
        return [...missionList, currentMission];
    }, [])

    const updatedData = JSON.stringify(updatedMissions);

       await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), updatedData);
       console.error(`Missão atualizada com sucesso`);
       return updatedMission;
}

async function deleteMissionData(id){
    const allMissions = await readMissionsData();

    const filtedMissions = allMissions.filter((mission) => mission.id !== id)

    const filtedMissionsData =  JSON.stringify(filtedMissions);

       await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), filtedMissionsData);
       console.error(`Missão Deletada com sucesso`);
}

module.exports = {
    readMissionsData,
    writeNewMissionData,
    updateMissionData,
    deleteMissionData,
};
