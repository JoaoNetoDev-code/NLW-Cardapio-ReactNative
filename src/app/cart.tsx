import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router"

import { Button } from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import LinkButton from "@/components/link-button";
import Product from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import FormatCurrency from "@/utils/functions/format-currency";

const Cart = () => {
  const [address, setAddress] = useState("")
  const PHONE_NUMBER = "5581989703489"  
  const cartStore = useCartStore()
  const navigate = useNavigation()

  const subtotal = FormatCurrency(cartStore.products.reduce((total, product) => {
    return total + product.price * product.quantity
  },0))

  const handleRemoveProduct = (product: ProductCartProps) => {
    Alert.alert("Remover", `Deseja Remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }])
  }

  const handleOrder = () => {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.")
    }
    const productsSend = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join('')

    const mensagem = `
      Novo pedido:
      \n Entregar em: ${address}
      ${productsSend}
      \n Valor total: ${subtotal}`

      Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${mensagem}`)
      cartStore.clearCat()
      navigate.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho"/>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
      <ScrollView>
        <View className="p-5 flex-1">
        {cartStore.products.length > 0 ? (
          <View className="border-b border-slate-700">
          {
            cartStore.products.map((product) => (
              <Product data={product} key={product.id} onPress={() => handleRemoveProduct(product)}/>
            ))
          }
        </View>
        ) : (
          <Text className="font-body text-slate-400 text-center my-8">
            Seu Carrinho está vazio
          </Text>
        )}

        <View className="flex-row gap-2 items-center mt-5 mb-4">
          <Text className="text-white text-xl font-subtitle">Total:</Text>
          <Text className="text-lime-400 text-2xl font-heading">{subtotal}</Text>
        </View>
        <Input
          onChangeText={setAddress}
          blurOnSubmit={true}
          onSubmitEditing={handleOrder}
          returnKeyType="next"
          placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento... "
        />
        </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>
            Enviar Pedido
          </Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20}/>
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/"/>
      </View>
    </View>
  );
}

export default Cart;