import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { ModalContainer, ModalContent, AccountCodeAndName, CloseButton, CloseButtonText } from './styles';

type AccountDetailsModalProps = {
  visible: boolean;
  onClose: () => void;
  accountData: {
    _id: string;
    parent_account: string;
    code: string;
    name: string;
    type: string;
    accept_entry: boolean;
  };
};

export function AccountDetailsModal({ visible, onClose, accountData }: AccountDetailsModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <ModalContainer>
        <ModalContent>
          <AccountCodeAndName>
            {accountData.code} - {accountData.name}
          </AccountCodeAndName>
            <Text>Conta Pai: {accountData.parent_account}</Text>
            <Text>Tipo: {accountData.type}</Text>
            <Text>Aceita Lançamentos: {accountData.accept_entry ? 'Sim' : 'Não'}</Text>
          <CloseButton onPress={onClose}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
