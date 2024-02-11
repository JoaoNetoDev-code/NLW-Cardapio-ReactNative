import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import colors from "tailwindcss/colors";
interface ICart {
  cartQuantityItems?: number;
}

const CartQuantity = ({cartQuantityItems = 0}: ICart) => {
  return (
    <Link
      href="/cart"
      asChild
    >
      <TouchableOpacity className="relative" activeOpacity={0.7}>
        <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
          <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
        </View>
        <Feather name="shopping-bag" color={colors.white} size={24}/>
      </TouchableOpacity> 
    </Link>
  );
}

export default CartQuantity;