const assert = require('assert');
const starkinfra = require('../index.js');
const {generateExampleDynamicBrcodeJson} = require('./utils/dynamicBrcode');

starkinfra.user = require('./utils/user').exampleProject;


describe('TestDynamicBrcodePost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let brcodes = [];
        brcodes.push(new starkinfra.DynamicBrcode(generateExampleDynamicBrcodeJson()));
        brcodes = await starkinfra.dynamicBrcode.create(brcodes);
        for (let brcode of brcodes) {
            assert(typeof brcode.uuid == 'string');
        }
    });
});

describe('TestDynamicBrcodeQuery', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let purchases = await starkinfra.dynamicBrcode.query({'limit': 10});
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
        }
    });
});

describe('TestDynamicBrcodeGet', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let purchases = await starkinfra.dynamicBrcode.query({'limit': 1});
        for await (let purchase of purchases) {
            assert(typeof purchase.uuid == 'string');
            purchase = await starkinfra.dynamicBrcode.get(purchase.uuid);
            assert(typeof purchase.uuid == 'string');
        }
    });
});


const UUID = '21f174ab942843eb90837a5c3135dfd6';
const VALID_SIGNATURE = 'MEYCIQC+Ks0M54DPLEbHIi0JrMiWbBFMRETe/U2vy3gTiid3rAIhANMmOaxT03nx2bsdo+vg6EMhWGzdphh90uBH9PY2gJdd';
const INVALID_SIGNATURE = 'MEUCIQDOpo1j+V40DNZK2URL2786UQK/8mDXon9ayEd8U0/l7AIgYXtIZJBTs8zCRR3vmted6Ehz/qfw1GRut/eYyvf1yOk=';


describe('TestDynamicBrcodeParseRight', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let authorization = await starkinfra.dynamicBrcode.verify({uuid: UUID, signature: VALID_SIGNATURE})
    });
});


describe('TestDynamicBrcodeParseWrong', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let error = false;
        try {
            let authorization = await starkinfra.dynamicBrcode.verify({uuid: UUID, signature: INVALID_SIGNATURE})
        } catch (e) {
            error = true;
        }
        assert(error);
    });
});

describe('TestDynamicBrcodeParseMalformed', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let error = false;
        try {
            let authorization = await starkinfra.dynamicBrcode.verify({uuid: UUID, signature: 'something is definitely wrong'})
        } catch (e) {
            error = true;
        }
        assert(error);
    });
});
