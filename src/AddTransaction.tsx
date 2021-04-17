import React, { useState } from 'react';
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Flex,
  Tooltip,
  useRadio,
  UseRadioProps,
  useRadioGroup,
  HStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

type RadioCardProps = {
  children?: React.ReactNode;
};

const RadioCard = (props: RadioCardProps & UseRadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: 'blue.500',
          color: 'white',
          borderColor: 'blue.500',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

interface IAddTransction {
  title: string;
  amount: number;
  transactionDate: string;
  description: string;
  category: string;
  transactionStatus: string;
}

const ADD_TRANSACTION = gql`
  mutation createTransaction($data: TransactionInput!) {
    createTransaction(transaction: $data) {
      id
    }
  }
`;

const AddTransaction = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    category: '',
    transactionStatus: 'income',
  });
  const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION);
  const toast = useToast();

  const transactionCategory = ['Needs', 'Wants', 'Invest'];
  const { register, control, handleSubmit } = useForm<IAddTransction>();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'transactionCategory',
    onChange: (nextValue: string) =>
      setFormData((currentValue) => {
        return { ...currentValue, category: nextValue.toLowerCase() };
      }),
  });
  const group = getRootProps();

  const onSubmit = (data: IAddTransction) => {
    const amount =
      formData.transactionStatus === 'income' ? data.amount : `-${data.amount}`;

    const submitted = {
      ...data,
      amount: +amount,
      transactionStatus: formData.transactionStatus,
      transactionDate: convertToISODate(data.transactionDate),
      category: formData.category,
    };

    addTransaction({ variables: { data: submitted } })
      .then(() =>
        toast({
          title: 'Transaction created.',
          description: "We've successfully added your transaction.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      )
      .catch(() =>
        toast({
          title: 'Failed to add transaction.',
          description:
            "Sorry, we've failed to add your transaction. Please try again later.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      );
  };

  const convertToISODate = (date?: string): string =>
    date
      ? new Date(date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  return (
    <Center fontSize="xl" margin="24" flexDirection="column">
      <Box maxW="3xl" w="full">
        <Flex alignItems="center">
          <Tooltip hasArrow label="Back to dashboard" placement="top">
            <Link to="/">
              <IconButton aria-label="Back" icon={<FiArrowLeft />} />
            </Link>
          </Tooltip>
          <Box as="h1" color="black" fontWeight="bold" ml="4">
            Add Transaction
          </Box>
        </Flex>
      </Box>
      <Tabs
        borderRadius="lg"
        bgColor="transparent"
        boxShadow="sm"
        maxW="3xl"
        w="full"
        mt="6"
        isFitted
        isLazy
        variant="enclosed"
        index={tabIndex}
        onChange={(index) => {
          setFormData((prevValue) => ({
            ...prevValue,
            transactionStatus: index === 0 ? 'income' : 'outcome',
          }));
          setTabIndex(index);
        }}
      >
        <TabList>
          <Tab _selected={{ color: 'black', bg: 'white' }} bgColor="gray.200">
            Income
          </Tab>
          <Tab _selected={{ color: 'black', bg: 'white' }} bgColor="gray.200">
            Outcome
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel bgColor="white" borderRadius="lg">
            <Box p="4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    variant="filled"
                    {...register('title')}
                  />
                </FormControl>
                <FormControl id="amount" isRequired mt="6">
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      children="Rp"
                    />
                    <Input
                      placeholder="Enter amount"
                      variant="filled"
                      {...register('amount')}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="transactionDate" mt="6">
                  <FormLabel>Transaction Date</FormLabel>
                  <Controller
                    name="transactionDate"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState, formState }) => (
                      <DayPickerInput
                        onDayChange={field.onChange}
                        placeholder={`${convertToISODate()}`}
                      />
                    )}
                  />
                </FormControl>
                <FormControl id="description" mt="6">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Enter description"
                    variant="filled"
                    size="md"
                    {...register('description')}
                  />
                </FormControl>
                <Button
                  type="submit"
                  isFullWidth
                  mt="8"
                  colorScheme="blue"
                  isLoading={loading}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </TabPanel>
          <TabPanel bgColor="white" borderRadius="lg">
            <Box p="4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    variant="filled"
                    {...register('title')}
                  />
                </FormControl>
                <FormControl id="amount" isRequired mt="6">
                  <FormLabel>Amount</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="black"
                      children="Rp"
                    />
                    <Input
                      placeholder="Enter amount"
                      variant="filled"
                      {...register('amount')}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="transactionDate" mt="6">
                  <FormLabel>Transaction Date</FormLabel>
                  <Controller
                    name="transactionDate"
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState, formState }) => (
                      <DayPickerInput
                        onDayChange={field.onChange}
                        placeholder={`${convertToISODate()}`}
                      />
                    )}
                  />
                </FormControl>
                <FormControl id="transactionCategory" mt="6">
                  <FormLabel>Select Category</FormLabel>
                  <HStack {...group} spacing="21px" align="stretch">
                    {transactionCategory.map((value) => {
                      const radio = getRadioProps({
                        value,
                        enterKeyHint: 'defaultValue',
                      });
                      return (
                        <RadioCard key={value} {...radio}>
                          {value}
                        </RadioCard>
                      );
                    })}
                  </HStack>
                </FormControl>
                <FormControl id="description" mt="6">
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Enter description"
                    variant="filled"
                    size="md"
                    {...register('description')}
                  />
                </FormControl>
                <Button
                  type="submit"
                  isFullWidth
                  mt="8"
                  colorScheme="blue"
                  isLoading={loading}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default AddTransaction;
