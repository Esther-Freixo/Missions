const chai = require('chai');
const { expect } = chai;
const { readMissionsData } = require('../../src/utils/fsUtils');
const sinon = require('sinon');
const fs = require('fs');

const mockMissions = JSON.stringify([
    {"name":"Esther Freixo","year":"1999","country":"Brazil","destination":"Space","id":28},
    {"id":1710104593724,"name":"Vivitória","year":2002,"country":"Minas Gerais","destination":"Heart"},
    {"id":1710803592646,"name":"Esther","year":1999,"country":"MG","destination":"Vivitoria"},
    {"id":1711021797455,"name":"Vale-Freixo","year":2022,"country":"MG-ES","destination":"Happyness"},
    {"id":1711022063506,"name":"ValeFreixo","year":2022,"country":"MG-ES","destination":"Happyness"}]);


describe('A função readMissionsData', function() {
    afterEach(function(){
        sinon.restore();
    });
    
    it('Retorna um array com todos os elementos do arquivo json', async function() {
        sinon.stub(fs.promises, 'readFile')
        .resolves(mockMissions)
        const response = await readMissionsData();
        expect(response).to.be.instanceOf(Array);
        expect(response).to.have.lengthOf(5);
    });
});
