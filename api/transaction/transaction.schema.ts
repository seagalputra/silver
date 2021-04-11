import { ObjectType, Field, ID, Int, InputType } from "type-graphql";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";

@ObjectType({ description: "A detail of the transaction" })
export class TransactionDetail {
  @Field(() => ID)
  id!: String;

  @Field((_type) => Int, { nullable: true })
  @Property({ default: 0 })
  needs?: number = 0;

  @Field((_type) => Int, { nullable: true })
  @Property({ default: 0 })
  wants?: number = 0;

  @Field((_type) => Int, { nullable: true })
  @Property({ default: 0 })
  invest?: number = 0;

  @Field({ nullable: true })
  @Property()
  description?: String;

  @Field({
    description:
      "A status for the transaction. It can be income, outcome or waiting",
  })
  @Property({ default: "waiting", required: true })
  transactionStatus!: String;
}

@ObjectType({ description: "The transaction schema" })
export class Transaction {
  @Field(() => ID)
  id!: String;

  @Field()
  @Property({ required: true })
  title!: String;

  @Field((_type) => Int)
  @Property({ required: true })
  amount!: number;

  @Field()
  @Property({ default: new Date() })
  transactionDate?: String;

  @Field((_type) => TransactionDetail)
  @Property({ ref: TransactionDetail })
  transactionDetail?: Ref<TransactionDetail>;
}

@InputType()
export class TransactionInput {
  @Field()
  title!: String;

  @Field((_type) => Int)
  amount!: number;

  @Field({ nullable: true })
  transactionDate?: String;

  @Field({ nullable: true })
  description?: String;

  @Field({
    description:
      "A status for the transaction. It can be income, outcome or waiting",
  })
  transactionStatus!: String;

  @Field({
    nullable: true,
    description:
      "A category for the transcation. It can be (needs, wants, or invest)",
  })
  category?: String;
}

export const TransactionModel = getModelForClass(Transaction);
export const TransactionDetailModel = getModelForClass(TransactionDetail);
