import { Image, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"
import { PRODUCTS } from "@/utils/data/products"
import FormatCurrency from "@/utils/functions/format-currency";

const Product = () => {
  const { id } = useLocalSearchParams()
  const product = PRODUCTS.filter((product) => product.id === id)[0]

  return (
    <View className="flex-1">
      <Image source={product.cover} className="w-full h-52" resizeMode="cover"/>
      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {FormatCurrency(product.price)}
        </Text>
        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {
          product.ingredients.map((ingredient) => (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base leading-6"
              >
                {"\u2022"} {ingredient}
              </Text>
          ))
        }
      </View>
    </View>
  );
}

export default Product;