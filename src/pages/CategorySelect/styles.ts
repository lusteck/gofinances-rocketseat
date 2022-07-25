import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { FlatList, FlatListProps } from "react-native";
import { Category } from ".";

interface CategoryItemProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const CategoryList = styled(
  FlatList as new (prosp: FlatListProps<Category>) => FlatList<Category>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flex: 1,
    width: "100%",
  },
})``;

export const CategoryItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<CategoryItemProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;

export const Separator = styled.Text`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
