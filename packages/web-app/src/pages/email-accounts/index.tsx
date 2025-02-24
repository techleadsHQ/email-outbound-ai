import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Heading,
  VStack,
  Button,
  Text,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";

const GET_EMAIL_ACCOUNTS = gql`
  query GetEmailAccounts {
    emailAccounts {
      id
      email_address
      display_name
      smtp_host
      smtp_port
      username
      password
    }
  }
`;

const EmailAccounts = () => {
  const { loading, error, data } = useQuery(GET_EMAIL_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data) return null;

  const emailAccounts = data.emailAccounts;

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={6} align="start" w="100%">
        <Flex justifyContent="space-between" w="100%">
          <Heading as="h1" size="lg">
            Email Accounts
          </Heading>
          <Link href="/email-accounts/new">
            <Button
              as="a"
              colorScheme="blue"
              size="sm"
              fontWeight="bold"
              borderRadius="full"
              px={6}
              _hover={{ bg: "blue.600" }}
            >
              Create New Account
            </Button>
          </Link>
        </Flex>
        <Box w="100%">
          <Table
            variant="striped"
            colorScheme="gray"
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
          >
            <Thead bg="gray.500">
              <Tr>
                <Th color="white" fontWeight="bold">
                  Email Address
                </Th>
                <Th color="white" fontWeight="bold">
                  Display Name
                </Th>
                <Th color="white" fontWeight="bold">
                  SMTP Host
                </Th>
                <Th color="white" fontWeight="bold">
                  SMTP Port
                </Th>
                <Th color="white" fontWeight="bold">
                  Username
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {emailAccounts.map((account: any) => (
                <Tr key={account.id}>
                  <Td>{account.email_address}</Td>
                  <Td>{account.display_name}</Td>
                  <Td>{account.smtp_host}</Td>
                  <Td>{account.smtp_port}</Td>
                  <Td>{account.username}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default EmailAccounts;