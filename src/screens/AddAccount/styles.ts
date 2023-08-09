import { SelectList } from "react-native-dropdown-select-list";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  top: -10px;
  flex: 1;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.COLORS.CONTENT_BACKGROUND};
  border-radius: 24px;
`;

export const FormContainer = styled.View`
  margin-top: 20px;
`;

export const FirstFormContainer = styled(FormContainer)`
  margin-top: 32px;
`;

export const LabelText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const TextInput = styled.TextInput`
  height: 48px;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 20px;
`;

export const StyledSelectList = styled(SelectList).attrs({
  boxStyles: {
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  dropdownStyles: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  searchPlaceholder: "Digite o nome da conta"
})``;
