import { View, FlatList, SectionList, Text  } from 'react-native'
import Header from '@/components/header';
import CategoryButton from '@/components/category-button';
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products"
import Product from '@/components/product';
import { useRef, useState } from 'react';
import { Link } from "expo-router"
import { useCartStore } from '@/stores/cart-store';

const Home = () => {
  const cartStore = useCartStore()
  const [category, setCategory] = useState<string>(CATEGORIES[0])

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation ({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  const qtdItems = cartStore.products.reduce((all, unit) => all + unit.quantity, 0)

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={qtdItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap:12, paddingHorizontal: 20}}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({item}) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item}/>
          </Link>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

    </View>
  );  
}
export default Home;