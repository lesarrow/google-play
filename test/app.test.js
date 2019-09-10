const app = require('../app');

const expect = require('chai').expect;
const request = require('supertest');

describe('Express App', () => {

    it('GET /apps with genres Action', () => {

        return request(app.server)
            .get('/apps')
            .query({genres: "Action"})
            .expect(200);
    });

    it('GET /apps with genres Bob', () => {

        return request(app.server)
            .get('/apps')
            .query({genres: "Bob"})
            .expect(400);
    });
});
