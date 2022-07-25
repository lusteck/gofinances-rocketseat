import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Category, CategorySelect } from "../CategorySelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsTypes,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export interface FormDataRegister {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const { user } = useAuth();
  const dataKey = `@gofinance:transactions_user:${user.id}`;
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    name: "Categoria",
    key: "category",
  } as Category);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypesSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormDataRegister) {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação");

    if (category.key === "category")
      return Alert.alert("Selecione o a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        name: "Categoria",
        key: "category",
      } as Category);

      navigate("Listagem");
    } catch (error) {
      console.log({ error });
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              placeholder="Preço"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                isActive={transactionType === "positive"}
                onPress={() => handleTransactionsTypesSelect("positive")}
              />

              <TransactionTypeButton
                title="Outcome"
                type="down"
                isActive={transactionType === "negative"}
                onPress={() => handleTransactionsTypesSelect("negative")}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen} animationType="slide">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
