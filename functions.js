import fs from "fs/promises"
const caminho = './tarefas.json'
import PromptSync from "prompt-sync"
const prompt = PromptSync()
// const dados = await lerConverterTarefa()
let tarefa


export async function lerConverterTarefa() {
    try {
        const dados = await fs.readFile(caminho, "utf-8")  // ler dados 
        return JSON.parse(dados) //converter em object
    } catch (erro) {
        console.error(`Erro ao ler o arquivo: ${erro.messege}`);
        return ["erro"]
    }
}

export async function escreverTarefa(dados) {
    try { //serve para tratar erro
        dados = JSON.stringify(dados, null, 2);
        await fs.writeFile(caminho, dados, 'utf-8')
        console.log("Arquivo atualizado com sucesso!")
    } catch (erro) {
        console.error("Erro ao escrever no arquivo: ", erro);
    }
}

export async function adicionarNovaTarefa() {
    const dados = await lerConverterTarefa()
    const ultimoId = dados.length > 0 ? dados.length + 1 : 1; //pegar o ultimo id 
    let novaTarefa = {
        "id": ultimoId,
        "nome": prompt("nome: "),
        "titulo": prompt("titulo: "),
        "descricao": prompt("descricao: "),
        "concluida": false
    }

    dados.push(novaTarefa)
    await escreverTarefa(dados)
}

export async function filtrarTarefasConcluidas() {
    const dados = await lerConverterTarefa()
    let concluido = dados.filter(tarefa => tarefa["concluida"] == true)
    return concluido
}

export async function filtrarTarefasPendentes() {
    const dados = await lerConverterTarefa()
    let pendente = dados.filter(tarefa => tarefa["concluida"] == false)
    return pendente
}

export async function concluirTarefa() {
    const dados = await lerConverterTarefa()
    console.log(await filtrarTarefasPendentes());
    const id = +prompt("qual id você quer comcluir: ")
    let tarefaEncontrada = dados.find((tarefa) => (id == tarefa.id))
    if (tarefaEncontrada) {
        tarefaEncontrada['concluida'] = true
    }
    console.log(tarefaEncontrada);
    await escreverTarefa(dados);
}