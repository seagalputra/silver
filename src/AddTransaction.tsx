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
} from "@chakra-ui/react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const AddTransaction: React.FC<{}> = () => {
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
          <FormControl id="title" isRequired>
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
