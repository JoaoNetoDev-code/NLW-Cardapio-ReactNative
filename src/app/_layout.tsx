import {useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold} from "@expo-google-fonts/inter"
import { SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import Loading from "@/components/loading";

const Layout = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <SafeAreaView className="bg-slate-900 flex-1 pt-8">
      <Slot />
    </SafeAreaView>
  );
}

export default Layout;