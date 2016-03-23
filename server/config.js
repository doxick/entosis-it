module.exports = {
    redis: {
        host: 'toaster.nightware.nl',
        password: 'ToasterRedisCache'
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
    },
    session: {
        secret: 'this is my secret',
        maxAge: 60 * 60 * 1000
    }
};