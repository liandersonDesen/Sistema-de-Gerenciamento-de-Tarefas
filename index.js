// importar o modulo prompt-sync
import PromptSync from 'prompt-sync';
const prompt = PromptSync();
import { adicionarTarefas,procurarId,modificar,filtrar,print } from './functions.js'
let opcao;
do{
    console.log(`Menu de operações:\n 1- Criar uma nova tarefa\n 2- Visualizar todas as tarefas \n 3- Visualizar apenas tarefas concluídas  \n 4- Visualizar apenas tarefas não concluídas \n 5- Concluir uma tarefa \n 6- Sair`);
    opcao= +prompt("Escolha uma das opções: ");
switch(opcao){
    case 1:
        console.clear();
        let title;
        do{  
            console.log("Criando uma Tarefa:")
            title=prompt("Titulo:")
            if(title.trim()==""){
                console.clear();
                console.log("Por favor, defina um titulo\n");     
            }
        }while(title.trim()=="")
        const Tarefa={
            id:await procurarId(),
            Titulo:title,
            Descricao:prompt("Descrição: "),
            concluida:false
        }
        await adicionarTarefas(Tarefa);
    break;
    case 2:
        console.clear();
        console.log(await print(1));
        prompt("Pressione Enter:");
        console.clear();
    break;
    case 3:
        console.clear();
        console.log(await print(2));
        prompt("Pressione Enter:");
        console.clear();
    break;
    case 4:    
        console.clear();
        console.log(await print(3));
        prompt("Pressione Enter:");
        console.clear();
    break;
    case 5:
        console.clear()
        let falses=await filtrar(false);
        let TodosIds = falses.map(objeto=>objeto.id)
        console.log("os ids que estão com as tarefas não concluida são:")
        console.log(TodosIds);
        const id=+prompt('Digite o id da Tarefa que deseja concluir:');
        const propriedade='concluida';
        const valor=true;
        if(TodosIds.includes(id)){
            await modificar(id,propriedade,valor);
            console.clear();
            console.log(`Tarefa de id ${id} foi atualizada \n\n`);
        }else{
            console.clear();
            console.log("id não encontrado\n\n");
        }

    break;
    case 6:
        console.log("\n\nSaindo...")
    break;
    default:
        console.clear()
        console.log("\nOpção inválida!");
}
}while(opcao!=6)