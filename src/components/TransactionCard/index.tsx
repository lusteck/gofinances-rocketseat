import React from "react";

import { Text } from "react-native";
import { categories } from "../../utils/categories";

import {
  Amount,
  Category,
  CategoryName,
  Container,
  Footer,
  Icon,
  Title,
  Date,
} from "./styles";

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  date: string;
  category: string;
}

interface TransactionCardProsp {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: TransactionCardProsp) {
  const category = categories.filter((item) => item.key === data.category)[0];

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
