module.exports = {
    method: 'GET',
    path: '/helath',
    options: {
        handler: () => {
            return 'Healthy!';
        },
    },
};
