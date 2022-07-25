import React from "react";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";

import {
  CategoryItem,
  CategoryList,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from "./styles";

export interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategoryProps) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <CategoryList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <CategoryItem
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </CategoryItem>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
