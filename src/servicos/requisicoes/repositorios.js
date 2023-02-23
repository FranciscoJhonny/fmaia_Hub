import api from "../api";

export async function pegarRepositorioDoUsuario(id) {
  try {
    const resultado = await api.get(`/repos?postId=${id}`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function salvarRepositorioDoUsuario(postId, nome, data, id) {
  try {
    await api.put(`/repos/${id}`, {
      name: nome,
      data: data,
      postId: postId,
      id: id,
    });

    return "sucesso";
  } catch (error) {
    console.log(error);
    return "erro";
  }
}

export async function buscaRepositorio(nomeRepositorio) {
  try {
    const resultado = await api.get(`/repos?name=${nomeRepositorio}`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function criarRepositorioDoUsuario(postId, nome, data) {
  try {
    await api.post(`/repos`, {
      name: nome,
      data: data,
      postId: postId
    });

    return "sucesso";
  } catch (error) {
    console.log(error);
    return "erro";
  }
}

export async function deletarRepositorioDoUsuario(id) {
  try {
    console.log(id);
    await api.delete(`/repos/${id}`);
    return "sucesso";
  } catch (error) {
    console.log(error);
    return "erro";
  }
}
