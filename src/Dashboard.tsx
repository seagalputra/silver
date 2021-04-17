import React from 'react';
import {
  Center,
  Box,
  Divider,
  Flex,
  Grid,
  Avatar,
  Button,
  Tooltip,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import FallbackProgress from './FallbackProgress';
import { ReactComponent as EmptyInbox } from './EmptyInbox.svg';

type RecentTransaction = {
  id: string;
  title: string;
  transactionDate: string;
  amount: string;
};

const RECENT_TRANSACTIONS = gql`
  query {
    dashboard {
      totalAmount
      totalWants
      totalNeeds
      totalInvest
    }
    transactions {
      id
      title
      transactionDate
      amount
    }
  }
`;

const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number.parseInt(amount));
};

const Dashboard = () => {
  const { loading, data } = useQuery(RECENT_TRANSACTIONS);

  return (
    <Center fontSize="xl" margin="36" flexDirection="column">
      <Box
        maxW="3xl"
        as="h1"
        lineHeight="tight"
        fontWeight="bold"
        color="black"
        fontSize="2xl"
        w="full"
      >
        Hello, how are you today? 👋
      </Box>

      <Box
        borderRadius="lg"
        bgColor="white"
        boxShadow="sm"
        maxW="3xl"
        w="full"
        mt="6"
      >
        <Box p="6">
          {loading ? (
            <VStack spacing="2" align="stretch">
              <Skeleton height="5" />
              <Skeleton height="10" />
            </VStack>
          ) : (
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex flexDirection="column" mr="2">
                <Box
                  as="h4"
                  lineHeight="tight"
                  fontWeight="medium"
                  color="gray.400"
                  fontSize="md"
                >
                  Your current budget
                </Box>
                <Box
                  as="h3"
                  lineHeight="tight"
                  fontWeight="bold"
                  fontSize="3xl"
                >
                  {formatCurrency(data?.dashboard.totalAmount)}
                </Box>
              </Flex>
              <Tooltip hasArrow label="Add transaction" placement="right">
                <Link to="/transaction/add">
                  <Button
                    colorScheme="blue"
                    p="3"
                    borderRadius="lg"
                    as="button"
                    size="24"
                  >
                    <FiPlus color="#ffffff" fontWeight="bold" />
                  </Button>
                </Link>
              </Tooltip>
            </Flex>
          )}
          <Divider orientation="horizontal" my="4" />
          <Grid gridGap="4" templateColumns="repeat(3, 1fr)">
            {loading ? (
              <VStack spacing="2" align="stretch">
                <Skeleton height="5" />
                <Skeleton height="7" />
              </VStack>
            ) : (
              <Flex flexDirection="column">
                <Box
                  as="h4"
                  lineHeight="tight"
                  fontWeight="medium"
                  color="gray.400"
                  fontSize="md"
                >
                  Needs
                </Box>
                <Box as="h3" lineHeight="tight" fontWeight="bold" fontSize="xl">
                  {formatCurrency(data?.dashboard.totalNeeds)}
                </Box>
              </Flex>
            )}
            {loading ? (
              <VStack spacing="2" align="stretch">
                <Skeleton height="5" />
                <Skeleton height="7" />
              </VStack>
            ) : (
              <Flex flexDirection="column">
                <Box
                  as="h4"
                  lineHeight="tight"
                  fontWeight="medium"
                  color="gray.400"
                  fontSize="md"
                >
                  Wants
                </Box>
                <Box as="h3" lineHeight="tight" fontWeight="bold" fontSize="xl">
                  {formatCurrency(data?.dashboard.totalWants)}
                </Box>
              </Flex>
            )}
            {loading ? (
              <VStack spacing="2" align="stretch">
                <Skeleton height="5" />
                <Skeleton height="7" />
              </VStack>
            ) : (
              <Flex flexDirection="column">
                <Box
                  as="h4"
                  lineHeight="tight"
                  fontWeight="medium"
                  color="gray.400"
                  fontSize="md"
                >
                  Invest
                </Box>
                <Box as="h3" lineHeight="tight" fontWeight="bold" fontSize="xl">
                  {formatCurrency(data?.dashboard.totalInvest)}
                </Box>
              </Flex>
            )}
          </Grid>
        </Box>
      </Box>
      <Box
        maxW="3xl"
        as="h4"
        lineHeight="tight"
        fontWeight="medium"
        color="gray.400"
        fontSize="md"
        mt="9"
        w="full"
      >
        Recent Transactions
      </Box>
      {loading ? (
        <Box mt="6">
          <FallbackProgress size="xl" />
        </Box>
      ) : (
        <Box
          borderRadius="lg"
          bgColor="white"
          boxShadow="sm"
          maxW="3xl"
          w="full"
          mt="4"
        >
          <Box p="6">
            {data.transactions.length === 0 ? (
              <Center flexDirection="column">
                <Center mt="8" w="full">
                  <EmptyInbox width="25%" />
                </Center>
                <Box
                  as="h1"
                  textColor="gray.500"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="4"
                >
                  No transactions
                </Box>
                <Box
                  as="p"
                  textColor="gray.400"
                  fontWeight="normal"
                  fontSize="lg"
                  mb="8"
                >
                  Newest transactions will be listed in this section
                </Box>
              </Center>
            ) : (
              data.transactions.map(
                (transaction: RecentTransaction, index: number) => (
                  <Box key={transaction.id}>
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex flexDirection="row" alignItems="center">
                        <Avatar name={transaction.title} />
                        <Flex flexDirection="column" ml="4">
                          <Box
                            as="p"
                            fontWeight="bold"
                            isTruncated
                            lineHeight="tight"
                          >
                            {transaction.title}
                          </Box>
                          <Box
                            as="p"
                            fontWeight="normal"
                            color="gray.500"
                            fontSize="16"
                            isTruncated
                            lineHeight="tight"
                          >
                            {new Date(
                              transaction.transactionDate
                            ).toDateString()}
                          </Box>
                        </Flex>
                      </Flex>

                      <Box
                        as="p"
                        fontWeight="bold"
                        color={
                          transaction.amount.toString().startsWith('-')
                            ? 'red.500'
                            : 'green.500'
                        }
                      >
                        {formatCurrency(transaction.amount)}
                      </Box>
                    </Flex>
                    {index === data.transactions.length - 1 ? null : (
                      <Divider my="6" />
                    )}
                  </Box>
                )
              )
            )}
          </Box>
        </Box>
      )}
    </Center>
  );
};

export default Dashboard;
