const { init } = require('../server');

describe('Home Route', () => {
    let server;

    beforeEach(async () => {
        server = await init(false);
    });

    it('should GET / and respond with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/'
        });
        expect(res.statusCode).toEqual(200);
    });
});
