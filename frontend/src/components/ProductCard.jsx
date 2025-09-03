import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useProductStore } from "../stores/product";
import { useState } from "react";

function ProductCard(props) {
  const [updatedProduct, setUpdatedProduct] = useState(props.product);
  const textColor = useColorModeValue("gray.8000", "white");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProducts, updateProducts } = useProductStore();
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

  const handleChangeProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProducts(
      productId,
      updatedProduct
    );
    onClose();
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
          <IconButton
            icon={<FaRegEdit />}
            colorScheme="blue"
            onClick={onOpen}
          />
          <IconButton
            icon={<RiDeleteBin5Line />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(props.product._id)}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                handleChangeProduct(props.product._id, updatedProduct)
              }
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
