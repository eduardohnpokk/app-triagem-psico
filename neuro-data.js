/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 3.1 (Excelência Clínica - Suporte a Consolidação de Dados)
 * DESCRIÇÃO: Motor de inteligência com metadados para Dossiê Global.
 */

export const Battery = {
    tdah: {
        id: "tdah", title: "TDAH Adulto (ASRS-18)", color: "#2563eb", weight: 1.5, maxScore: 6,
        description: "Rastreio de desatenção e hiperatividade em adultos.",
        suggestions: ["tea", "ansiedade"],
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        questions: [
            { id: "a1", text: "Dificuldade para finalizar detalhes finais de um projeto?", threshold: 2 },
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
                score: partA, result: high ? "ALTO RISCO" : "BAIXO RISCO",
                details: `Parte A: ${partA}/6 sintomas críticos identificados.`,
                interpretation: high ? "O perfil sugere uma forte presença de sintomas de desatenção e/ou hiperatividade que impactam a funcionalidade adulta." : "Sintomatologia abaixo do ponto de corte para TDAH.",
                showSuggestions: high
            };
        }
    },
    tea: {
        id: "tea", title: "Autismo Adulto (RAADS-14)", color: "#7c3aed", weight: 1.5, maxScore: 42,
        description: "Rastreio de traços autistas, sensorialidade e mentalização.",
        suggestions: ["tdah", "fobia_social"],
        options: ["Verdadeiro agora e quando jovem", "Verdadeiro apenas agora", "Verdadeiro apenas quando jovem", "Nunca"],
        questions: [{text:"Entendimento de intenções."}, {text:"Sensibilidade sensorial."}, {text:"Isolamento social."}, {text:"Volume da fala."}, {text:"Literalidade."}, {text:"Camuflagem social."}, {text:"Rigidez de rotina."}, {text:"Hiperfoco."}, {text:"Contato visual."}, {text:"Movimentos repetitivos."}, {text:"Dificuldade em amizades."}, {text:"Percepção de detalhes."}, {text:"Exaustão social."}, {text:"Adesão a rituais."}],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            const total = answers.reduce((acc, idx) => acc + map[idx], 0);
            const high = total >= 14;
            return { score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE", details: `Escore Total: ${total}/42.`, interpretation: high ? "A pontuação indica um perfil neurodivergente compatível com o Espectro Autista." : "Perfil de resposta dentro da curva de normalidade.", showSuggestions: high };
        }
    },
    ansiedade: {
        id: "ansiedade", title: "Ansiedade (GAD-7)", color: "#0ea5e9", weight: 1.2, maxScore: 21,
        suggestions: ["depressao", "trauma"],
        options: ["Nenhuma vez", "Vários dias", "Metade dos dias", "Quase todos os dias"],
        questions: [{text:"Nervosismo."}, {text:"Incontrolabilidade."}, {text:"Preocupação excessiva."}, {text:"Relaxamento."}, {text:"Inquietude."}, {text:"Irritabilidade."}, {text:"Pressentimento ruim."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : "Grave";
            return { score: total, result: `Ansiedade ${res}`, details: `Total: ${total} pontos.`, interpretation: `Nível de ansiedade classificado como ${res.toLowerCase()}.`, showSuggestions: total >= 10 };
        }
    },
    depressao: {
        id: "depressao", title: "Depressão (PHQ-9)", color: "#475569", weight: 1.5, maxScore: 27,
        suggestions: ["sono", "tab"],
        options: ["Nenhuma vez", "Vários dias", "Metade dos dias", "Quase todos os dias"],
        questions: [{text:"Anedonia."}, {text:"Humor deprimido."}, {text:"Sono."}, {text:"Energia."}, {text:"Apetite."}, {text:"Autoimagem."}, {text:"Concentração."}, {text:"Psicomotricidade."}, {text:"Ideação suicida."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const risk = answers[8] > 0;
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : total <= 19 ? "Moderada Grave" : "Grave";
            return { score: total, result: `Depressão ${res}${risk ? " (⚠️ RISCO)" : ""}`, details: `Total: ${total} pontos. Ideaçao: ${risk ? "Sim" : "Não"}.`, interpretation: `Sintomatologia depressiva de nível ${res.toLowerCase()}.`, showSuggestions: total >= 10 || risk };
        }
    },
    tab: {
        id: "tab", title: "Bipolaridade (MDQ)", color: "#6366f1", weight: 1.4, maxScore: 13,
        suggestions: ["depressao", "borderline"],
        options: ["Não", "Sim"],
        questions: [{text:"Euforia."}, {text:"Irritabilidade."}, {text:"Autoconfiança."}, {text:"Sono."}, {text:"Fala."}, {text:"Pensamentos."}, {text:"Distração."}, {text:"Energia."}, {text:"Atividade."}, {text:"Sociabilidade."}, {text:"Sexo."}, {text:"Imprudência."}, {text:"Gastos."}, {text:"Simultaneidade?", isTiming: true}, {text:"Impacto?", isImpact: true}],
        calculate: (answers) => {
            const symp = answers.slice(0, 13).filter(a => a === 1).length;
            const pos = symp >= 7 && answers[13] === 1 && answers[14] === 1;
            return { score: symp, result: pos ? "TRIAGEM POSITIVA" : "TRIAGEM NEGATIVA", details: `Sintomas: ${symp}/13.`, interpretation: pos ? "Há fortes indicativos de episódios de ativação de humor (mania/hipomania)." : "Critérios para triagem de TAB não preenchidos.", showSuggestions: pos };
        }
    },
    burnout: {
        id: "burnout", title: "Burnout (CBI)", color: "#ea580c", weight: 1.1, maxScore: 100,
        suggestions: ["ansiedade", "sono"],
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [{text:"Exaustão física."}, {text:"Exaustão emocional."}, {text:"Desistência."}, {text:"Doença."}, {text:"Frustração."}, {text:"Limite."}, {text:"Recuperação."}],
        calculate: (answers) => {
            const vals = [0, 25, 50, 75, 100];
            const avg = answers.reduce((a, b) => a + vals[b], 0) / 7;
            return { score: Math.round(avg), result: avg < 50 ? "Baixo Risco" : avg < 75 ? "Risco Moderado" : "Alto Risco", details: `Índice de Exaustão: ${Math.round(avg)}%.`, interpretation: `Carga de exaustão de nível ${avg >= 50 ? "preocupante" : "controlado"}.`, showSuggestions: avg >= 50 };
        }
    },
    borderline: {
        id: "borderline", title: "Borderline (MSI-BPD)", color: "#be185d", weight: 1.4, maxScore: 10,
        suggestions: ["tab", "trauma"],
        options: ["Não", "Sim"],
        questions: [{text:"Relacionamentos."}, {text:"Suicídio/Mutilação."}, {text:"Impulsividade."}, {text:"Humor."}, {text:"Abandono."}, {text:"Identidade."}, {text:"Vazio."}, {text:"Raiva."}, {text:"Paranoia."}, {text:"Autodestruição."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 7;
            return { score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE", details: `Escore: ${total}/10.`, interpretation: high ? "Indicadores significativos de desregulação emocional." : "Abaixo do limiar clínico.", showSuggestions: high };
        }
    },
    fobia_social: {
        id: "fobia_social", title: "Fobia Social (SPIN)", color: "#1e40af", weight: 1.1, maxScore: 28,
        suggestions: ["tea", "ansiedade"],
        options: ["Nada", "Um pouco", "Mais ou menos", "Muito", "Extremamente"],
        questions: [{text:"Autoridade."}, {text:"Corar."}, {text:"Festas."}, {text:"Estranhos."}, {text:"Crítica."}, {text:"Vergonha."}, {text:"Suor/Tremor."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 19;
            return { score: total, result: high ? "Risco Moderado/Alto" : "Risco Baixo", details: `Escore: ${total}.`, interpretation: high ? "Há indícios de Ansiedade Social significativa." : "Dentro do esperado.", showSuggestions: high };
        }
    },
    trauma: {
        id: "trauma", title: "Trauma e Estresse (PCL-5)", color: "#991b1b", weight: 1.5, maxScore: 24,
        suggestions: ["ansiedade", "borderline"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [{text:"Lembranças."}, {text:"Sonhos."}, {text:"Evitação."}, {text:"Distanciamento."}, {text:"Alerta."}, {text:"Susto."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 10;
            return { score: total, result: high ? "INDICAÇÃO POSITIVA" : "INDICAÇÃO NEGATIVA", details: `Escore: ${total}.`, interpretation: high ? "Marcadores de Estresse Pós-Traumático identificados." : "Sem marcadores significativos.", showSuggestions: high };
        }
    },
    sono: {
        id: "sono", title: "Qualidade do Sono (ISI)", color: "#1e1b4b", weight: 1.2, maxScore: 24,
        suggestions: ["depressao", "burnout"],
        options: ["Nenhum", "Leve", "Moderado", "Grave", "Muito Grave"],
        questions: [{text:"Dificuldade iniciar."}, {text:"Manutenção."}, {text:"Despertar precoce."}, {text:"Insatisfação."}, {text:"Interferência."}, {text:"Preocupação."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 15;
            return { score: total, result: `Insônia ${total > 14 ? "Presente" : "Ausente"}`, details: `Escore: ${total}/24.`, interpretation: `Privação de sono detectada como fator de risco.`, showSuggestions: high };
        }
    },
    toc: {
        id: "toc", title: "Rastreio de TOC (OCI-R)", color: "#065f46", weight: 1.3, maxScore: 24,
        suggestions: ["ansiedade", "tea"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [{text:"Verificação."}, {text:"Ordem."}, {text:"Lavagem."}, {text:"Contagem."}, {text:"Repetição."}, {text:"Catástrofe."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 10;
            return { score: total, result: high ? "ALTO RISCO" : "BAIXO RISCO", details: `Escore: ${total}.`, interpretation: high ? "Sintomatologia compatível com TOC." : "Sintomas abaixo do limiar.", showSuggestions: high };
        }
    },
    substancias: {
        id: "substancias", title: "Uso de Substâncias (AUDIT-C)", color: "#4c1d95", weight: 1.3, maxScore: 12,
        suggestions: ["tab", "borderline"],
        options: ["Nunca", "1x mês", "2-4x mês", "2-3x semana", "4x+ semana"],
        questions: [{text:"Frequência."}, {text:"Doses."}, {text:"Binge."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 4;
            return { score: total, result: high ? "CONSUMO DE RISCO" : "BAIXO RISCO", details: `Escore: ${total}.`, interpretation: high ? "Padrão de consumo indica risco à saúde física e mental." : "Consumo dentro dos limites.", showSuggestions: high };
        }
    },
    autoestima: {
        id: "autoestima", title: "Autoestima (Rosenberg)", color: "#db2777", weight: 1.0, maxScore: 18,
        suggestions: ["depressao", "ansiedade"],
        options: ["Concordo plenamente", "Concordo", "Discordo", "Discordo plenamente"],
        questions: [{text:"Valor pessoal."}, {text:"Qualidades."}, {text:"Capacidade."}, {text:"Atitude positiva."}, {text:"Satisfação."}, {text:"Orgulho (Invertida)."}],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            const mapInv = [0, 1, 2, 3];
            let total = 0;
            answers.forEach((idx, i) => { total += (i === 5) ? mapInv[idx] : map[idx]; });
            const low = total <= 10;
            return { score: total, result: total <= 10 ? "Autoestima Baixa" : "Autoestima Saudável", details: `Escore: ${total}/18.`, interpretation: low ? "Níveis de autoestima que podem exacerbar quadros de ansiedade." : "Escore dentro da funcionalidade.", showSuggestions: low };
        }
    }
};
