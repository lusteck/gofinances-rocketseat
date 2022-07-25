import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: Number(0.7),
})`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;
