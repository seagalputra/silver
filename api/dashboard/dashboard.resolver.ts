import { Query, Resolver } from 'type-graphql';
import { Dashboard } from './dashboard.schema';

@Resolver((of) => Dashboard)
export class DashboardResolver {
  @Query((returns) => Dashboard)
  dashboard(): Dashboard {
    return {
      totalAmount: 3_000_000,
      totalInvest: 450_000,
      totalNeeds: 500_000,
      totalWants: 2_050_000,
    };
  }
}
