import PromptSync from "prompt-sync";
import { lerConverterTarefa } from "./functions.js";
import { adicionarNovaTarefa } from "./functions.js";
import { filtrarTarefasConcluidas } from "./functions.js";
import { filtrarTarefasPendentes } from "./functions.js";
import { concluirTarefa } from "./functions.js";
let controlador
const prompt = PromptSync()

do {
    console.log(`
1. Criar uma nova tarefa
2. Visualizar todas as tarefas
3. Visualizar apenas tarefas concluídas
4. Visualizar apenas tarefas não concluídas
5. Concluir uma tarefa
6. Sair
        `);
    controlador = +prompt(": ")
    switch (controlador) {
        case 1:
            await adicionarNovaTarefa()

            break;
        case 2:
            console.log(await lerConverterTarefa());

            break;
        case 3:
            console.log(await filtrarTarefasConcluidas());

            break;
        case 4:
            console.log(await filtrarTarefasPendentes());

            break;
        case 5:
            await concluirTarefa()
            break;
        case 6:
            console.log("Finalizando a execução do programa...")
            break;
        default:
            console.log(`A opção digitada pelo usario (${controlador}), não existe!`);
            break;
    }
} while (controlador !== 6);