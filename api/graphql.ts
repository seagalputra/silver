import 'reflect-metadata';
import micro from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { connect, Mongoose } from 'mongoose';

import { TransactionResolver } from './transaction/transaction.resolver';
import { DashboardResolver } from './dashboard/dashboard.resolver';

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [TransactionResolver, DashboardResolver],
  validate: false,
});
const cors = micro();

(async () => {
  const mongoDb: string = process.env.DATABASE_URL!;
  const mongoose: Mongoose = await connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoose.connection;
})();

const server = new ApolloServer({ schema });
const handler = server.createHandler({ path: '/api/graphql' });

export default cors((req, res) =>
  req.method === 'OPTIONS' ? res.end() : handler(req, res)
);
