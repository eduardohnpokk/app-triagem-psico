/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 4.0 (Master Clinical Grade)
 * DESCRIÇÃO: Inteligência diagnóstica com 13 protocolos e matriz de comorbidades.
 */

export const Battery = {
    // --- 1. TDAH (ASRS-18) ---
    tdah: {
        id: "tdah", title: "TDAH Adulto (ASRS-18)", color: "#2563eb", weight: 1.5, maxScore: 18,
        description: "Rastreio oficial da OMS para desatenção e hiperatividade em adultos.",
        suggestions: ["tea", "ansiedade", "sono"],
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        questions: [
            { id: "a1", text: "Dificuldade para finalizar os detalhes finais de um projeto, após ter feito as partes mais difíceis?", threshold: 2 },
            { id: "a2", text: "Dificuldade para colocar as coisas em ordem quando precisa fazer uma tarefa que exige organização?", threshold: 2 },
            { id: "a3", text: "Dificuldade para lembrar de compromissos ou obrigações?", threshold: 2 },
            { id: "a4", text: "Quando tem uma tarefa que exige muito esforço mental, você adia ou evita começar?", threshold: 3 },
            { id: "a5", text: "Você fica mexendo as mãos ou os pés quando precisa ficar sentado por muito tempo?", threshold: 3 },
            { id: "a6", text: "Você se sente hiperativo(a) ou impulsionado(a) por um motor, como se fosse difícil ficar parado(a)?", threshold: 3 },
            { id: "b1", text: "Comete erros por descuido quando tem que trabalhar em um projeto chato ou difícil?", threshold: 2 },
            { id: "b2", text: "Dificuldade em manter a atenção quando está fazendo um trabalho chato ou repetitivo?", threshold: 2 },
            { id: "b3", text: "Dificuldade para se concentrar no que as pessoas dizem, mesmo quando elas estão falando diretamente com você?", threshold: 2 },
            { id: "b4", text: "Você perde as coisas ou tem dificuldade de encontrar objetos em casa ou no trabalho?", threshold: 2 },
            { id: "b5", text: "Você se distrai com atividades ou barulhos à sua volta?", threshold: 2 },
            { id: "b6", text: "Você se levanta da cadeira em reuniões ou em outras situações onde deveria ficar sentado(a)?", threshold: 2 },
            { id: "b7", text: "Você se sente inquieto(a) ou agitado(a)?", threshold: 2 },
            { id: "b8", text: "Dificuldade para sossegar e relaxar quando tem tempo livre para você?", threshold: 2 },
            { id: "b9", text: "Você se pega falando demais quando está em situações sociais?", threshold: 2 },
            { id: "b10", text: "Você se pega terminando as frases das pessoas antes delas mesmas terminarem?", threshold: 2 },
            { id: "b11", text: "Dificuldade para esperar a sua vez em situações onde isso é necessário?", threshold: 2 },
            { id: "b12", text: "Você interrompe os outros quando eles estão ocupados?", threshold: 2 }
        ],
        calculate: (answers) => {
            let partA = 0; let totalSymp = 0;
            answers.forEach((v, i) => { 
                if (v >= Battery.tdah.questions[i].threshold) {
                    totalSymp++;
                    if (i < 6) partA++;
                }
            });
            const high = partA >= 4;
            return {
                score: totalSymp, result: high ? "ALTO RISCO (Indicativo Clínico)" : "BAIXO RISCO",
                details: `Identificados ${partA}/6 sintomas críticos na triagem primária e ${totalSymp} indicadores totais.`,
                interpretation: high ? "Os resultados indicam uma forte presença de sintomas de desatenção e/ou hiperatividade que excedem o ponto de corte clínico para a população adulta. A persistência desses sintomas sugere prejuízos significativos nas funções executivas e na autorregulação, demandando investigação de diagnósticos diferenciais." : "A pontuação registrada encontra-se dentro dos limites da normalidade para a população adulta.",
                showSuggestions: high
            };
        }
    },
    tea: {
        id: "tea", title: "Autismo Adulto (RAADS-14)", color: "#7c3aed", weight: 1.5, maxScore: 42,
        description: "Rastreio de traços autistas, processamento sensorial e cognição social.",
        suggestions: ["tdah", "fobia_social", "toc"],
        options: ["Verdadeiro agora e quando jovem", "Verdadeiro apenas agora", "Verdadeiro apenas quando jovem", "Nunca"],
        questions: [{text:"Entendimento de intenções."}, {text:"Sensibilidade sensorial."}, {text:"Isolamento social."}, {text:"Volume da fala."}, {text:"Literalidade."}, {text:"Camuflagem social."}, {text:"Rigidez de rotina."}, {text:"Hiperfoco."}, {text:"Contato visual."}, {text:"Movimentos repetitivos."}, {text:"Dificuldade em amizades."}, {text:"Percepção de detalhes."}, {text:"Exaustão social."}, {text:"Adesão a rituais."}],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            const total = answers.reduce((acc, idx) => acc + map[idx], 0);
            const high = total >= 14;
            return {
                score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Pontuação: ${total}/42. (Corte clínico: 14).`,
                interpretation: high ? "O escore total aponta para um perfil neurodivergente com marcadores significativos em domínios de cognição social, processamento sensorial e interesses circunscritos. Tais traços são compatíveis com o Espectro Autista em adultos." : "Traços dentro da curva neurotípica observada.",
                showSuggestions: high
            };
        }
    },
    fobia_social: {
        id: "fobia_social", title: "Fobia Social (SPIN)", color: "#1e40af", weight: 1.1, maxScore: 68,
        description: "Avaliação profunda de ansiedade social e medo de julgamento.",
        suggestions: ["tea", "ansiedade", "autoestima"],
        options: ["Nada", "Um pouco", "Mais ou menos", "Muito", "Extremamente"],
        questions: [{text:"Medo de autoridade."}, {text:"Corar."}, {text:"Festas me apavoram."}, {text:"Evito desconhecidos."}, {text:"Medo de crítica."}, {text:"Medo de vergonha."}, {text:"Suar/Tremor público."}, {text:"Falar em público."}, {text:"Observado trabalhando."}, {text:"Avaliação negativa."}, {text:"Contato visual."}, {text:"Palpitações."}, {text:"Parecer tolo."}, {text:"Beber em público."}, {text:"Sem o que dizer."}, {text:"Situações de prova."}, {text:"Náuseas sociais."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 19;
            return { 
                score: total, result: high ? "Risco Moderado/Alto" : "Risco Baixo", 
                details: `Escore total de ${total}. Ponto de corte: 19.`, 
                interpretation: high ? "Sintomatologia de ansiedade social significativa, indicando sofrimento clinicamente relevante em situações de exposição e avaliação social." : "Perfil social funcional.", 
                showSuggestions: high 
            };
        }
    },
    ansiedade: {
        id: "ansiedade", title: "Ansiedade (GAD-7)", color: "#0ea5e9", weight: 1.2, maxScore: 21,
        suggestions: ["depressao", "trauma", "sono"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [{text:"Sentir-se nervoso, ansioso ou muito tenso."}, {text:"Não ser capaz de impedir ou de controlar as preocupações."}, {text:"Preocupar-se muito com diversas coisas."}, {text:"Dificuldade para relaxar."}, {text:"Ficar tão agitado que é difícil permanecer sentado."}, {text:"Ficar facilmente aborrecido ou irritado."}, {text:"Sentir medo como se algo terrível fosse acontecer."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : "Grave";
            return { 
                score: total, result: `Ansiedade ${res}`, 
                details: `Total: ${total} pontos.`, 
                interpretation: `O nível de ansiedade registrado como ${res.toLowerCase()} aponta para um padrão de preocupação persistente que pode impactar a produtividade e o bem-estar somático.`, 
                showSuggestions: total >= 10 
            };
        }
    },
    depressao: {
        id: "depressao", title: "Depressão (PHQ-9)", color: "#475569", weight: 1.5, maxScore: 27,
        suggestions: ["tab", "sono", "autoestima"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [{text:"Pouco interesse ou prazer em fazer as coisas."}, {text:"Sentir-se triste, deprimido ou sem esperança."}, {text:"Dificuldade para dormir ou dormir demais."}, {text:"Sentir-se cansado ou com pouca energia."}, {text:"Falta de apetite ou comer demais."}, {text:"Sentir-se mal consigo mesmo ou um fracasso."}, {text:"Dificuldade para se concentrar."}, {text:"Lentidão ou agitação perceptível."}, {text:"Pensamentos de que seria melhor morrer."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const risk = answers[8] > 0;
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : total <= 19 ? "Moderada Grave" : "Grave";
            return { 
                score: total, result: `Depressão ${res}${risk ? " (⚠️ RISCO)" : ""}`, 
                details: `Total: ${total} pontos. Presença de ideação: ${risk ? "SIM" : "NÃO"}.`, 
                interpretation: `Perfil compatível com sintomatologia depressiva de nível ${res.toLowerCase()}. A detecção de marcadores de risco no item 9 exige acompanhamento profissional prioritário.`, 
                showSuggestions: total >= 10 || risk 
            };
        }
    },
    trauma: {
        id: "trauma", title: "Trauma (PCL-5)", color: "#991b1b", weight: 1.5, maxScore: 80,
        description: "Protocolo padrão-ouro para rastreio de Estresse Pós-Traumático.",
        suggestions: ["ansiedade", "borderline", "sono"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [{text:"Lembranças intrusivas."}, {text:"Pesadelos."}, {text:"Flashbacks."}, {text:"Perturbação na lembrança."}, {text:"Reações físicas."}, {text:"Evitação pensamentos."}, {text:"Evitação lugares."}, {text:"Amnésia traumática."}, {text:"Crenças negativas."}, {text:"Auto-culpa."}, {text:"Emoções negativas."}, {text:"Anedonia traumática."}, {text:"Distanciamento."}, {text:"Sem emoções positivas."}, {text:"Irritabilidade."}, {text:"Autodestruição."}, {text:"Hipervigilância."}, {text:"Susto fácil."}, {text:"Desconcentração."}, {text:"Insônia."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 33;
            return { 
                score: total, result: high ? "ALTO RISCO (TEPT)" : "BAIXO RISCO", 
                details: `Escore: ${total}/80. Ponto de corte técnico: 33.`, 
                interpretation: high ? "Indicadores sugestivos de Transtorno de Estresse Pós-Traumático (TEPT). O perfil aponta para a persistência de sintomas intrusivos e hiperestimulação autonômica." : "Ausência de marcadores clínicos de trauma persistente.", 
                showSuggestions: high 
            };
        }
    },
    toc: {
        id: "toc", title: "Rastreio de TOC (OCI-R)", color: "#065f46", weight: 1.3, maxScore: 72,
        description: "Investigação de obsessões e compulsões.",
        suggestions: ["ansiedade", "tea"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [{text:"Verificação."}, {text:"Lavagem."}, {text:"Contagem."}, {text:"Ordem."}, {text:"Pensamentos repetitivos."}, {text:"Rituais p/ evitar catástrofes."}, {text:"Acumulação."}, {text:"Repetição de ações."}, {text:"Germes."}, {text:"Simetria."}, {text:"Portas/Janelas."}, {text:"Pensamentos proibidos."}, {text:"Organização excessiva."}, {text:"Tocar coisas."}, {text:"Descarte difícil."}, {text:"Números/Cores."}, {text:"Limpeza de mãos."}, {text:"Ansiedade com pertences."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 21;
            return { 
                score: total, result: high ? "INDICATIVO DE TOC" : "BAIXO RISCO", 
                details: `Escore: ${total}/72. Corte clínico: 21.`, 
                interpretation: high ? "Presença de padrões obsessivo-compulsivos que impactam o funcionamento cotidiano. Necessária avaliação de diferenciação para rituais de TEA." : "Sintomatologia abaixo do limiar clínico.", 
                showSuggestions: high 
            };
        }
    },
    sono: {
        id: "sono", title: "Qualidade do Sono (ISI)", color: "#1e1b4b", weight: 1.2, maxScore: 28,
        suggestions: ["depressao", "burnout", "ansiedade"],
        options: ["Nenhum", "Leve", "Moderado", "Grave", "Muito Grave"],
        questions: [{text:"Dificuldade iniciar."}, {text:"Manter sono."}, {text:"Acordar cedo."}, {text:"Insatisfação."}, {text:"Interferência diária."}, {text:"Preocupação alheia."}, {text:"Preocupação pessoal."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 7 ? "Ausente" : total <= 14 ? "Subclínica" : total <= 21 ? "Moderada" : "Grave";
            return { 
                score: total, result: `Insônia ${res}`, 
                details: `Escore: ${total}/28.`, 
                interpretation: `A privação de sono detectada atua como um fator de desregulação emocional e prejuízo cognitivo direto nas funções de atenção e memória.`, 
                showSuggestions: total >= 15 
            };
        }
    },
    autoestima: {
        id: "autoestima", title: "Autoestima (Rosenberg)", color: "#db2777", weight: 1.0, maxScore: 30,
        suggestions: ["depressao", "fobia_social"],
        options: ["Concordo plenamente", "Concordo", "Discordo", "Discordo plenamente"],
        questions: [{text:"Pessoa de valor.", inv:false}, {text:"Boas qualidades.", inv:false}, {text:"Sou capaz.", inv:false}, {text:"Atitude positiva.", inv:false}, {text:"Satisfeito.", inv:false}, {text:"Sem orgulho.", inv:true}, {text:"Inútil.", inv:true}, {text:"Não sou bom em nada.", inv:true}, {text:"Um fracasso.", inv:true}, {text:"Gostaria de mais auto-respeito.", inv:true}],
        calculate: (answers) => {
            const map = [3, 2, 1, 0]; const mapInv = [0, 1, 2, 3];
            let total = 0;
            answers.forEach((idx, i) => { total += Battery.autoestima.questions[i].inv ? mapInv[idx] : map[idx]; });
            const low = total <= 15;
            return { 
                score: total, result: low ? "Autoestima Baixa" : "Autoestima Saudável", 
                details: `Escore: ${total}/30.`, 
                interpretation: low ? "A fragilidade na autoimagem detectada é um fator de vulnerabilidade para quadros ansiosos e depressivos." : "Níveis de autoestima dentro da faixa de funcionalidade.", 
                showSuggestions: low 
            };
        }
    },
    substancias: {
        id: "substancias", title: "Uso de Substâncias (AUDIT)", color: "#4c1d95", weight: 1.3, maxScore: 40,
        suggestions: ["tab", "borderline", "trauma"],
        options: ["Nunca", "Mensal ou menos", "2 a 4x mês", "2 a 3x semana", "4x+ semana"],
        questions: [{text:"Frequência álcool."}, {text:"Doses por dia."}, {text:"6+ doses uma vez."}, {text:"Incapacidade de parar."}, {text:"Falha em obrigações."}, {text:"Beber em jejum."}, {text:"Remorso pós-bebida."}, {text:"Amnésia pós-bebida."}, {text:"Ferimentos próprios/alheios."}, {text:"Conselho p/ parar."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 8;
            return { 
                score: total, result: high ? "CONSUMO DE RISCO" : "BAIXO RISCO", 
                details: `Escore: ${total}/40.`, 
                interpretation: high ? "O padrão de consumo identificado aponta para riscos à integridade física e mental, sugerindo possível uso de substâncias como mecanismo de enfrentamento desadaptativo." : "Padrão de consumo dentro dos limites de baixo risco.", 
                showSuggestions: high 
            };
        }
    },
    tab: {
        id: "tab", title: "Bipolaridade (MDQ)", color: "#6366f1", weight: 1.4, maxScore: 13,
        suggestions: ["depressao", "borderline", "substancias"],
        options: ["Não", "Sim"],
        questions: [{text:"Euforia."}, {text:"Irritabilidade."}, {text:"Autoconfiança."}, {text:"Sono reduzido."}, {text:"Fala rápida."}, {text:"Pensamentos rápidos."}, {text:"Distração."}, {text:"Energia."}, {text:"Atividade."}, {text:"Sociabilidade."}, {text:"Hipersexualidade."}, {text:"Imprudência."}, {text:"Gastos."}, {text:"Simultaneidade?", isTiming:true}, {text:"Problemas graves?", isImpact:true}],
        calculate: (answers) => {
            const symp = answers.slice(0, 13).filter(a => a === 1).length;
            const pos = symp >= 7 && answers[13] === 1 && answers[14] === 1;
            return { 
                score: symp, result: pos ? "TRIAGEM POSITIVA" : "TRIAGEM NEGATIVA", 
                details: `Sintomas: ${symp}/13. Critérios de tempo e impacto preenchidos.`, 
                interpretation: pos ? "Presença de episódios de ativação de humor compatíveis com mania ou hipomania. Fundamental investigar histórico familiar." : "Não foram preenchidos os critérios mínimos para triagem de TAB.", 
                showSuggestions: pos 
            };
        }
    },
    burnout: {
        id: "burnout", title: "Burnout (CBI)", color: "#ea580c", weight: 1.1, maxScore: 100,
        suggestions: ["ansiedade", "depressao", "sono"],
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [{text:"Exaustão física."}, {text:"Exaustão emocional."}, {text:"Desejo de desistir."}, {text:"Suscetível a doenças."}, {text:"Frustração laboral."}, {text:"Limite de energia."}, {text:"Falta de tempo p/ si."}],
        calculate: (answers) => {
            const vals = [0, 25, 50, 75, 100];
            const avg = answers.reduce((a, b) => a + vals[b], 0) / 7;
            return { 
                score: Math.round(avg), result: avg < 50 ? "Baixo Risco" : "Alto Risco", 
                details: `Índice de Esgotamento: ${Math.round(avg)}%.`, 
                interpretation: `Nível de estresse crônico laboral elevado, indicando esgotamento das reservas emocionais e físicas.`, 
                showSuggestions: avg >= 50 
            };
        }
    },
    borderline: {
        id: "borderline", title: "Borderline (MSI-BPD)", color: "#be185d", weight: 1.4, maxScore: 10,
        suggestions: ["tab", "trauma", "substancias"],
        options: ["Não", "Sim"],
        questions: [{text:"Relações instáveis."}, {text:"Suicidabilidade/Mutilação."}, {text:"Impulsividade."}, {text:"Instabilidade afetiva."}, {text:"Medo de abandono."}, {text:"Perturbação da identidade."}, {text:"Vazio crônico."}, {text:"Raiva intensa."}, {text:"Paranoia sob estresse."}, {text:"Autodestruição."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 7;
            return { 
                score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE", 
                details: `Escore: ${total}/10. Ponto de corte: 7.`, 
                interpretation: high ? "Marcadores significativos de desregulação emocional e instabilidade relacional que sugerem um funcionamento de personalidade limítrofe." : "Traços abaixo do limiar clínico.", 
                showSuggestions: high 
            };
        }
    }
};
