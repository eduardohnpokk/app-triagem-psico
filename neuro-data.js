/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 2.0 (Clinical Grade)
 * DESCRIÇÃO: Motor de inteligência diagnóstica com critérios do DSM-5 e escalas validadas.
 */

export const Battery = {
    // =========================================================================
    // 1. TDAH ADULTO (ASRS-18)
    // Lógica: Parte A (Triagem) tem peso maior. Parte B confirma severidade.
    // =========================================================================
    tdah: {
        id: "tdah",
        title: "TDAH Adulto (ASRS-18)",
        color: "#2563eb",
        description: "Avaliação de sintomas de desatenção e hiperatividade (OMS).",
        type: "frequency_asrs",
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        questions: [
            { id: "a1", text: "Dificuldade para finalizar detalhes finais de um projeto?", threshold: 2, domain: "desatencao" },
            { id: "a2", text: "Dificuldade para organizar tarefas que exigem planejamento?", threshold: 2, domain: "desatencao" },
            { id: "a3", text: "Problemas para lembrar de compromissos ou obrigações?", threshold: 2, domain: "desatencao" },
            { id: "a4", text: "Adia ou evita tarefas que exigem muito esforço mental?", threshold: 3, domain: "desatencao" },
            { id: "a5", text: "Balança as mãos ou os pés quando precisa ficar sentado?", threshold: 3, domain: "hiperatividade" },
            { id: "a6", text: "Sente-se excessivamente ativo, como se estivesse 'com o motor ligado'?", threshold: 3, domain: "hiperatividade" },
            { id: "b1", text: "Comete erros por descuido em projetos chatos?", threshold: 2, domain: "desatencao" },
            { id: "b2", text: "Dificuldade para manter a atenção em trabalhos repetitivos?", threshold: 2, domain: "desatencao" },
            { id: "b3", text: "Dificuldade para concentrar no que as pessoas dizem?", threshold: 2, domain: "desatencao" },
            { id: "b4", text: "Perde ou tem dificuldade para encontrar objetos?", threshold: 2, domain: "desatencao" },
            { id: "b5", text: "Se distrai com atividades ou barulhos ao redor?", threshold: 2, domain: "desatencao" },
            { id: "b6", text: "Levanta da cadeira em reuniões?", threshold: 2, domain: "hiperatividade" },
            { id: "b7", text: "Sente-se inquieto ou agitado?", threshold: 2, domain: "hiperatividade" },
            { id: "b8", text: "Dificuldade para sossegar e relaxar no tempo livre?", threshold: 2, domain: "hiperatividade" },
            { id: "b9", text: "Fala demais em situações sociais?", threshold: 2, domain: "hiperatividade" },
            { id: "b10", text: "Termina as frases das pessoas antes delas?", threshold: 2, domain: "hiperatividade" },
            { id: "b11", text: "Dificuldade para esperar sua vez?", threshold: 2, domain: "hiperatividade" },
            { id: "b12", text: "Interrompe os outros quando estão ocupados?", threshold: 2, domain: "hiperatividade" }
        ],
        calculate: (answers) => {
            let partAScore = 0;
            let totalSymptoms = 0;
            answers.forEach((val, idx) => {
                const q = Battery.tdah.questions[idx]; 
                if (val >= q.threshold) {
                    totalSymptoms++;
                    if (idx < 6) partAScore++;
                }
            });
            const risk = partAScore >= 4 ? "ALTO RISCO (Indicativo Clínico)" : "BAIXO RISCO";
            const detail = `Você apresentou ${partAScore}/6 sintomas críticos na triagem primária.`;
            return { score: totalSymptoms, result: risk, details: detail };
        }
    },

    // =========================================================================
    // 2. AUTISMO (RAADS-14)
    // =========================================================================
    tea: {
        id: "tea",
        title: "Espectro Autista (RAADS-14)",
        color: "#7c3aed",
        description: "Rastreio de traços do espectro, sensorialidade e camuflagem.",
        type: "frequency_raads",
        options: ["Verdadeiro agora e quando jovem", "Verdadeiro apenas agora", "Verdadeiro apenas quando jovem", "Nunca"],
        questions: [
            { text: "É muito difícil entender o que os outros pensam/sentem se não disserem claramente.", domain: "Mentalização" },
            { text: "Certas texturas, sons ou luzes me incomodam muito mais do que aos outros.", domain: "Sensorial" },
            { text: "Eu prefiro sair sozinho do que com outras pessoas.", domain: "Social" },
            { text: "Tenho dificuldade em saber a hora de falar ou falo demais sobre meus interesses.", domain: "Social" },
            { text: "Entendo as coisas 'ao pé da letra' e tenho dificuldade com sarcasmo.", domain: "Mentalização" },
            { text: "Sinto que preciso 'atuar' (masking) para parecer normal em público.", domain: "Social" },
            { text: "Fico extremamente ansioso ou irritado quando minha rotina muda.", domain: "Sensorial" },
            { text: "Quando gosto de um assunto, leio tudo sobre ele e esqueço o resto.", domain: "Mentalização" },
            { text: "Dizem que sou 'sem filtro' ou rude sem eu ter intenção.", domain: "Mentalização" },
            { text: "Faço movimentos repetitivos (balançar, estalar dedos) quando nervoso.", domain: "Sensorial" },
            { text: "Tenho dificuldade em manter amigos, mesmo tentando.", domain: "Social" },
            { text: "Noto padrões ou sons que outros ignoram.", domain: "Sensorial" },
            { text: "Me sinto exausto após eventos sociais.", domain: "Social" },
            { text: "Tenho interesses muito específicos e intensos.", domain: "Mentalização" }
        ],
        calculate: (answers) => {
            const mapScore = [3, 2, 1, 0];
            let total = 0;
            answers.forEach(idx => { total += mapScore[idx]; });
            const risk = total >= 14 ? "ALTA PROBABILIDADE (Perfil Neurodivergente)" : "BAIXA PROBABILIDADE";
            return { score: total, result: risk, details: `Pontuação ${total}/42. Corte clínico é 14.` };
        }
    },

    // =========================================================================
    // 3. ANSIEDADE (GAD-7)
    // =========================================================================
    ansiedade: {
        id: "ansiedade",
        title: "Ansiedade (GAD-7)",
        color: "#0ea5e9",
        description: "Mapeamento de níveis de tensão e preocupação.",
        type: "frequency_gad",
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [
            { text: "Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)." },
            { text: "Não ser capaz de impedir ou de controlar as preocupações." },
            { text: "Preocupar-se muito com diversas coisas." },
            { text: "Dificuldade para relaxar." },
            { text: "Ficar tão agitado(a) que é difícil permanecer sentado(a)." },
            { text: "Ficar facilmente aborrecido(a) ou irritado(a)." },
            { text: "Sentir medo como se algo horrível fosse acontecer." }
        ],
        calculate: (answers) => {
            let total = answers.reduce((a, b) => a + b, 0);
            let result = "";
            if (total <= 4) result = "Ansiedade Mínima";
            else if (total <= 9) result = "Ansiedade Leve";
            else if (total <= 14) result = "Ansiedade Moderada";
            else result = "Ansiedade Grave";
            return { score: total, result: result, details: "Escala de 0 a 21 pontos." };
        }
    },

    // =========================================================================
    // 4. DEPRESSÃO (PHQ-9) + ALERTA DE RISCO
    // =========================================================================
    depressao: {
        id: "depressao",
        title: "Depressão (PHQ-9)",
        color: "#475569",
        description: "Avaliação de humor e anedonia.",
        type: "frequency_phq",
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [
            { text: "Pouco interesse ou prazer em fazer as coisas." },
            { text: "Sentir-se triste, deprimido(a) ou sem esperança." },
            { text: "Dificuldade para dormir ou dormir demais." },
            { text: "Cansado(a) ou com pouca energia." },
            { text: "Pouco apetite ou comer em excesso." },
            { text: "Sentir-se mal consigo mesmo(a) ou fracassado(a)." },
            { text: "Dificuldade para se concentrar." },
            { text: "Lentidão ou agitação motora." },
            { text: "Pensamentos de que seria melhor estar morto(a) ou de se ferir." }
        ],
        calculate: (answers) => {
            let total = answers.reduce((a, b) => a + b, 0);
            let riskFlag = answers[8] > 0;
            let result = "";
            if (total <= 4) result = "Mínima / Ausente";
            else if (total <= 9) result = "Depressão Leve";
            else if (total <= 14) result = "Depressão Moderada";
            else if (total <= 19) result = "Moderada Grave";
            else result = "Depressão Grave";
            if (riskFlag) result += " (⚠️ ALERTA DE RISCO)";
            return { score: total, result: result, details: riskFlag ? "Marcador de ideação identificado." : "Sem marcadores de risco imediato." };
        }
    },

    // =========================================================================
    // 5. BIPOLARIDADE (MDQ)
    // =========================================================================
    tab: {
        id: "tab",
        title: "Transtorno Bipolar (MDQ)",
        color: "#6366f1",
        description: "Rastreio de mania e hipomania.",
        type: "binary_complex",
        options: ["Não", "Sim"], 
        questions: [
            { text: "Você se sentiu tão bem ou hiperativo que outros acharam estranho?" },
            { text: "Ficou tão irritado que gritou com as pessoas ou começou brigas?" },
            { text: "Sentiu-se muito mais autoconfiante do que o habitual?" },
            { text: "Dormiu muito menos que o habitual e não sentiu falta?" },
            { text: "Estava muito mais falante ou falou mais rápido do que o costume?" },
            { text: "Pensamentos corriam na cabeça (acelerado)?" },
            { text: "Distraía-se facilmente com coisas ao redor?" },
            { text: "Tinha muito mais energia do que o habitual?" },
            { text: "Estava muito mais ativo ou fez mais coisas do que o habitual?" },
            { text: "Estava muito mais social (ex: ligar para amigos de madrugada)?" },
            { text: "Estava muito mais interessado em sexo?" },
            { text: "Fez coisas excessivas, tolas ou arriscadas (gastar, dirigir mal)?" },
            { text: "Gastar dinheiro causou problemas para você ou sua família?" },
            { text: "Esses sintomas aconteceram no mesmo período de tempo?", isTiming: true },
            { text: "Isso causou problemas moderados ou graves na sua vida?", isImpact: true }
        ],
        calculate: (answers) => {
            let symptoms = 0;
            for(let i=0; i<=12; i++) { if(answers[i] === 1) symptoms++; }
            const timing = answers[13] === 1;
            const impact = answers[14] === 1;
            let positive = (symptoms >= 7 && timing && impact);
            return { 
                score: symptoms, 
                result: positive ? "TRIAGEM POSITIVA (Alto Risco TAB)" : "TRIAGEM NEGATIVA",
                details: `Sintomas: ${symptoms}/13. Simultaneidade: ${timing ? "Sim" : "Não"}. Impacto: ${impact ? "Sim" : "Não"}.`
            };
        }
    },

    // =========================================================================
    // 6. BURNOUT (CBI)
    // =========================================================================
    burnout: {
        id: "burnout",
        title: "Burnout (CBI)",
        color: "#ea580c",
        description: "Exaustão física, emocional e cognitiva.",
        type: "frequency_cbi",
        options: ["Nunca (0)", "Às vezes (25)", "Frequentemente (50)", "Muitas vezes (75)", "Sempre (100)"],
        questions: [
            { text: "Com que frequência você se sente fisicamente exausto?" },
            { text: "Com que frequência você se sente emocionalmente exausto?" },
            { text: "Com que frequência você pensa: 'Não aguento mais'?" },
            { text: "Com que frequência você se sente fraco e suscetível a doenças?" },
            { text: "O seu trabalho faz você se sentir frustrado?" },
            { text: "Você sente que está trabalhando muito, mas produzindo pouco?" },
            { text: "Você sente que cada hora de trabalho é um sacrifício?" }
        ],
        calculate: (answers) => {
            const values = [0, 25, 50, 75, 100];
            let total = 0;
            answers.forEach(idx => total += values[idx]);
            let average = total / 7;
            let result = "";
            if (average < 25) result = "Sem Burnout";
            else if (average < 50) result = "Risco Leve / Cansaço";
            else if (average < 75) result = "Risco Moderado";
            else result = "Burnout Severo";
            return { score: Math.round(average), result: result, details: `Nível de carga: ${Math.round(average)}%` };
        }
    },

    // =========================================================================
    // 7. BORDERLINE (MSI-BPD)
    // =========================================================================
    borderline: {
        id: "borderline",
        title: "Borderline (MSI-BPD)",
        color: "#be185d",
        description: "Instabilidade emocional e relacional.",
        type: "binary",
        options: ["Não", "Sim"],
        questions: [
            { text: "Relacionamentos próximos prejudicados por muitas discussões ou rompimentos?" },
            { text: "Já se machucou fisicamente de propósito ou tentou suicídio?" },
            { text: "Problemas com impulsividade (gastar, comer, sexo, substâncias)?" },
            { text: "Mudanças de humor extremas e repentinas (horas de duração)?" },
            { text: "Sente muita raiva a maior parte do tempo?" },
            { text: "Desconfia das intenções das pessoas (paranoia) sob estresse?" },
            { text: "Já se sentiu 'irreal' ou fora do corpo (dissociação)?" },
            { text: "Sente um vazio crônico por dentro?" },
            { text: "Sente que não sabe quem realmente é (autoimagem instável)?" },
            { text: "Faz esforços desesperados para evitar ser abandonado(a)?" }
        ],
        calculate: (answers) => {
            let total = answers.reduce((a, b) => a + b, 0);
            const risk = total >= 7 ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE";
            return { score: total, result: risk, details: `Pontuação: ${total}/10. Corte clínico é 7.` };
        }
    }
};
