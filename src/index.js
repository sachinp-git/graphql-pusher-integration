const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const { PusherChannel } = require('graphql-pusher-subscriptions');

const pubsub = new PusherChannel({ //config object to be obtained after configuring channels on pusher
  appId: 'YOUR_APP_ID',
  key: 'YOUR_APP_KEY',
  secret: 'YOUR_SECRET',
  cluster: 'YOUR_CLUSTER',
  channel: 'YOUR_CHANNEL'
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