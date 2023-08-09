import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  FormContainer,
  LabelText,
  FirstFormContainer,
  TextInput,
  StyledSelectList as SelectList
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { InternalHeader } from "../../components/Headers/InternalHeader";
import { Alert } from "react-native";
import { useRealm } from "../../libs/realm";
import { Account } from "../../libs/realm/schemas/Account";
import { findNextChildCode } from "./utils/sugest";
import { codeValidate } from "../../utils/codeValidate";

const ACCOUNT_TYPE = [
  { key: "Receita", value: "Receita" },
  { key: "Despesa", value: "Despesa" },
];

const ACCOUNT_ACCEPT_ENTRY = [
  { key: true, value: "Sim" },
  { key: false, value: "Não" },
];

export function AddAccount() {
  const [parentAccount, setParentAccount] = useState("0");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [acceptEntry, setAcceptentry] = useState(true);

  const { goBack } = useNavigation();
  const realm = useRealm();

  const parentAccounts = realm.objects(Account).filtered("accept_entry = false");
  const parentData = parentAccounts.map((account) => ({
    key: account.code.toString(),
    value: `${account.code}-${account.name}`,
  }));

  useEffect(() => {
    calculateSuggestedCode();
  }, [parentAccount]);

  const calculateSuggestedCode = () => {
    if (!parentAccount) {
      setCode("0");
      return;
    }

    const filteredAccounts = realm.objects(Account).filtered(`parent_account = "${parentAccount}"`);
    const nextChildCode = findNextChildCode(
      filteredAccounts,
      parentAccount.split("-")[0]
    );
    setCode(nextChildCode);
  };

  async function handleAccountRegister() {
    try {
      const same_code = realm.objects(Account).filtered(`code = "${code}"`);
      if (same_code.length > 0) {
        return Alert.alert(
          "Código de Conta inválido",
          "Os códigos não podem se repetir"
        );
      }
      const parentAccount_code = realm.objects(Account).filtered(`code = "${parentAccount.split('-')[0]}"`);
      if (parentAccount_code[0]?.type && parentAccount_code[0]?.type !== type) {
        return Alert.alert(
          "Tipo de Conta inválido",
          "As contas devem, obrigatoriamente, ser do mesmo tipo que seu pai quando este for informado"
        );
      }
 
      if (code.trim().length === 0) {
        return Alert.alert(
          "Código de Conta inválido",
          "Por favor, informe um código para Conta."
        );
      }
      if (name.trim().length === 0) {
        return Alert.alert(
          "Nome de Conta inválido",
          "Por favor, informe um nome para Conta."
        );
      }
      // valid code format: todo
      if (!codeValidate(code)) {
        return Alert.alert(
          "Código de Conta inválido",
          `O código "${code}" é inválido. Por favor, informe um código correto.`
        );
      }

      realm.write(() => {
        realm.create(
          "Account",
          Account.generate({
            parent_account: parentAccount,
            code: code,
            name: name,
            type: type,
            accept_entry: acceptEntry,
          })
        );
      });
      Alert.alert("Conta Cadastrada", `A conta foi cadastrada com sucesso!`);
      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", `Não foi possível adicionar uma nova conta.`);
    }
  }

  return (
    <Container>
      <InternalHeader
        title="Inserir Conta"
        handleAction={goBack}
        handleSave={handleAccountRegister}
      />
      <Content>
        <FirstFormContainer>
          <LabelText>Conta Pai</LabelText>
          <SelectList
            setSelected={(val: React.SetStateAction<string>) =>
              setParentAccount(val)
            }
            data={parentData}
            save="value"
            placeholder="Selecione a Conta Pai"
          />
        </FirstFormContainer>

        <FormContainer>
          <LabelText>Código</LabelText>
          <TextInput
            placeholder="Digite o código"
            onChangeText={setCode}
            value={
              code
            }
          />
        </FormContainer>

        <FormContainer>
          <LabelText>Nome</LabelText>
          <TextInput placeholder="Digite o nome" onChangeText={setName} />
        </FormContainer>

        <FormContainer>
          <LabelText>Tipo</LabelText>
          <SelectList
            setSelected={(val: React.SetStateAction<string>) => setType(val)}
            data={ACCOUNT_TYPE}
            defaultOption={{ key: "Receita", value: "Receita" }}
            save="value"
            search={false}
          />
        </FormContainer>

        {/* {code.split(".").length < 3 && ( */}
          <FormContainer>
            <LabelText>Aceita Lançamentos</LabelText>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setAcceptentry(val === "Sim")
              }
              data={ACCOUNT_ACCEPT_ENTRY}
              defaultOption={{ key: 0, value: "Sim" }}
              save="value"
              search={false}
            />
          </FormContainer>
        {/* )} */}
      </Content>
    </Container>
  );
}
