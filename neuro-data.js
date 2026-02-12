/**
 * ARQUIVO: neuro-data.js
 * FUNÇÃO: Cérebro central de inteligência clínica e perguntas.
 * VANTAGEM: Permite alterar pesos e lógica sem mexer no HTML.
 */

export const Battery = {
    // --- MÓDULO 1: TDAH (ASRS-18) ---
    tdah: {
        id: "tdah",
        title: "TDAH Adulto (ASRS-18)",
        color: "#2563eb", // Azul
        description: "Avaliação de sintomas de desatenção e hiperatividade/impulsividade.",
        questions: [
            // Parte A (Desatenção) - Peso maior
            { id: "q1", text: "Dificuldade para finalizar detalhes finais de um projeto?", domain: "desatencao", weight: 2 },
            { id: "q2", text: "Dificuldade para organizar tarefas que exigem planejamento?", domain: "desatencao", weight: 2 },
            { id: "q3", text: "Problemas para lembrar de compromissos?", domain: "desatencao", weight: 2 },
            { id: "q4", text: "Adia ou evita tarefas que exigem muito esforço mental?", domain: "desatencao", weight: 3 }, // Peso 3: Sintoma chave
            // ... (Adicionaremos todas as 18 aqui)
        ],
        logic: (answers) => {
            // Lógica inteligente: Não apenas soma, mas verifica padrões
            let scoreA = 0;
            // ... cálculo complexo
            return { score: scoreA, risk: "Alto", flags: ["Procrastinação Crônica"] };
        }
    },

    // --- MÓDULO 2: AUTISMO (RAADS-14 + CAMUFLAGEM) ---
    tea: {
        id: "tea",
        title: "Espectro Autista (RAADS-14)",
        color: "#7c3aed", // Roxo
        description: "Investigação de traços do espectro, sensorialidade e masking.",
        questions: [
            { id: "t1", text: "Texturas, sons ou luzes me incomodam muito mais que aos outros?", domain: "sensorial", weight: 1 },
            { id: "t2", text: "É difícil entender o que os outros sentem se não disserem claramente?", domain: "mentalizacao", weight: 2 },
            { id: "t3", text: "Faço 'script' (ensadio mental) antes de conversas sociais?", domain: "masking", weight: 3 } // Peso 3: Camuflagem
        ],
        logic: (answers) => {
            // Lógica de cruzamento
            return { score: 15, risk: "Moderado", flags: ["Masking Severo"] };
        }
    },

    // --- MÓDULO NOVO: MENSURAÇÃO DE Q.I. (Raciocínio Matricial) ---
    qi: {
        id: "qi",
        title: "Raciocínio Lógico (Matrizes)",
        color: "#059669", // Verde Esmeralda
        description: "Teste de inteligência fluida independente de cultura (Gf).",
        type: "visual", // Indica que usa imagens, não texto
        questions: [
            // Aqui usaremos nomes de arquivos de imagem que você terá que subir
            { id: "q1", image: "matriz_01.png", options: ["A", "B", "C", "D", "E", "F"], correct: "C", difficulty: 1 },
            { id: "q2", image: "matriz_02.png", options: ["A", "B", "C", "D", "E", "F"], correct: "A", difficulty: 2 },
            // ... até a questão 30 (dificuldade progressiva)
        ],
        logic: (answers) => {
            // Cálculo de QI baseado em desvio padrão (Média 100, DP 15)
            // Requer tabela normativa que implementaremos
            return { score: 120, percentile: 90, classification: "Superior" };
        }
    }
};

/**
 * MOTOR DE CRUZAMENTO (A INTELIGÊNCIA REAL)
 * Analisa todos os testes feitos e gera insights cruzados.
 */
export function analyzeComorbidities(history) {
    const insights = [];

    // Exemplo: Cruzamento TDAH + Ansiedade
    if (history.tdah?.risk === "Alto" && history.ansiedade?.risk === "Alto") {
        insights.push({
            type: "alert",
            title: "TDAH + Ansiedade Secundária",
            text: "Seus dados sugerem que a ansiedade pode ser fruto do esforço constante para compensar o TDAH. Tratar apenas a ansiedade pode não funcionar."
        });
    }

    // Exemplo: QI Alto + Depressão (Tédio Existencial)
    if (history.qi?.score > 125 && history.depressao?.risk === "Moderado") {
        insights.push({
            type: "info",
            title: "Depressão Existencial / Boreout",
            text: "Sua alta capacidade cognitiva pode estar gerando tédio crônico (Boreout), que é quimicamente similar à depressão, mas exige estímulo intelectual, não apenas medicação."
        });
    }

    return insights;
}
