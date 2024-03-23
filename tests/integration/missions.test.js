const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
chai.use(chaiHttp);
const sinon = require('sinon');
const fs = require('fs');

const { expect } = chai;

const mockMissions = JSON.stringify([
    {"name":"Esther Freixo","year":"1999","country":"Brazil","destination":"Space","id":28},
    {"id":1710104593724,"name":"Vivitória","year":2002,"country":"Minas Gerais","destination":"Heart"},
    {"id":1710803592646,"name":"Esther","year":1999,"country":"MG","destination":"Vivitoria"},
    {"id":1711021797455,"name":"Vale-Freixo","year":2022,"country":"MG-ES","destination":"Happyness"},
    {"id":1711022063506,"name":"ValeFreixo","year":2022,"country":"MG-ES","destination":"Happyness"}]);

describe('Rota de Missions', function(){
    afterEach(function(){
        sinon.restore();
    });

    describe('GET /missions', function(){
        it('Retorna um lista de missions', async function(){
            sinon.stub(fs.promises,'readFile')
            .resolves(mockMissions);
            const response  = await chai.request(app).get('/missions');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.haveOwnProperty('missions');
            expect(response.body.missions).to.be.instanceOf(Array);
            expect(response.body.missions).to.have.lengthOf(5);
        });
    });

    describe('POST /missions', function(){
        it('Retorna a missão criada com um id', async function(){
            sinon.stub(fs.promises, 'writeFile')
            .resolves();

            const mockMission = {
                "name":"ValeFreixo",
                "year":2022,
                "country":"MG-ES",
                "destination":"Happyness"
            };

            const response = await chai.request(app).post('/missions').send(mockMission);

            expect(response.status).to.be.equal(201);
            expect(response.body).to.haveOwnProperty('missions');
            expect(response.body.missions).to.haveOwnProperty('id');
            expect(response.body.missions.name).to.equal(mockMission.name);
            expect(response.body.missions.year).to.equal(mockMission.year);
            expect(response.body.missions.country).to.equal(mockMission.country);
            expect(response.body.missions.destination).to.equal(mockMission.destination);

        });

        it('Escreve a nova missão no arquivo de missões', async function() {
            const mockMission = {
                "name":"Test Mission",
                "year":"2024",
                "country":"Test Country",
                "destination":"Test Destination"
            };
            
            sinon.stub(fs.promises, 'writeFile').resolves();
            await chai.request(app).post('/missions').send(mockMission);
            
            expect(fs.promises.writeFile.called).to.be.equal(true);
        })
    })
});
