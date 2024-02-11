import { ProductProps } from '@/utils/data/products';
import * as cartInMemory from "./helpers/cart-in-memory";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ProductCartProps = ProductProps & {
  quantity: number
}

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clearCat: () => void;
}

export const useCartStore = create(
persist<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => 
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),

  remove: (ProductId: ProductProps['id']) => {
    set((state) => ({
      products: cartInMemory.remove(state.products, ProductId)
    }))
  },

  clearCat: () => set(() => ({ products: [] })),
  }
),
{
  name: "nlw-expert:cart",
  storage: createJSONStorage(() => AsyncStorage),
}))