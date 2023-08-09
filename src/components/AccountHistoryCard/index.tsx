import React, { useState } from 'react';
import { TouchableOpacityProps, Alert, TouchableOpacity } from 'react-native';
import { Container, Info, CodeAndName } from './styles';
import { TrashSimple } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { AccountDetailsModal } from '../AccountDetailsModal';

export type AccountHistoryCardProps = {
  _id: string;
  parent_account: string;
  code: string;
  name: string;
  type: string;
  accept_entry: boolean;
};

type Props = TouchableOpacityProps & {
  data: AccountHistoryCardProps;
  onDelete: (id: string) => void; 
};

export function AccountHistoryCard({ data, onDelete, ...rest }: Props) {
  const { COLORS } = useTheme();
  const [showBox, setShowBox] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleShowDetails = () => {
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Deseja excluir a conta?",
      `${data.code} - ${data.name}?`,
      [
        {
          text: "Não",
          style: "destructive",
        },
        {
          text: "Com certeza",
          style: "default",
          onPress: () => {
            setShowBox(false);
            onDelete(data._id);
          },
        },
      ]
    );
  };

  return showBox ? (
    <Container activeOpacity={0.7}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleShowDetails}>
        <Info>
            <CodeAndName>
              {data.code} - {data.name}
            </CodeAndName>
        </Info>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
        <TrashSimple size={24} color={COLORS.ICON_TRASH} />
      </TouchableOpacity>

      <AccountDetailsModal visible={showDetailsModal} onClose={handleCloseDetails} accountData={data} />
    </Container>
  ) : null; 
}
