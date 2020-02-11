module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        handler: () => {
            return 'Healthy!';
        },
    },
};
