import React from "react";
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
} from "@chakra-ui/react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

type RadioCardProps = {
  children?: React.ReactNode;
};

const RadioCard = (props: RadioCardProps & UseRadioProps): JSX.Element => {
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
        boxShadow="md"
        _checked={{
          bg: "blue.500",
          color: "white",
          borderColor: "blue.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const AddTransaction = (): JSX.Element => {
  const transactionCategory = ["Needs", "Wants", "Invest"];
  const transactionStatus = ["Income", "Outcome"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "transactionStatus",
    defaultValue: "Income",
    onChange: console.log,
  });
  const group = getRootProps();

  return (
    <Center fontSize="xl" margin="36" flexDirection="column">
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
      <Box
        borderRadius="lg"
        bgColor="white"
        boxShadow="sm"
        maxW="3xl"
        w="full"
        mt="6"
      >
        <Box p="6">
          <FormControl id="transactionCategory" mt="4">
            <FormLabel>Select </FormLabel>
            <HStack {...group}>
              {transactionStatus.map((value) => {
                const radio = getRadioProps({
                  value,
                  enterKeyHint: "defaultValue",
                });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
          </FormControl>
          <FormControl id="title" isRequired mt="4">
            <FormLabel>Title</FormLabel>
            <Input placeholder="Title" variant="filled" />
          </FormControl>
          <FormControl id="amount" isRequired mt="4">
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="black"
                children="Rp"
              />
              <Input placeholder="Enter amount" variant="filled" />
            </InputGroup>
          </FormControl>
          <FormControl id="transactionDate" mt="4">
            <FormLabel>Transaction Date</FormLabel>
            <DayPickerInput onDayChange={(day) => console.log(day)} />
          </FormControl>
          <FormControl id="transactionCategory" mt="4">
            <FormLabel>Select Category</FormLabel>
            <HStack {...group}>
              {transactionCategory.map((value) => {
                const radio = getRadioProps({
                  value,
                  enterKeyHint: "defaultValue",
                });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
          </FormControl>
          <FormControl id="description" mt="4">
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter description"
              variant="filled"
              size="md"
            />
          </FormControl>
          <Button isFullWidth mt="8" colorScheme="blue">
            Submit
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default AddTransaction;
