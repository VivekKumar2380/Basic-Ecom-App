import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { useEffect } from "react";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const productslist = useSelector((state) => state.products);
  const { loading, error, products } = productslist;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
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
      ) : (
        products.map((product) => (
          <WrapItem key={product._id}>
            <Center w="250px" h="550px">
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

export default ProductsPage;
