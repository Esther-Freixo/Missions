const { writeNewMissionData } = require("./utils/fsUtils");

async function main() {
    const missions = await writeNewMissionData({
        "name": "Esther Freixo",
        "year": "1999",
        "country": "Brazil",
        "destination": "Space",
        "id": 28
    })
    console.log(missions)
}

main()