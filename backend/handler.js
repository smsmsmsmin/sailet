const { GraphQLServerLambda } = require("graphql-yoga");
const { prisma } = require("./src/generated/prisma-client");
const resolvers = require("./src/resolvers");

const lambda = new GraphQLServerLambda({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

exports.server = lambda.graphqlHandler;
exports.redirect = (event, context, callback) => {
  const response = {
    statusCode: 301,
    headers: {
      Location: "https://sailet.app/"
    },
    body: ""
  };
  callback(null, response);
};
