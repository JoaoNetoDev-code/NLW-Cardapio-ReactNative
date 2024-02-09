import { View, FlatList  } from 'react-native'
import Header from '@/components/header';
import CategoryButton from '@/components/category-button';
import { CATEGORIES } from "@/utils/data/products"
import { useState } from 'react';

const Home = () => {
  const [category, setCategory] = useState<string>(CATEGORIES[0])

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={3} />

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

    </View>
  );  
}
export default Home;