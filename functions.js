import fs from 'fs/promises';
import { title } from 'process';

const arquivo="./Jsons/Tarefas.json";

async function lerArquivoJSON() {
    try {
    const arquivoText = await fs.readFile(arquivo,'utf-8');
    return JSON.parse(arquivoText);   
    } catch (error) {
        console.log(`Erro ao ler o arquivo: ${error.message}`);
        return [];
    }
}
async function escreverArquivoJSON(dados) {
    try {
    const converter=JSON.stringify(dados, null, 2);    
    await fs.writeFile(arquivo, converter , "utf-8");
    } catch (error) {
        console.log(`Erro ao escrever no arquivo: ${error.message}`);
    }
}
export async function adicionarTarefas(novoTarefa) {
    try{
        let Tarefas = await lerArquivoJSON();
        Tarefas.push(novoTarefa);
        await escreverArquivoJSON(Tarefas);
        console.log("Tarefas atualizado com sucesso!");
    }catch(error){
        console.log(`Erro ao atualizar no arquivo: ${error.message}`);
    }
}
export async function procurarId() {
    let Tarefas = await lerArquivoJSON();
    let ultimoId = Tarefas.slice(-1);
    if(Tarefas.length>0){
        return ultimoId[0].id+1;
    }else{
        return 1;
    }
}

export async function modificar(id, propriedade, valor ) {
    let Tarefas = await lerArquivoJSON();
    let TarefaEncontrado =Tarefas.find((Tarefa) => (id == Tarefa.id))
    if (TarefaEncontrado) {
        TarefaEncontrado[propriedade] = valor;
    }
    await escreverArquivoJSON(Tarefas);
}
export async function filtrar(verificacao){
    let tarefas=await lerArquivoJSON();
    let tarefasConclidasFiltrado=tarefas.filter((tarefa)=>tarefa.concluida==verificacao)
    return tarefasConclidasFiltrado;
}
function centralizarTexto(texto) {
    let largura=100;
    const espacos = Math.max(0, Math.floor((largura - texto.length) / 2));
    const textoCentralizado = ' '.repeat(espacos) + texto;
    return (textoCentralizado);
}


export async function print(opcao){
    let tarefas;
    if(opcao==1){
        tarefas=await lerArquivoJSON();
    }else if(opcao==2){
        tarefas= await filtrar(true);
    }else if(opcao==3){
        tarefas= await filtrar(false);    
    }
    let message="";
    for(let tarefa of tarefas){
        let head=`Tarefa ${tarefa.id}-${tarefa.concluida == true ? "concluída":"Não concluida"}`;
        let title=`${tarefa.Titulo}`
        let body=`${tarefa.Descricao}`
        let messageTafera=`
        ${centralizarTexto(head)}
        \x1b[1m${centralizarTexto(title)}\x1b[0m
        ${centralizarTexto(body)}
        
        `;
        message=message+messageTafera;
    }
    return message;
}

export async function idTituloFalses() {
    let tarefas= await filtrar(false);
    let message="";
    for(let tarefa of tarefas){
        let messageTafera=`id ${tarefa.id}:${tarefa.Titulo}
`;
        message=message+messageTafera;
    }
    return message;
}