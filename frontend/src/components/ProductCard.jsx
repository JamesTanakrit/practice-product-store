import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useProductStore } from "../stores/product";

function ProductCard(props) {
  const textColor = useColorModeValue("gray.8000", "white");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const { deleteProducts } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProducts(productId);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 8000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={props.product.image}
        alt={props.product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {props.product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${props.product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<FaRegEdit />} colorScheme="blue" />
          <IconButton
            icon={<RiDeleteBin5Line />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(props.product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCard;
