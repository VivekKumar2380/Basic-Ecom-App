import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartOrderSummary from "../components/CartOrderSummary";
const CartPage = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            size="xl"
            emptyColor="gray.200"
            color="orange.500"
            mt={20}
            speed="0.25s"
            thickness="3px"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cart.length <= 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Your cart is empty.</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to={"/products"}>
              Click here to see our products.
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Shopping Cart
              </Heading>
              <Stack spacing="6">
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary />
              <HStack fontWeight="semibold" mt="6">
                <p>or</p>
                <Link
                  as={ReactLink}
                  to="/products"
                  color={mode("orange.500", "orange.200")}
                >
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartPage;
