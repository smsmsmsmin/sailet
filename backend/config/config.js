module.exports.DATABASE_CONFIG = (serverless) => ({
    dev: {
        PRISMA_SECRET: 'sailetPrisma0327',
        APP_SECRET: 'jwtsecret123',
        PRISMA_MANAGEMENT_API_SECRET: 'sailetPrisma0327'
    },
    prod: {
        PRISMA_SECRET: 'sailetPrisma0327',
        APP_SECRET: 'jwtsecret123',
        PRISMA_MANAGEMENT_API_SECRET: 'sailetPrisma0327'
    }
});
