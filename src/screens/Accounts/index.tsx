import { Alert, FlatList, RefreshControl } from 'react-native';
import { Container, Content, SectionSubtitle, AccountCount, Label, Title } from './styles';
import { HomeHeader } from '../../components/Headers/HomeHeader';
import { AccountHistoryCard } from '../../components/AccountHistoryCard';
import { AccountSearch } from '../../components/AccountSearch';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useQuery, useRealm } from '../../libs/realm';
import { Account } from '../../libs/realm/schemas/Account';

export type AccountHistoryCardProps = {
  _id: string;
  parent_account: string;
  code: string;
  name: string;
  type: string;
  accept_entry: boolean;
}

export function Accounts() {
  const { navigate } = useNavigation();
  const [filteredAccounts, setFilteredAccounts] = useState<AccountHistoryCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false); 

  const listAccounts = useQuery(Account);
  const realm = useRealm();

  function fetchAccounts(){
    try {
      const response = listAccounts.sorted('code', false);
      const formattedHistoric = response.map((item) => {
        return ({
          _id: item._id.toString(),
          parent_account: item.parent_account,
          code: item.code,
          name: item.name,
          type: item.type,
          accept_entry: item.accept_entry
        })
      })
      setFilteredAccounts(formattedHistoric);
    } catch (error) {
      Alert.alert('Erro ao carregar contas', 'Não foi possível carregar contas.');
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchAccounts();
  },[])

  useEffect(() => {
    realm.addListener('change', () => fetchAccounts())
    return () => {
      if(realm && !realm.isClosed) {
        realm.removeListener('change', fetchAccounts)
      }
    };
  },[])

  function handleAddAccount() {
    navigate('addAccount');
  }

  const handleDelete = (_id: string) => {
    try {
      realm.write(() => {
        const accountToDelete = listAccounts.find((account) => account._id.toString() === _id);
        realm.delete(accountToDelete);
      });
    } catch (error) {
      Alert.alert('Erro ao deletar conta', 'Não foi possível deletar a conta.');
      console.log(error);
    }
  };
  

  const handleSearch = (searchText: string) => {
    if(searchText === ''){
      return fetchAccounts();
    }
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredResults = filteredAccounts.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseSearchText) ||
        item.code.includes(lowerCaseSearchText)
    );
    setFilteredAccounts(filteredResults);
  };

  const handleUpdate = () => {
    setRefreshing(true);
    fetchAccounts();
    setRefreshing(false);
  };

  return (
    <Container>
      <HomeHeader title={'Plano de Contas'} handleAction={handleAddAccount} />
      <AccountSearch onSearch={handleSearch}/>
      <Content>
        <SectionSubtitle>
          <Title>
            Listagem
          </Title>
          <AccountCount>
            {filteredAccounts.length} registros
          </AccountCount>
        </SectionSubtitle>

        {filteredAccounts.length > 0 ? (
          <FlatList
            data={filteredAccounts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <AccountHistoryCard data={item} onDelete={handleDelete}/>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleUpdate} 
                colors={['#000']}
              />
            }
          />
        ) : (
          <Label>Nenhuma Conta Cadastrada.</Label>
        )}
      </Content>
    </Container>
  );
}