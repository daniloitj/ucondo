import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  top: -20px;
  flex: 1;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.COLORS.CONTENT_BACKGROUND};
  border-radius:24px;
`;

export const SectionSubtitle = styled.View`
  flex-direction: row;
  margin-left: 12px;
  align-items: center;
  justify-content:space-between;
  padding-top:20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.SUBTTITLE};
  font-size:  ${({ theme }) => theme.FONT_SIZE.XL}px;
  font-family:  ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const AccountCount = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_400};
  font-size:  ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-family:  ${({ theme }) => theme.FONT_FAMILY.REGULAR};

  margin-top: 32px;
  text-align: center;
`;