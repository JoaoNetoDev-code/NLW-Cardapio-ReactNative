import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store"

const add = (products: ProductCartProps[], newProduct: ProductProps) => {
  const existingProduct = products.find(({id}) => newProduct.id === id)

  if (existingProduct) { 
    return products.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1}
        : product
    )
  }

  return [...products, {...newProduct, quantity: 1}]
}

const remove = (products: ProductCartProps[], productId: ProductProps['id']) => {
  const data = products.map((product) => 
    product.id === productId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  )

  return data.filter((product) => product.quantity > 0)
}

export {add, remove}