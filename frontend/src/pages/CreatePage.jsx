import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    console.log(newProduct);
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mt={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
            />
            <Button w={"full"} colorScheme={"blue"} onClick={handleAddProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
