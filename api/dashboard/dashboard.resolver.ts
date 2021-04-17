import { Query, Resolver } from 'type-graphql';
import { Dashboard } from './dashboard.schema';
import { TransactionModel } from '../transaction/transaction.schema';

@Resolver((of) => Dashboard)
export class DashboardResolver {
  @Query((returns) => Dashboard)
  async dashboard(): Promise<Dashboard> {
    const result: Dashboard[] = await TransactionModel.aggregate([
      {
        $lookup: {
          from: 'transactiondetails',
          localField: 'transactionDetail',
          foreignField: '_id',
          as: 'transactionDetail',
        },
      },
      {
        $unwind: '$transactionDetail',
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalNeeds: { $sum: '$transactionDetail.needs' },
          totalWants: { $sum: '$transactionDetail.wants' },
          totalInvest: { $sum: '$transactionDetail.invest' },
        },
      },
    ]).exec();

    if (result.length === 0) {
      return {
        totalAmount: 0,
        totalInvest: 0,
        totalNeeds: 0,
        totalWants: 0,
      };
    }

    return {
      totalAmount: result[0].totalAmount,
      totalInvest: result[0].totalInvest,
      totalNeeds: result[0].totalNeeds,
      totalWants: result[0].totalWants,
    };
  }
}
