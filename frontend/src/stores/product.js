import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "please fill in all fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    //get newProduct data
    const data = await res.json();
    // console.log("data", data);
    set((state) => {
      //   console.log("state", state);
      return {
        products: [...state.products, data.data],
      };
    });

    return { success: true, message: "Product created successfully" };
    // use axios
    /*
      const api = axios.create({
          baseURL: "http://localhost:3000/api",
          headers: { 
              "Content-Type": "application/json" 
          },
      });
  
      try {
        const { data } = await api.post("/products", newProduct);
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
      } catch (err) {
        return { success: false, message: err.response?.data?.message || "Error" };
      }
  
  */
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
}));
