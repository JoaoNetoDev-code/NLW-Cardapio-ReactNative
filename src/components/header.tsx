import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import CartQuantity from "./cartQuantity";
interface IProps {
  title: string;
  cartQuantityItems?: number;
}

const Header = ({title, cartQuantityItems = 0}: IProps) => {
  return (
    <View
      className="flex-row items-center border-b border-slate-700 pb-5 mx-5"
    >
      <View className="flex-1">
        <Image
          source={require("@/assets/logo.png")}
          className="h-6 w-32"
        />
        <Text className="text-white text-xl font-heading">{title}</Text>
      </View>
      {
        cartQuantityItems > 0 && <CartQuantity cartQuantityItems={0} />
      }
    </View>
  );
}

export default Header;