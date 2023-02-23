import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import estilos from "./estilos";
import {
  pegarRepositorioDoUsuario,
  buscaRepositorio,
} from "../../servicos/requisicoes/repositorios";
import { useIsFocused } from "@react-navigation/native";

export default function Repositorios({ route, navigation }) {
  const [nomeRepositorio, setNomeRepositorio] = useState("");
  const [repo, setRepo] = useState([]);

  const estaNaTela = useIsFocused();

  useEffect(async () => {
    const resultado = await pegarRepositorioDoUsuario(route.params.id);
    setRepo(resultado);
  }, [estaNaTela]);

  async function busca() {
    const resultado = await buscaRepositorio(nomeRepositorio);
    setNomeRepositorio("");

    if (resultado) {
      setRepo(resultado);
    } else {
      Alert.alert("Repositorio não encontrado");
      setNomeRepositorio({});
    }
  }
  async function buscarTodos() {
    const resultado = await pegarRepositorioDoUsuario(route.params.id);
    setRepo(resultado);
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Busque por um repositorio"
        autoCapitalize="none"
        style={estilos.entrada}
        value={nomeRepositorio}
        onChangeText={setNomeRepositorio}
      />
      <View style={estilos.botaoArea}>
        <View style={estilos.botoes}>
          <TouchableOpacity style={estilos.botao} onPress={busca}>
            <Text style={estilos.textoBotao}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <View style={estilos.botoes}>
          <TouchableOpacity style={estilos.botao} onPress={buscarTodos}>
            <Text style={estilos.textoBotao}>Buscar Todos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate("CriarRepositorio", {id:route.params.id})}
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

      <FlatList
        data={repo}
        style={{ width: "100%" }}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.repositorio}
            onPress={() => navigation.navigate("InfoRepositorio", { item })}
          >
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>
              Atualizado em {item.data}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
