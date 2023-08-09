import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { MagnifyingGlass } from 'phosphor-react-native';

export const Container = styled.View`
  flex-direction:row;
  justify-content:center;
  height:110px;
  background-color: ${({ theme }) => theme.COLORS.PURPLE_500};
`;

export const SearchInput = styled(TextInput)`
  background-color:black;
  width: 83%;
  height:56px;
  font-size: 16px;
  padding-left: 66px;
  border-radius: 44px;
  background-color: #fff;
`;

export const SearchIcon = styled(MagnifyingGlass)`
  position: absolute;
  z-index: 1;
  top:16%;
  left:16%;
`;