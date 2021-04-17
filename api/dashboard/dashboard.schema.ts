import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType({ description: 'Information that provided for dashboard' })
export class Dashboard {
  @Field((_type) => Int)
  totalAmount!: number;

  @Field((_type) => Int)
  totalNeeds!: number;

  @Field((_type) => Int)
  totalWants!: number;

  @Field((_type) => Int)
  totalInvest!: number;
}
