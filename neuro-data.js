/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 3.0 (Excelência Clínica - DSM-5 Alinhado)
 * DESCRIÇÃO: Motor de inteligência com 13 protocolos e matriz de comorbidades.
 */

export const Battery = {
    // --- 1. TDAH (ASRS-18) ---
    tdah: {
        id: "tdah",
        title: "TDAH Adulto (ASRS-18)",
        color: "#2563eb",
        description: "Rastreio de desatenção e hiperatividade em adultos.",
        suggestions: ["tea", "ansiedade"],
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        questions: [
            { id: "a1", text: "Dificuldade para finalizar detalhes de um projeto?", threshold: 2 },
            { id: "a2", text: "Dificuldade para organizar tarefas planejadas?", threshold: 2 },
            { id: "a3", text: "Dificuldade em lembrar de compromissos?", threshold: 2 },
            { id: "a4", text: "Evita tarefas que exigem muito esforço mental?", threshold: 3 },
            { id: "a5", text: "Balança mãos ou pés quando sentado?", threshold: 3 },
            { id: "a6", text: "Sente-se como se estivesse 'com o motor ligado'?", threshold: 3 },
            { id: "b1", text: "Erros por descuido em tarefas repetitivas?", threshold: 2 },
            { id: "b2", text: "Dificuldade em manter a atenção no trabalho?", threshold: 2 },
            { id: "b3", text: "Parece não ouvir quando falam diretamente?", threshold: 2 },
            { id: "b4", text: "Perde objetos necessários para tarefas?", threshold: 2 },
            { id: "b5", text: "Distrai-se facilmente com estímulos externos?", threshold: 2 },
            { id: "b6", text: "Levanta-se em situações onde deve ficar sentado?", threshold: 2 },
            { id: "b7", text: "Sente inquietude em momentos de lazer?", threshold: 2 },
            { id: "b8", text: "Dificuldade em esperar sua vez?", threshold: 2 },
            { id: "b9", text: "Interrompe ou se intromete em conversas?", threshold: 2 },
            { id: "b10", text: "Fala excessivamente em contextos sociais?", threshold: 2 },
            { id: "b11", text: "Responde antes da pergunta ser completada?", threshold: 2 },
            { id: "b12", text: "Dificuldade em realizar atividades calmamente?", threshold: 2 }
        ],
        calculate: (answers) => {
            let partA = 0;
            answers.forEach((v, i) => { if (i < 6 && v >= Battery.tdah.questions[i].threshold) partA++; });
            const high = partA >= 4;
            return {
                score: partA,
                result: high ? "ALTO RISCO" : "BAIXO RISCO",
                details: `Parte A: ${partA}/6 sintomas críticos identificados.`,
                interpretation: high ? "O perfil sugere uma forte presença de sintomas de desatenção e/ou hiperatividade que impactam a funcionalidade adulta. O cruzamento de dados recomenda investigar TEA e Ansiedade para descartar diagnósticos diferenciais." : "Sintomatologia abaixo do ponto de corte para TDAH.",
                showSuggestions: high
            };
        }
    },

    // --- 2. AUTISMO (RAADS-14) ---
    tea: {
        id: "tea",
        title: "Autismo Adulto (RAADS-14)",
        color: "#7c3aed",
        description: "Rastreio de traços autistas, sensorialidade e mentalização.",
        suggestions: ["tdah", "fobia_social"],
        options: ["Verdadeiro agora e quando jovem", "Verdadeiro apenas agora", "Verdadeiro apenas quando jovem", "Nunca"],
        questions: [
            { text: "Dificuldade em entender intenções/sentimentos alheios." },
            { text: "Hipersensibilidade a texturas, sons ou luzes." },
            { text: "Preferência por atividades solitárias." },
            { text: "Dificuldade em regular o volume ou o tempo da fala." },
            { text: "Dificuldade com sarcasmo e metáforas (literalidade)." },
            { text: "Uso de camuflagem social (masking) para se adaptar." },
            { text: "Desconforto extremo com mudanças na rotina." },
            { text: "Interesses restritos e intensos (hiperfoco)." },
            { text: "Dificuldade em manter contato visual." },
            { text: "Comportamentos motores repetitivos (stimming)." },
            { text: "Dificuldade em iniciar ou manter amizades." },
            { text: "Percepção de detalhes que outros ignoram." },
            { text: "Exaustão social profunda após interações." },
            { text: "Adesão rígida a rituais e padrões." }
        ],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            const total = answers.reduce((acc, idx) => acc + map[idx], 0);
            const high = total >= 14;
            return {
                score: total,
                result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Escore Total: ${total}/42.`,
                interpretation: high ? "A pontuação indica um perfil neurodivergente compatível com o Espectro Autista. Traços de processamento sensorial e dificuldades na cognição social são proeminentes." : "Perfil de resposta dentro da curva de normalidade neurotípica.",
                showSuggestions: high
            };
        }
    },

    // --- 3. ANSIEDADE (GAD-7) ---
    ansiedade: {
        id: "ansiedade",
        title: "Ansiedade (GAD-7)",
        color: "#0ea5e9",
        description: "Mapeamento de níveis de ansiedade generalizada.",
        suggestions: ["depressao", "trauma"],
        options: ["Nenhuma vez", "Vários dias", "Metade dos dias", "Quase todos os dias"],
        questions: [
            { text: "Sentir-se nervoso, ansioso ou muito tenso." },
            { text: "Não ser capaz de controlar as preocupações." },
            { text: "Preocupar-se muito com diversas coisas." },
            { text: "Dificuldade para relaxar." },
            { text: "Agitação tão grande que é difícil ficar parado." },
            { text: "Ficar facilmente aborrecido ou irritado." },
            { text: "Sentir medo como se algo horrível fosse acontecer." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : "Grave";
            return {
                score: total,
                result: `Ansiedade ${res}`,
                details: `Total: ${total} pontos.`,
                interpretation: `Nível de ansiedade classificado como ${res.toLowerCase()}. Sugere-se avaliar quadros depressivos ou traumáticos se os níveis forem moderados ou graves.`,
                showSuggestions: total >= 10
            };
        }
    },

    // --- 4. DEPRESSÃO (PHQ-9) ---
    depressao: {
        id: "depressao",
        title: "Depressão (PHQ-9)",
        color: "#475569",
        description: "Avaliação de sintomas depressivos e risco clínico.",
        suggestions: ["sono", "tab"],
        options: ["Nenhuma vez", "Vários dias", "Metade dos dias", "Quase todos os dias"],
        questions: [
            { text: "Pouco interesse ou prazer em fazer as coisas." },
            { text: "Sentir-se triste, deprimido ou sem esperança." },
            { text: "Dificuldade para dormir ou dormir demais." },
            { text: "Sentir-se cansado ou com pouca energia." },
            { text: "Falta de apetite ou comer demais." },
            { text: "Sentir-se mal consigo mesmo ou um fracasso." },
            { text: "Dificuldade para se concentrar (ex: ler notícias)." },
            { text: "Lentidão ou agitação perceptível aos outros." },
            { text: "Pensamentos de que seria melhor morrer ou se ferir." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const risk = answers[8] > 0;
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : total <= 19 ? "Moderada Grave" : "Grave";
            return {
                score: total,
                result: `Depressão ${res}${risk ? " (⚠️ RISCO)" : ""}`,
                details: `Total: ${total} pontos. Risco de ideação: ${risk ? "SIM" : "NÃO"}.`,
                interpretation: `Sintomatologia depressiva de nível ${res.toLowerCase()}. A presença de pensamentos de autoextermínio requer intervenção profissional imediata.`,
                showSuggestions: total >= 10 || risk
            };
        }
    },

    // --- 5. BIPOLARIDADE (MDQ) ---
    tab: {
        id: "tab",
        title: "Bipolaridade (MDQ)",
        color: "#6366f1",
        description: "Rastreio de episódios de mania e hipomania.",
        suggestions: ["depressao", "borderline"],
        options: ["Não", "Sim"],
        questions: [
            { text: "Sentiu-se tão bem ou hiperativo que outros acharam estranho?" },
            { text: "Ficou tão irritado que começou brigas?" },
            { text: "Sentiu-se muito mais autoconfiante que o habitual?" },
            { text: "Dormiu muito menos e não sentiu falta?" },
            { text: "Falou muito mais rápido que o habitual?" },
            { text: "Pensamentos corriam na cabeça (acelerados)?" },
            { text: "Distraía-se muito facilmente?" },
            { text: "Tinha muito mais energia que o habitual?" },
            { text: "Estava muito mais ativo/fez mais coisas?" },
            { text: "Estava muito mais social (ligar para amigos de madrugada)?" },
            { text: "Estava muito mais interessado em sexo?" },
            { text: "Fez coisas arriscadas ou excessivas (gastos, direção)?" },
            { text: "Os gastos causaram problemas reais?" },
            { text: "Esses sintomas ocorreram no mesmo período de tempo?", isTiming: true },
            { text: "Causaram problemas moderados ou graves?", isImpact: true }
        ],
        calculate: (answers) => {
            const symp = answers.slice(0, 13).filter(a => a === 1).length;
            const pos = symp >= 7 && answers[13] === 1 && answers[14] === 1;
            return {
                score: symp,
                result: pos ? "TRIAGEM POSITIVA" : "TRIAGEM NEGATIVA",
                details: `Sintomas: ${symp}/13. Simultaneidade: ${answers[13] ? "Sim" : "Não"}.`,
                interpretation: pos ? "Há fortes indicativos de episódios de ativação de humor (mania/hipomania). Essencial investigar o histórico familiar e alternância com depressão." : "Critérios para triagem de TAB não preenchidos.",
                showSuggestions: pos
            };
        }
    },

    // --- 6. BURNOUT (CBI) ---
    burnout: {
        id: "burnout",
        title: "Burnout (CBI)",
        color: "#ea580c",
        description: "Rastreio de exaustão relacionada ao trabalho e vida.",
        suggestions: ["ansiedade", "sono"],
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [
            { text: "Sente exaustão física ao fim do dia?" },
            { text: "Sente exaustão emocional com suas tarefas?" },
            { text: "Pensa frequentemente em desistir de tudo?" },
            { text: "Sente-se suscetível a doenças por cansaço?" },
            { text: "O trabalho faz você se sentir frustrado?" },
            { text: "Sente que está no seu limite de energia?" },
            { text: "Falta tempo para recuperação pessoal?" }
        ],
        calculate: (answers) => {
            const vals = [0, 25, 50, 75, 100];
            const avg = answers.reduce((a, b) => a + vals[b], 0) / 7;
            const high = avg >= 50;
            return {
                score: Math.round(avg),
                result: avg < 50 ? "Baixo Risco" : avg < 75 ? "Risco Moderado" : "Alto Risco / Exaustão",
                details: `Índice de Exaustão: ${Math.round(avg)}%.`,
                interpretation: `Carga de exaustão de nível ${avg >= 50 ? "preocupante" : "controlado"}. Recomenda-se avaliar a qualidade do sono e níveis de ansiedade associados.`,
                showSuggestions: high
            };
        }
    },

    // --- 7. BORDERLINE (MSI-BPD) ---
    borderline: {
        id: "borderline",
        title: "Borderline (MSI-BPD)",
        color: "#be185d",
        description: "Rastreio de instabilidade emocional e relacional.",
        suggestions: ["tab", "trauma"],
        options: ["Não", "Sim"],
        questions: [
            { text: "Relacionamentos instáveis e intensos?" },
            { text: "Ideação suicida ou automutilação?" },
            { text: "Impulsividade em pelo menos duas áreas perigosas?" },
            { text: "Instabilidade afetiva e mudanças rápidas de humor?" },
            { text: "Esforços desesperados para evitar abandono?" },
            { text: "Perturbação da identidade (autoimagem instável)?" },
            { text: "Sentimento crônico de vazio?" },
            { text: "Raiva intensa e dificuldade em controlá-la?" },
            { text: "Sintomas dissociativos ou paranoia sob estresse?" },
            { text: "Comportamentos autodestrutivos recorrentes?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 7;
            return {
                score: total,
                result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Escore: ${total}/10.`,
                interpretation: high ? "Indicadores significativos de desregulação emocional e instabilidade interpessoal. Recomenda-se avaliação de histórico traumático." : "Traços de instabilidade abaixo do limiar clínico.",
                showSuggestions: high
            };
        }
    },

    // --- 8. FOBIA SOCIAL (SPIN) ---
    fobia_social: {
        id: "fobia_social",
        title: "Fobia Social (SPIN)",
        color: "#1e40af",
        description: "Avaliação de medo, evitação e sintomas físicos em situações sociais.",
        suggestions: ["tea", "ansiedade"],
        options: ["Nada", "Um pouco", "Mais ou menos", "Muito", "Extremamente"],
        questions: [
            { text: "Tenho medo de pessoas em autoridade." },
            { text: "Sinto-me incomodado por corar na frente das pessoas." },
            { text: "Festas e eventos sociais me apavoram." },
            { text: "Evito falar com pessoas que não conheço." },
            { text: "Ser criticado me assusta muito." },
            { text: "Evito fazer coisas ou falar com pessoas por medo de passar vergonha." },
            { text: "Suar ou tremer na frente dos outros me deixa ansioso." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 19;
            return {
                score: total,
                result: total >= 19 ? "Risco Moderado/Alto" : "Risco Baixo",
                details: `Escore SPIN: ${total}. Ponto de corte: 19.`,
                interpretation: high ? "Há indícios de Ansiedade Social significativa que pode estar sendo confundida com traços de TEA. Recomenda-se o rastreio de TEA para diferenciação." : "Sintomas de ansiedade social dentro do esperado.",
                showSuggestions: high
            };
        }
    },

    // --- 9. TRAUMA (PCL-5 - Versão Screening) ---
    trauma: {
        id: "trauma",
        title: "Trauma e Estresse (PCL-5)",
        color: "#991b1b",
        description: "Rastreio de sintomas de Estresse Pós-Traumático.",
        suggestions: ["ansiedade", "borderline"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [
            { text: "Lembranças repetitivas e perturbadoras de uma experiência estressante?" },
            { text: "Sonhos perturbadores sobre a experiência?" },
            { text: "Evita pensar ou falar sobre a experiência?" },
            { text: "Sente-se distante ou cortado de outras pessoas?" },
            { text: "Sente-se super alerta, vigilante ou de guarda?" },
            { text: "Fica assustado facilmente por barulhos ou movimentos?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 10;
            return {
                score: total,
                result: high ? "INDICAÇÃO POSITIVA" : "INDICAÇÃO NEGATIVA",
                details: `Escore: ${total}. Presença de sintomas de hiperestimulação.`,
                interpretation: high ? "Marcadores de Estresse Pós-Traumático identificados. O trauma pode mimetizar sintomas de TDAH e Ansiedade." : "Sem marcadores significativos de TEPT.",
                showSuggestions: high
            };
        }
    },

    // --- 10. SONO (ISI - Insomnia Severity Index) ---
    sono: {
        id: "sono",
        title: "Qualidade do Sono (ISI)",
        color: "#1e1b4b",
        description: "Avaliação de insônia e impacto na funcionalidade diária.",
        suggestions: ["depressao", "burnout"],
        options: ["Nenhum", "Leve", "Moderado", "Grave", "Muito Grave"],
        questions: [
            { text: "Dificuldade para pegar no sono?" },
            { text: "Dificuldade em manter o sono (acorda muito)?" },
            { text: "Problemas por acordar cedo demais?" },
            { text: "Nível de insatisfação com seu padrão de sono atual?" },
            { text: "Quanto o sono interfere nas suas atividades diárias?" },
            { text: "Quão perceptível aos outros é o prejuízo causado pelo sono?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 15;
            let res = total <= 7 ? "Ausente" : total <= 14 ? "Subclínica" : total <= 21 ? "Moderada" : "Grave";
            return {
                score: total,
                result: `Insônia ${res}`,
                details: `Escore: ${total}/24.`,
                interpretation: `A privação de sono detectada (${res.toLowerCase()}) é um fator agravante para humor e concentração.`,
                showSuggestions: high
            };
        }
    },

    // --- 11. TOC (OCI-R - Obsessive Compulsive Inventory) ---
    toc: {
        id: "toc",
        title: "Rastreio de TOC (OCI-R)",
        color: "#065f46",
        description: "Investigação de pensamentos obsessivos e rituais compulsivos.",
        suggestions: ["ansiedade", "tea"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [
            { text: "Preciso verificar as coisas mais vezes do que o necessário." },
            { text: "Fico perturbado se as coisas não estão na ordem certa." },
            { text: "Tenho que lavar as mãos com frequência ou de um certo jeito." },
            { text: "Sou compelido a contar enquanto faço as coisas." },
            { text: "Tenho pensamentos repetitivos desagradáveis que não saem da mente." },
            { text: "Sinto que algo horrível vai acontecer se eu não fizer certos rituais." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 10;
            return {
                score: total,
                result: high ? "ALTO RISCO" : "BAIXO RISCO",
                details: `Escore OCI-R: ${total}. Ponto de corte: 10.`,
                interpretation: high ? "Sintomatologia compatível com Transtorno Obsessivo-Compulsivo. Verificar sobreposição com rituais de TEA." : "Sintomas obsessivos abaixo do limiar clínico.",
                showSuggestions: high
            };
        }
    },

    // --- 12. SUBSTÂNCIAS (AUDIT-C) ---
    substancias: {
        id: "substancias",
        title: "Uso de Substâncias (AUDIT-C)",
        color: "#4c1d95",
        description: "Avaliação de padrões de consumo de álcool.",
        suggestions: ["tab", "borderline"],
        options: ["Nunca", "1x mês ou menos", "2-4x por mês", "2-3x por semana", "4x ou mais por semana"],
        questions: [
            { text: "Com que frequência você consome bebidas alcoólicas?" },
            { text: "Quantas doses você consome em um dia típico?" },
            { text: "Com que frequência consome 5 ou mais doses em uma ocasião?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 4;
            return {
                score: total,
                result: high ? "CONSUMO DE RISCO" : "CONSUMO BAIXO RISCO",
                details: `Escore AUDIT-C: ${total}.`,
                interpretation: high ? "O padrão de consumo de substâncias indica risco à saúde e possível uso como automedicação para outros transtornos." : "Consumo dentro dos limites de baixo risco.",
                showSuggestions: high
            };
        }
    },

    // --- 13. AUTOESTIMA (Rosenberg) ---
    autoestima: {
        id: "autoestima",
        title: "Autoestima (Rosenberg)",
        color: "#db2777",
        description: "Avaliação da autoimagem e valor pessoal.",
        suggestions: ["depressao", "ansiedade"],
        options: ["Concordo plenamente", "Concordo", "Discordo", "Discordo plenamente"],
        questions: [
            { text: "Sinto que sou uma pessoa de valor, no mínimo tanto quanto os outros." },
            { text: "Sinto que tenho várias boas qualidades." },
            { text: "Sou capaz de fazer as coisas tão bem quanto a maioria das outras pessoas." },
            { text: "Tenho uma atitude positiva em relação a mim mesmo." },
            { text: "Sinto-me satisfeito comigo mesmo." },
            { text: "Sinto que não tenho muito do que me orgulhar." } // Invertida
        ],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            const mapInv = [0, 1, 2, 3];
            let total = 0;
            answers.forEach((idx, i) => { total += (i === 5) ? mapInv[idx] : map[idx]; });
            const low = total <= 15;
            return {
                score: total,
                result: total <= 15 ? "Autoestima Baixa" : "Autoestima Saudável",
                details: `Escore: ${total}/30.`,
                interpretation: low ? "Baixos níveis de autoestima detectados, frequentemente associados a quadros de depressão e ansiedade social." : "Níveis de autoestima dentro da faixa de funcionalidade.",
                showSuggestions: low
            };
        }
    }
};
