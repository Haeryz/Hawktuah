import { Container, VStack, Text, SimpleGrid,} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
const HomPage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Products", products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500, purple.600)"}
          bgClip={"text"}
        >
          Current Product 🚀
        </Text>

        <SimpleGrid
          column={{
            base: 3,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
          minChildWidth='350px'
        >
          {products.map((products) => (
            <ProductCard key={products._id} products={products} />
          ))}
        </SimpleGrid>

          {products.length === 0 && (
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              fontWeight={"bold"}
              color={"gray.500"}
            >
              No Product Found {""}
              <Link to={"/create"}>
                <Text
                  as={"span"}
                  color={"blue.500"}
                  _hover={{ textDecoration: "underline" }}
                >
                  Create New Product
                </Text>
              </Link>
            </Text>
          )}
      </VStack>
    </Container>
  );
};

export default HomPage;
