const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const { PusherChannel } = require('graphql-pusher-subscriptions');

const pubsub = new PusherChannel({
  appId: '1046878',
  key: '3c84229419ed7b47e5b0',
  secret: 'e86868a98a2f052981a6',
  cluster: 'ap2',
  encrypted: true,
  channel: 'my-channel'
});


const prisma = new PrismaClient({
  errorFormat: 'minimal',
})

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
      pubsub,
    }
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`))