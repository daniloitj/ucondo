import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Container, SearchIcon, SearchInput } from './styles';

type AccountSearchProps = {
  onSearch: (text: string) => void;
};

export function AccountSearch({ onSearch }: AccountSearchProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <Container>
      <SearchIcon size={20} color="#000" />
      <SearchInput
        placeholder="Pesquisar conta"
        placeholderTextColor="#888"
        onChangeText={handleSearch}
      />
    </Container>
  );
}
