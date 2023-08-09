import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.PURPLE_500};
`;

export const Title = styled.Text`
  flex: 1;
  margin-left: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

