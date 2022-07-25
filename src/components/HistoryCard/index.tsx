import React from "react";

import { Amount, Container, Title } from "./styles";

interface HistoryCardProps {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCard({ title, amount, color }: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>

      {/* <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer> */}
    </Container>
  );
}
