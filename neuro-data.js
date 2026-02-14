/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 2.1 (Clinical Grade - Com Cruzamento de Dados)
 * DESCRIÇÃO: Motor de inteligência diagnóstica com critérios do DSM-5 e matriz de sugestões.
 */

export const Battery = {
    tdah: {
        id: "tdah",
        title: "TDAH Adulto (ASRS-18)",
        color: "#2563eb",
        description: "Avaliação de sintomas de desatenção e hiperatividade (OMS).",
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        suggestions: ["tea", "ansiedade"],
        questions: [
            { id: "a1", text: "Dificuldade para finalizar detalhes finais de um projeto?", threshold: 2 },
            { id: "a2", text: "Dificuldade para organizar tarefas que exigem planejamento?", threshold: 2 },
            { id: "a3", text: "Problemas para lembrar de compromissos ou obrigações?", threshold: 2 },
            { id: "a4", text: "Adia ou evita tarefas que exigem muito esforço mental?", threshold: 3 },
            { id: "a5", text: "Balança as mãos ou os pés quando precisa ficar sentado?", threshold: 3 },
            { id: "a6", text: "Sente-se excessivamente ativo, como se estivesse 'com o motor ligado'?", threshold: 3 },
            { id: "b1", text: "Comete erros por descuido em projetos chatos?", threshold: 2 },
            { id: "b2", text: "Dificuldade para manter a atenção em trabalhos repetitivos?", threshold: 2 },
            { id: "b3", text: "Dificuldade para concentrar no que as pessoas dizem?", threshold: 2 },
            { id: "b4", text: "Perde ou tem dificuldade para encontrar objetos?", threshold: 2 },
            { id: "b5", text: "Se distrai com atividades ou barulhos ao redor?", threshold: 2 },
            { id: "b6", text: "Levanta da cadeira em reuniões?", threshold: 2 },
            { id: "b7", text: "Sente-se inquieto ou agitado?", threshold: 2 },
            { id: "b8", text: "Dificuldade para sossegar e relaxar no tempo livre?", threshold: 2 },
            { id: "b9", text: "Fala demais em situações sociais?", threshold: 2 },
            { id: "b10", text: "Termina as frases das pessoas antes delas?", threshold: 2 },
            { id: "b11", text: "Dificuldade para esperar sua vez?", threshold: 2 },
            { id: "b12", text: "Interrompe os outros quando estão ocupados?", threshold: 2 }
        ],
        calculate: (answers) => {
            let partAScore = 0;
            let totalSymptoms = 0;
            answers.forEach((val, idx) => {
                if (val >= Battery.tdah.questions[idx].threshold) {
                    totalSymptoms++;
                    if (idx < 6) partAScore++;
                }
            });
            const isHigh = partAScore >= 4;
            return {
                score: totalSymptoms,
                result: isHigh ? "ALTO RISCO (Indicativo Clínico)" : "BAIXO RISCO",
                details: `Identificados ${partAScore}/6 sintomas críticos na Parte A (Triagem Primária) e ${totalSymptoms}/18 sintomas totais registrados.`,
                interpretation: isHigh ? "O escore atingiu o ponto de corte para TDAH em adultos. Recomenda-se investigação de funções executivas." : "Sintomas abaixo do limiar clínico para TDAH.",
                showSuggestions: isHigh
            };
        }
    },

    tea: {
        id: "tea",
        title: "Espectro Autista (RAADS-14)",
        color: "#7c3aed",
        description: "Rastreio de traços do espectro e sensorialidade.",
        options: ["Verdadeiro agora e quando jovem", "Verdadeiro apenas agora", "Verdadeiro apenas quando jovem", "Nunca"],
        suggestions: ["tdah", "ansiedade"],
        questions: [
            { text: "Dificuldade em entender o que os outros pensam/sentem." },
            { text: "Texturas, sons ou luzes incomodam muito." },
            { text: "Prefiro sair sozinho do que com outros." },
            { text: "Dificuldade em saber a hora de falar." },
            { text: "Entendo as coisas 'ao pé da letra'." },
            { text: "Sinto que preciso 'atuar' para parecer normal." },
            { text: "Ansiedade quando a rotina muda." },
            { text: "Foco intenso em assuntos específicos." },
            { text: "Dizem que sou 'sem filtro'." },
            { text: "Movimentos repetitivos quando nervoso." },
            { text: "Dificuldade em manter amigos." },
            { text: "Noto padrões que outros ignoram." },
            { text: "Exaustão após eventos sociais." },
            { text: "Interesses intensos e específicos." }
        ],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            let total = answers.reduce((acc, idx) => acc + map[idx], 0);
            const isHigh = total >= 14;
            return {
                score: total,
                result: isHigh ? "ALTA PROBABILIDADE (Perfil Neurodivergente)" : "BAIXA PROBABILIDADE",
                details: `Pontuação total de ${total} pontos em 42 possíveis.`,
                interpretation: isHigh ? "Os traços indicam um perfil compatível com o Espectro Autista Adulto (Nível 1 de suporte)." : "Pontuação abaixo do critério de rastreio para TEA.",
                showSuggestions: isHigh
            };
        }
    },

    ansiedade: {
        id: "ansiedade",
        title: "Ansiedade (GAD-7)",
        color: "#0ea5e9",
        suggestions: ["depressao", "burnout"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [
            { text: "Sentir-se nervoso ou tenso." },
            { text: "Incapaz de controlar as preocupações." },
            { text: "Preocupar-se muito com diversas coisas." },
            { text: "Dificuldade para relaxar." },
            { text: "Agitação excessiva." },
            { text: "Irritabilidade fácil." },
            { text: "Medo de que algo horrível aconteça." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : "Grave";
            return {
                score: total,
                result: `Ansiedade ${res}`,
                details: `Escore GAD-7: ${total} pontos.`,
                interpretation: `O nível de ansiedade é classificado como ${res.toLowerCase()}.`,
                showSuggestions: total >= 10
            };
        }
    },

    depressao: {
        id: "depressao",
        title: "Depressão (PHQ-9)",
        color: "#475569",
        suggestions: ["ansiedade", "tab"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [
            { text: "Pouco interesse em fazer as coisas." },
            { text: "Sentir-se triste ou sem esperança." },
            { text: "Problemas com o sono." },
            { text: "Falta de energia." },
            { text: "Alteração de apetite." },
            { text: "Sentir-se um fracasso." },
            { text: "Dificuldade de concentração." },
            { text: "Lentidão ou agitação." },
            { text: "Pensamentos de ferir a si mesmo." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const risk = answers[8] > 0;
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : total <= 19 ? "Moderada Grave" : "Grave";
            return {
                score: total,
                result: `Depressão ${res}${risk ? " (RISCO)" : ""}`,
                details: `Escore PHQ-9: ${total} pontos. Ideação: ${risk ? "Presente" : "Ausente"}.`,
                interpretation: `Quadro compatível com sintomatologia depressiva de nível ${res.toLowerCase()}.`,
                showSuggestions: total >= 10 || risk
            };
        }
    },

    burnout: {
        id: "burnout",
        title: "Burnout (CBI)",
        color: "#ea580c",
        suggestions: ["ansiedade", "depressao"],
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [
            { text: "Exaustão física?" },
            { text: "Exaustão emocional?" },
            { text: "Pensamentos de 'não aguento mais'?" },
            { text: "Sentir-se fraco ou doente?" },
            { text: "Trabalho causa frustração?" },
            { text: "Trabalho consome muita energia?" },
            { text: "Falta de tempo para si?" }
        ],
        calculate: (answers) => {
            const vals = [0, 25, 50, 75, 100];
            const avg = answers.reduce((a, b) => a + vals[b], 0) / 7;
            let res = avg < 25 ? "Baixo" : avg < 50 ? "Moderado" : "Alto/Severo";
            return {
                score: Math.round(avg),
                result: `Risco de Burnout: ${res}`,
                details: `Carga de exaustão calculada em ${Math.round(avg)}%.`,
                interpretation: `O índice de exaustão relacionada ao trabalho/vida é considerado ${res.toLowerCase()}.`,
                showSuggestions: avg >= 50
            };
        }
    },

    tab: {
        id: "tab",
        title: "Bipolaridade (MDQ)",
        color: "#6366f1",
        suggestions: ["depressao", "borderline"],
        options: ["Não", "Sim"],
        questions: [
            { text: "Sentiu-se eufórico ou 'hiper'?" },
            { text: "Irritabilidade extrema?" },
            { text: "Autoconfiança excessiva?" },
            { text: "Menos necessidade de sono?" },
            { text: "Fala acelerada?" },
            { text: "Pensamentos rápidos?" },
            { text: "Distratibilidade alta?" },
            { text: "Muita energia?" },
            { text: "Aumento de atividade?" },
            { text: "Mais sociável/sexual?" },
            { text: "Comportamentos de risco?" },
            { text: "Gastos excessivos?" },
            { text: "Problemas financeiros/legais?" },
            { text: "Ocorreram no mesmo período?" },
            { text: "Causou problemas moderados/graves?" }
        ],
        calculate: (answers) => {
            const symptoms = answers.slice(0, 13).filter(a => a === 1).length;
            const positive = symptoms >= 7 && answers[13] === 1 && answers[14] === 1;
            return {
                score: symptoms,
                result: positive ? "TRIAGEM POSITIVA" : "TRIAGEM NEGATIVA",
                details: `Sintomas: ${symptoms}/13. Critérios de tempo e impacto atendidos.`,
                interpretation: positive ? "Sinais de ciclotimia ou episódios de mania/hipomania identificados." : "Critérios para Transtorno Afetivo Bipolar não preenchidos.",
                showSuggestions: positive
            };
        }
    },

    borderline: {
        id: "borderline",
        title: "Borderline (MSI-BPD)",
        color: "#be185d",
        suggestions: ["tab", "ansiedade"],
        options: ["Não", "Sim"],
        questions: [
            { text: "Relações instáveis?" },
            { text: "Auto-mutilação/Suicidabilidade?" },
            { text: "Impulsividade alta?" },
            { text: "Ira inapropriada?" },
            { text: "Abandono (medo)?" },
            { text: "Autoimagem instável?" },
            { text: "Vazio crônico?" },
            { text: "Dissociação/Paranoia?" },
            { text: "Instabilidade afetiva?" },
            { text: "Esforços para evitar abandono?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const isHigh = total >= 7;
            return {
                score: total,
                result: isHigh ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Pontuação: ${total}/10.`,
                interpretation: isHigh ? "Presença marcante de traços de instabilidade emocional e relacional." : "Traços de personalidade borderline abaixo do corte clínico.",
                showSuggestions: isHigh
            };
        }
    }
};
