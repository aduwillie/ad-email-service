const { init } = require('../server');

describe('Home Route', () => {
    let server;

    beforeEach(async () => {
        server = await init(false);
    });

    it('should GET /health and respond with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/health'
        });
        expect(res.statusCode).toEqual(200);
    });
});
