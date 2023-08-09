import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const AccountCodeAndName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const CloseButtonText = styled.Text`
  color: blue;
  font-size: 16px;
`;