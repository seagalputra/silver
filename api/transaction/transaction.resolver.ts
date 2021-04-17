import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import {
  Transaction,
  TransactionDetailModel,
  TransactionDetail,
  TransactionInput,
  TransactionModel,
} from './transaction.schema';

@Resolver((of) => Transaction)
export class TransactionResolver {
  @Query((returns) => [Transaction])
  async transactions(): Promise<Transaction[]> {
    return TransactionModel.find().populate('transactionDetail');
  }

  @Query((returns) => Transaction)
  async transaction(@Arg('id') id: String): Promise<Transaction | null> {
    return TransactionModel.findOne({ _id: id }).populate('transactionDetail');
  }

  @Mutation((returns) => Transaction)
  async createTransaction(
    @Arg('transaction') transaction: TransactionInput
  ): Promise<Transaction> {
    const splittedAmount = this.splitAmount({
      amount: transaction.amount,
      status: transaction.transactionStatus.toString(),
      category: transaction.category?.toString(),
    });

    const detail: TransactionDetail = await (
      await TransactionDetailModel.create({
        ...splittedAmount,
        description: transaction.description,
        transactionStatus: transaction.transactionStatus,
      })
    ).save();

    const savedTrx: Promise<Transaction> = (
      await TransactionModel.create({
        title: transaction.title,
        amount: transaction.amount,
        transactionDate: transaction.transactionDate,
        transactionDetail: detail,
      })
    ).save();

    return savedTrx;
  }

  private splitAmount({
    amount,
    status,
    category,
  }: {
    amount: number;
    status: string;
    category: string | any;
  }) {
    return status === 'income'
      ? {
          needs: amount * 0.5,
          wants: amount * 0.4,
          invest: amount * 0.1,
        }
      : {
          [category]: amount,
        };
  }
}
