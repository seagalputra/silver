import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchemaSync } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { connect, Mongoose } from "mongoose";

import { TransactionResolver } from "./transaction/transaction.resolver";

let schema: GraphQLSchema = buildSchemaSync({
  resolvers: [TransactionResolver],
  emitSchemaFile: true,
  validate: false,
});

(async () => {
  const mongoDb: string = "mongodb://localhost:27017/silver";
  const mongoose: Mongoose = await connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await mongoose.connection;
})();

const server = new ApolloServer({ schema });

export default server.createHandler({
  path: "/api/graphql",
});