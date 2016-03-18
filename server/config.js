module.exports = {
    redis: {
        host: '<redis host>',
        password: '<redis password>'
    },
    crest: {
        host: 'public-crest.eveonline.com',
        rateLimit: 50
    },
    cacheTimers: {
        default: 5,
        '/sovereignty/campaigns/': 10,
        '/sovereignty/structures/': 10
    },
    http: {
        port: 10000
    }
};