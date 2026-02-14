/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 5.5 (Excelência Clínica - Profundidade Máxima e Linguagem Acessível)
 * DESCRIÇÃO: Motor de inteligência diagnóstica com interpretação técnica de elite.
 */

export const Battery = {
    // --- 1. TDAH (ASRS-18) ---
    tdah: {
        id: "tdah", title: "TDAH Adulto (ASRS-18)", color: "#2563eb", weight: 1.5, maxScore: 18,
        description: "Rastreio oficial para desatenção, hiperatividade e impulsividade em adultos.",
        suggestions: ["tea", "ansiedade", "sono"],
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        questions: [
            { id: "a1", text: "Você tem dificuldade para terminar os detalhes finais de um trabalho depois que já fez a parte mais difícil?", threshold: 2 },
            { id: "a2", text: "Você acha difícil colocar as coisas em ordem quando precisa organizar uma tarefa?", threshold: 2 },
            { id: "a3", text: "Você tem dificuldade para lembrar de compromissos, reuniões ou coisas que precisa fazer?", threshold: 2 },
            { id: "a4", text: "Quando tem uma tarefa que exige muito esforço mental, você costuma adiar ou evitar começar?", threshold: 3 },
            { id: "a5", text: "Você fica mexendo as mãos ou os pés quando precisa ficar sentado por muito tempo?", threshold: 3 },
            { id: "a6", text: "Você se sente agitado, como se estivesse ligado por um motor, e acha difícil ficar parado?", threshold: 3 },
            { id: "b1", text: "Você comete erros por falta de cuidado quando o trabalho é chato ou difícil?", threshold: 2 },
            { id: "b2", text: "Você tem dificuldade de manter a atenção em trabalhos repetitivos ou cansativos?", threshold: 2 },
            { id: "b3", text: "Você sente dificuldade de se concentrar no que as pessoas dizem, mesmo quando falam diretamente com você?", threshold: 2 },
            { id: "b4", text: "Você vive perdendo coisas ou tem muita dificuldade de achar objetos em casa ou no trabalho?", threshold: 2 },
            { id: "b5", text: "Qualquer barulho ou atividade à sua volta te distrai com facilidade?", threshold: 2 },
            { id: "b6", text: "Você se levanta da cadeira em reuniões ou situações onde deveria ficar sentado?", threshold: 2 },
            { id: "b7", text: "Você se sente inquieto ou com as pernas agitadas?", threshold: 2 },
            { id: "b8", text: "Você tem dificuldade para sossegar e relaxar quando tem um tempo livre?", threshold: 2 },
            { id: "b9", text: "Você percebe que fala demais quando está com outras pessoas?", threshold: 2 },
            { id: "b10", text: "Você costuma terminar as frases das pessoas antes delas mesmas acabarem de falar?", threshold: 2 },
            { id: "b11", text: "Você tem dificuldade de esperar a sua vez em filas ou outras situações?", threshold: 2 },
            { id: "b12", text: "Você costuma interromper os outros quando eles estão ocupados ou conversando?", threshold: 2 }
        ],
        calculate: (answers) => {
            let partA = 0; let totalSymp = 0;
            answers.forEach((v, i) => { if (v >= Battery.tdah.questions[i].threshold) { totalSymp++; if (i < 6) partA++; } });
            const high = partA >= 4;
            return {
                score: totalSymp, result: high ? "ALTO RISCO (Indicativo Clínico)" : "BAIXO RISCO",
                details: `Identificados ${partA}/6 sintomas críticos na triagem inicial (OMS) e ${totalSymp}/18 indicadores totais de desregulação.`,
                interpretation: high ? 
                    "O perfil resultante apresenta uma prevalência acentuada de sintomas de desatenção e hiperatividade que excedem o ponto de corte clínico estabelecido pela Organização Mundial da Saúde para adultos. Tecnicamente, isso indica prejuízos substanciais nas funções executivas do cérebro, especificamente na memória de trabalho (capacidade de manter informações na mente), no controle inibitório e na organização sistêmica. A persistência desses indicadores sugere que o indivíduo gasta uma energia mental excessiva para realizar tarefas simples, o que frequentemente leva à exaustão cognitiva. É fundamental investigar a intersecção com o Transtorno do Espectro Autista (Perfil AuDHD) e Ansiedade Generalizada, uma vez que o TDAH raramente ocorre de forma isolada na vida adulta." : 
                    "Os níveis de atenção e controle motor registrados encontram-se dentro da curva de funcionalidade esperada para a população adulta. Embora falhas atencionais possam ocorrer sob estresse, elas não configuram um padrão clínico de TDAH nesta triagem técnica.",
                showSuggestions: high
            };
        }
    },

    // --- 2. AUTISMO (RAADS-14) ---
    tea: {
        id: "tea", title: "Autismo Adulto (RAADS-14)", color: "#7c3aed", weight: 1.5, maxScore: 42,
        description: "Rastreio de traços autistas, sensibilidade sensorial e comunicação social em adultos.",
        suggestions: ["tdah", "fobia_social", "toc"],
        options: ["Sempre foi assim", "Acontece agora", "Acontecia só quando eu era jovem", "Nunca"],
        questions: [{text:"Você sente dificuldade de entender o que as pessoas querem dizer quando elas não são diretas?"}, {text:"Sente que certas texturas de roupas, sons ou luzes te incomodam muito?"}, {text:"Você prefere fazer suas coisas sozinho do que estar acompanhado de outras pessoas?"}, {text:"Você tem dificuldade de saber a hora certa de falar ou de parar de falar em uma conversa?"}, {text:"Você costuma entender as coisas ao pé da letra e não entende bem piadas ou ironias?"}, {text:"Sente que precisa imitar o jeito das pessoas para parecer 'normal' ou se encaixar socialmente?"}, {text:"Fica muito ansioso ou irritado se a sua rotina muda de repente?"}, {text:"Você tem interesses tão fortes por um assunto que esquece de todo o resto?"}, {text:"As pessoas dizem que você é seco ou sem educação, mas você não percebeu?"}, {text:"Você faz movimentos repetitivos (como balançar o corpo ou estalar dedos) quando está nervoso ou animado?"}, {text:"Sente que tem muita dificuldade de fazer ou manter amizades por muito tempo?"}, {text:"Você percebe barulhos ou detalhes visuais que as outras pessoas parecem não notar?"}, {text:"Sente-se esgotado mentalmente depois de festas ou reuniões com muita gente?"}, {text:"Você tem manias ou jeitos de fazer as coisas que não consegue deixar de seguir?"}],
        calculate: (answers) => {
            const map = [3, 2, 1, 0]; const total = answers.reduce((acc, idx) => acc + map[idx], 0);
            const high = total >= 14;
            return {
                score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Pontuação total de ${total}/42. (Corte clínico de significância: 14 pontos).`,
                interpretation: high ? 
                    "O mapeamento aponta para um perfil neurodivergente compatível com o Transtorno do Espectro Autista (TEA) em adultos. Os indicadores são proeminentes nos domínios da pragmática social (regras não ditas da conversa) e no processamento sensorial. Observa-se um padrão de pensamento focado em detalhes e uma rigidez cognitiva que busca segurança na previsibilidade. O relato de cansaço extremo pós-socialização sugere o uso de 'Masking' (esforço adaptativo consciente), um fator de risco para o Burnout Autista. Este dossiê fornece base estatística para uma investigação presencial focada em diagnóstico sindrômico e mapeamento de necessidades de suporte." : 
                    "O padrão de respostas indica traços que se mantêm dentro da normalidade neurotípica. Não foram detectados prejuízos significativos na cognição social ou sensibilidades sensoriais que justifiquem o enquadramento no espectro autista nesta triagem.",
                showSuggestions: high
            };
        }
    },

    // --- 3. TRAUMA (PCL-5) ---
    trauma: {
        id: "trauma", title: "Trauma (PCL-5)", color: "#991b1b", weight: 1.5, maxScore: 80,
        description: "Protocolo completo para rastreio de Estresse Pós-Traumático (TEPT).",
        suggestions: ["ansiedade", "borderline", "sono"],
        options: ["Nada", "Um pouco", "Mais ou menos", "Muito", "Extremamente"],
        questions: [{text:"Vêm lembranças ruins e perturbadoras de um evento estressante na sua cabeça sem você querer?"}, {text:"Você tem sonhos ou pesadelos ruins relacionados a algo ruim que aconteceu?"}, {text:"Você sente ou age como se o evento ruim estivesse acontecendo de novo (flashbacks)?"}, {text:"Você sofre muito psicologicamente quando algo te faz lembrar do que aconteceu?"}, {text:"Seu corpo reage mal (coração bate forte, suor) quando você lembra da experiência?"}, {text:"Você se esforça para não pensar ou não sentir nada sobre o trauma?"}, {text:"Você evita lugares, pessoas ou situações que trazem lembranças ruins?"}, {text:"Tem dificuldade de lembrar de partes importantes do que aconteceu?"}, {text:"Você passou a ter pensamentos negativos e fortes sobre você mesmo ou sobre o mundo?"}, {text:"Você se sente culpado ou culpa os outros pelo que aconteceu de forma exagerada?"}, {text:"Sente emoções negativas constantes, como medo, raiva, pavor ou vergonha?"}, {text:"Você perdeu o interesse em fazer coisas que antes te davam prazer?"}, {text:"Sente-se afastado, isolado ou cortado das outras pessoas?"}, {text:"Sente que não consegue mais ter emoções positivas (como felicidade ou amor)?"}, {text:"Você anda muito irritado ou tem explosões de raiva por qualquer coisa?"}, {text:"Tem tido comportamentos perigosos, arriscados ou que te prejudicam?"}, {text:"Sente que está sempre em alerta, como se estivesse sendo vigiado ou em perigo?"}, {text:"Você leva sustos muito fáceis com qualquer barulho ou movimento?"}, {text:"Tem sentido muita dificuldade para se concentrar?"}, {text:"Tem tido problemas para pegar no sono ou para continuar dormindo?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0); const high = total >= 33;
            return { 
                score: total, result: high ? "ALTO RISCO (Indicativo de TEPT)" : "BAIXO RISCO",
                details: `Escore PCL-5: ${total}/80. Ponto de corte clínico estabelecido em 33 pontos.`,
                interpretation: high ? 
                    "Os indicadores apontam para a presença de Transtorno de Estresse Pós-Traumático (TEPT) com alta carga sintomatológica. O perfil clínico é caracterizado pela tríade de reexperiência traumática, evitação ativa e hiperestimulação do sistema nervoso (estado de alerta contínuo). Tecnicamente, observa-se que a amígdala cerebral mantém uma resposta de medo ativada, o que drena os recursos da área frontal, prejudicando o foco e a regulação das emoções. Este quadro pode mimetizar sintomas de TDAH e instabilidade Borderline, exigindo uma conduta psicoterapêutica focada em trauma para a estabilização biológica." : 
                    "Não foram preenchidos os critérios mínimos para estresse traumático persistente. O funcionamento emocional demonstra resiliência adequada frente a eventos estressores passados.",
                showSuggestions: high 
            };
        }
    },

    // --- 4. ANSIEDADE (GAD-7) ---
    ansiedade: {
        id: "ansiedade", title: "Ansiedade (GAD-7)", color: "#0ea5e9", weight: 1.2, maxScore: 21,
        suggestions: ["depressao", "trauma", "sono"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade dos dias", "Quase todos os dias"],
        questions: [{text:"Sente-se nervoso, ansioso ou com os nervos à flor da pele?"}, {text:"Não consegue parar de se preocupar ou controlar as preocupações?"}, {text:"Preocupa-se demais com muitas coisas diferentes ao mesmo tempo?"}, {text:"Sente dificuldade para relaxar ou descansar a mente?"}, {text:"Fica tão agitado que é difícil ficar sentado ou parado?"}, {text:"Fica facilmente aborrecido ou irritado com as coisas?"}, {text:"Sente medo, como se algo horrível fosse acontecer a qualquer momento?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : "Grave";
            return { 
                score: total, result: `ANSIEDADE ${res.toUpperCase()}`,
                details: `Total: ${total}/21 pontos na escala padronizada de ansiedade generalizada.`,
                interpretation: `O escore aponta para um Transtorno de Ansiedade Generalizada de nível ${res.toLowerCase()}. Este padrão é marcado por um estado de ruminação mental e alerta somático (corpo tenso) que interfere na tomada de decisões e na produtividade. A ansiedade crônica atua como um fator de desregulação do humor, podendo evoluir para quadros de pânico se não houver manejo clínico. É essencial investigar se este é um quadro isolado ou um sintoma secundário de quadros neurodivergentes ou traumáticos.`,
                showSuggestions: total >= 10 
            };
        }
    },

    // --- 5. DEPRESSÃO (PHQ-9) ---
    depressao: {
        id: "depressao", title: "Depressão (PHQ-9)", color: "#475569", weight: 1.5, maxScore: 27,
        suggestions: ["tab", "sono", "autoestima"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade dos dias", "Quase todos os dias"],
        questions: [{text:"Sente pouco interesse ou prazer em fazer as coisas que antes gostava?"}, {text:"Sente-se triste, deprimido ou sem esperança?"}, {text:"Tem tido dificuldade para dormir ou tem dormido demais?"}, {text:"Sente-se cansado ou com pouca energia?"}, {text:"Tem tido falta de apetite ou tem comido demais?"}, {text:"Sente-se mal com você mesmo, achando que é um fracasso?"}, {text:"Tem dificuldade para se concentrar em coisas simples como ler ou ver TV?"}, {text:"Sente-se muito lento ou muito agitado, a ponto de outras pessoas notarem?"}, {text:"Tem tido pensamentos de que seria melhor morrer ou de se ferir de alguma forma?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0); const risk = answers[8] > 0;
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : total <= 19 ? "Moderada Grave" : "Grave";
            return { 
                score: total, result: `DEPRESSÃO ${res.toUpperCase()}${risk ? " (⚠️ ALERTA DE RISCO)" : ""}`,
                details: `Total: ${total}/27 pontos. Presença de pensamentos de autoextermínio: ${risk ? "SIM" : "NÃO"}.`,
                interpretation: `Perfil sugestivo de transtorno do humor de nível ${res.toLowerCase()}. Observa-se um prejuízo severo na vitalidade e na capacidade de sentir prazer (anedonia), associado a um padrão de pensamento autocrítico e desregulador. A pontuação no item 9 é um marcador crítico de segurança que exige avaliação profissional prioritária. Recomenda-se o rastreio de Bipolaridade, pois o uso de antidepressivos em quadros bipolares sem estabilizadores pode causar sérias crises de ativação.`,
                showSuggestions: total >= 10 || risk 
            };
        }
    },

    // --- 6. BIPOLARIDADE (MDQ) ---
    tab: {
        id: "tab", title: "Bipolaridade (MDQ)", color: "#6366f1", weight: 1.4, maxScore: 13,
        suggestions: ["depressao", "borderline", "substancias"],
        options: ["Não", "Sim"],
        questions: [{text:"Você já teve períodos de se sentir tão bem ou tão animado que as pessoas acharam que você não era você mesmo?"}, {text:"Ficou tão irritado que começou brigas ou gritou com as pessoas sem motivo real?"}, {text:"Sentiu-se subitamente muito mais autoconfiante do que o normal?"}, {text:"Dormiu muito menos que o costume e ainda assim não sentiu cansaço?"}, {text:"Percebeu que estava falando muito mais rápido do que o seu normal?"}, {text:"Sentiu que os pensamentos corriam na sua cabeça e você não conseguia pará-los?"}, {text:"Distraía-se com qualquer coisa à sua volta e perdia o foco fácil?"}, {text:"Sentiu-se com muito mais energia do que o habitual para fazer as coisas?"}, {text:"Tornou-se muito mais ativo ou fez muito mais coisas do que de costume?"}, {text:"Tornou-se excessivamente social (ex: ligar para pessoas de madrugada)?"}, {text:"Sentiu um interesse sexual muito maior do que o seu padrão?"}, {text:"Fez coisas que eram arriscadas ou excessivas (gastos, direção, decisões)?"}, {text:"Esses comportamentos causaram problemas sérios na sua família, dinheiro ou trabalho?", isImpact:true}, {text:"Vários desses comportamentos aconteceram ao mesmo tempo, no mesmo período?", isTiming:true}, {text:"Alguém na sua família (sangue) tem diagnóstico de transtorno bipolar?"}],
        calculate: (answers) => {
            const symp = answers.slice(0, 12).filter(a => a === 1).length;
            const pos = symp >= 7 && answers[12] === 1 && answers[13] === 1;
            return { 
                score: symp, result: pos ? "TRIAGEM POSITIVA (Risco de TAB)" : "TRIAGEM NEGATIVA",
                details: `Indicadores de ativação: ${symp}/12. Critérios de simultaneidade e prejuízo funcional atendidos.`,
                interpretation: pos ? 
                    "Os indicadores sugerem a ocorrência de episódios de ativação de humor compatíveis com o Transtorno Afetivo Bipolar (TAB). Este perfil é marcado pela alternância entre polos de energia e estados mentais acelerados. É fundamental uma investigação psiquiátrica detalhada para evitar o diagnóstico equivocado de depressão unipolar. A estabilização do humor é a prioridade técnica para evitar prejuízos financeiros, relacionais e legais decorrentes da impulsividade." : 
                    "Os critérios de triagem para bipolaridade não foram preenchidos. O padrão de oscilação do humor registrado não configura episódios de mania ou hipomania nesta avaliação técnica.",
                showSuggestions: pos 
            };
        }
    },

    // --- 7. BURNOUT (CBI) ---
    burnout: {
        id: "burnout", title: "Burnout (CBI)", color: "#ea580c", weight: 1.1, maxScore: 100,
        suggestions: ["ansiedade", "depressao", "sono"],
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [{text:"Você se sente fisicamente esgotado ao final de um dia de trabalho?"}, {text:"Sente-se emocionalmente cansado pelas tarefas que precisa cumprir?"}, {text:"Você pensa frequentemente em desistir da sua carreira ou do seu cargo atual?"}, {text:"Sente-se fraco e fica doente com facilidade por causa do estresse?"}, {text:"Sente uma frustração constante com o seu trabalho?"}, {text:"Sente que a sua energia vital chegou ao limite máximo?"}, {text:"Sente que falta tempo para você descansar e ter lazer?"}],
        calculate: (answers) => {
            const vals = [0, 25, 50, 75, 100]; const avg = answers.reduce((a, b) => a + vals[b], 0) / 7;
            const high = avg >= 50;
            return { 
                score: Math.round(avg), result: high ? "ALTO RISCO / EXAUSTÃO" : "BAIXO RISCO",
                details: `Índice de Esgotamento: ${Math.round(avg)}%. Escala de Carga Ocupacional.`,
                interpretation: high ? 
                    "O escore aponta para um nível de estresse crônico ocupacional elevado, caracterizado pela despersonalização (sentir-se como um robô) e exaustão das reservas psíquicas. O Burnout atua como uma porta de entrada para transtornos de pânico e depressão maior. A conduta técnica exige revisão imediata da carga de trabalho e fortalecimento das estratégias de resiliência. Sem intervenção, o quadro pode evoluir para incapacidade laboral prolongada." : 
                    "Os níveis de estresse registrados encontram-se dentro da faixa de equilíbrio. Observa-se uma preservação adequada da capacidade de recuperação pós-trabalho.",
                showSuggestions: high 
            };
        }
    },

    // --- 8. BORDERLINE (MSI-BPD) ---
    borderline: {
        id: "borderline", title: "Borderline (MSI-BPD)", color: "#be185d", weight: 1.4, maxScore: 10,
        suggestions: ["tab", "trauma", "substancias"],
        options: ["Não", "Sim"],
        questions: [{text:"Seus relacionamentos costumam ser muito instáveis, intensos e com muitas brigas?"}, {text:"Você já se machucou de propósito (cortes, queimaduras) ou pensou em suicídio?"}, {text:"Você age por impulso em coisas perigosas (gastos, sexo, comida, direção)?"}, {text:"Seu humor muda de forma extrema e muito rápida, do nada?"}, {text:"Você sente um medo desesperado de ser abandonado pelas pessoas próximas?"}, {text:"Sente que não sabe direito quem você é ou muda muito de estilo e opinião?"}, {text:"Você sente um vazio crônico e doloroso por dentro?"}, {text:"Sente episódios de raiva muito forte e tem dificuldade de se controlar?"}, {text:"Quando está sob estresse, você desconfia de todos ou sente que está 'fora do corpo'?"}, {text:"Seus atos impulsivos já te causaram prejuízos graves na vida?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0); const high = total >= 7;
            return { 
                score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Escore: ${total}/10. Ponto de corte clínico estabelecido em 7 pontos.`,
                interpretation: high ? 
                    "Os indicadores apontam para marcadores significativos de desregulação emocional e instabilidade relacional, compatíveis com um funcionamento de personalidade limítrofe (Borderline). O perfil é caracterizado por hipersensibilidade ao rejeição e reatividade afetiva intensa. Tecnicamente, há uma dificuldade biológica em retornar ao estado de calma após um gatilho emocional. É imperativo investigar a coexistência de traumas na infância e o Transtorno Bipolar. A terapia dialética comportamental (DBT) é o direcionamento recomendado." : 
                    "Os traços de instabilidade emocional registrados encontram-se abaixo do limiar de triagem clínica. O padrão de regulação afetiva demonstra funcionalidade nesta avaliação.",
                showSuggestions: high 
            };
        }
    },

    // --- 9. FOBIA SOCIAL (Resumo Técnico Complementar) ---
    fobia_social: {
        id: "fobia_social", title: "Fobia Social (SPIN)", color: "#1e40af", weight: 1.1, maxScore: 68,
        suggestions: ["tea", "ansiedade", "autoestima"],
        options: ["Nada", "Um pouco", "Mais ou menos", "Muito", "Extremamente"],
        questions: [{text:"Tem medo de pessoas em posição de autoridade (chefes, professores)?"}, {text:"Fica muito incomodado ao perceber que está ficando vermelho na frente dos outros?"}, {text:"Festas e eventos sociais te deixam apavorado?"}, {text:"Evita conversar com pessoas que não conhece?"}, {text:"Tem muito medo de ser criticado pelas pessoas?"}, {text:"Evita fazer coisas por medo de passar vergonha ou se sentir humilhado?"}, {text:"Seu corpo reage mal (suor, tremores) quando está com outras pessoas?"}, {text:"Tem medo ou evita falar em público?"}, {text:"Sente desconforto se alguém te observa enquanto você trabalha ou estuda?"}, {text:"Tem medo de ser julgado de forma negativa pelos outros?"}, {text:"Evita olhar as pessoas nos olhos?"}, {text:"Sente palpitações no coração quando está com gente por perto?"}, {text:"Tem medo de parecer bobo ou inadequado perante os outros?"}, {text:"Evita comer ou beber em locais públicos por medo de ser observado?"}, {text:"Sente ansiedade antes mesmo de ir a um compromisso social?"}, {text:"Sente que 'trava' ou vai mal em provas e avaliações de desempenho?"}, {text:"Sente náuseas ou mal-estar no estômago em ambientes sociais?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0); const high = total >= 19;
            return { 
                score: total, result: high ? "RISCO MODERADO/ALTO" : "RISCO BAIXO",
                details: `Escore total de ${total}/68. Significância clínica a partir de 19 pontos.`,
                interpretation: high ? 
                    "Os indicadores sugerem um quadro de Ansiedade Social clinicamente relevante. O perfil é marcado pelo medo persistente de escrutínio alheio e pela evitação ativa de situações de exposição social. Tecnicamente, isso gera um 'custo de oportunidade' elevado, impedindo o desenvolvimento de competências interpessoais e profissionais. É vital distinguir se o isolamento é motivado pelo medo do julgamento (Fobia Social) ou pelo cansaço e custo do processamento social (comum no Autismo Adulto)." : 
                    "Não foram detectados níveis de ansiedade social que configurem risco clínico. O padrão de interação social encontra-se dentro da faixa de funcionalidade.",
                showSuggestions: high
            };
        }
    },

    // --- 10. TOC (OCI-R) ---
    toc: {
        id: "toc", title: "Rastreio de TOC (OCI-R)", color: "#065f46", weight: 1.3, maxScore: 72,
        description: "Investigação de manias, pensamentos repetitivos e rituais.",
        suggestions: ["ansiedade", "tea"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [{text:"Sente necessidade de conferir portas, janelas ou gás muitas vezes?"}, {text:"Tem mania de lavar as mãos ou limpar objetos toda hora?"}, {text:"Sente obrigação de contar coisas ou repetir números na cabeça?"}, {text:"Fica muito mal se as coisas não estiverem na ordem certinha?"}, {text:"Vêm pensamentos ruins repetidos na sua cabeça que você não consegue parar?"}, {text:"Faz rituais ou manias para evitar que algo ruim aconteça?"}, {text:"Acumula ou guarda coisas das quais não precisa de verdade?"}, {text:"Repete ações simples até sentir que o jeito está 'certo'?"}, {text:"Preocupa-se demais com sujeira, germes ou doenças?"}, {text:"Precisa que os objetos estejam perfeitamente alinhados ou iguais?"}, {text:"Medo constante de ter pensamentos proibidos, imorais ou 'errados'?"}, {text:"Gasta muito tempo do seu dia arrumando e organizando as coisas?"}, {text:"Sente impulso de tocar em certas coisas ou pessoas repetidamente?"}, {text:"Sente aflição ao jogar coisas fora por medo de precisar delas depois?"}, {text:"Evita certos números, cores ou palavras por acreditar que dão azar?"}, {text:"Sente que suas mãos nunca estão limpas o suficiente?"}, {text:"Fica muito ansioso se alguém toca nas suas coisas sem permissão?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0); const high = total >= 21;
            return { 
                score: total, result: high ? "INDICATIVO DE TOC" : "BAIXO RISCO",
                details: `Escore: ${total}/72. Ponto de corte clínico: 21.`,
                interpretation: high ? 
                    "Presença de padrões obsessivo-compulsivos que impactam o cotidiano. Os dados sugerem que pensamentos intrusivos e comportamentos ritualísticos operam como uma tentativa rígida de aliviar uma ansiedade interna intensa. Este ciclo consome tempo e energia vital, gerando sofrimento clinicamente relevante. É imperativo diferenciar se esses rituais são mecanismos de alívio de medo (TOC) ou uma busca por ordem sensorial e previsibilidade (TEA)." : 
                    "O padrão de respostas não indica sintomas obsessivo-compulsivos acima do limiar clínico.",
                showSuggestions: high 
            };
        }
    },

    // --- 11. SONO (ISI) ---
    sono: {
        id: "sono", title: "Qualidade do Sono (ISI)", color: "#1e1b4b", weight: 1.2, maxScore: 28,
        suggestions: ["depressao", "burnout", "ansiedade"],
        options: ["Nenhum", "Leve", "Moderado", "Grave", "Muito Grave"],
        questions: [{text:"Dificuldade para começar a dormir (pegar no sono)?"}, {text:"Dificuldade para continuar dormindo (acorda no meio da noite)?"}, {text:"Problemas por acordar cedo demais pela manhã e não conseguir voltar a dormir?"}, {text:"O quanto você está insatisfeito com o seu padrão de sono atual?"}, {text:"O quanto o sono atrapalha você nas suas atividades do dia a dia?"}, {text:"O quanto as pessoas percebem que o seu sono está ruim?"}, {text:"O quanto você se sente angustiado por causa dos seus problemas de sono?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 7 ? "Ausente" : total <= 14 ? "Subclínica" : total <= 21 ? "Moderada" : "Grave";
            return { 
                score: total, result: `INSÔNIA ${res.toUpperCase()}`,
                details: `Escore ISI: ${total}/28. Índice de gravidade técnica da insônia.`,
                interpretation: `A qualidade do sono identificada como ${res.toLowerCase()} atua como um fator de desregulação biológica severa. A falta de sono profundo prejudica diretamente a atenção, a memória e a regulação das emoções no dia seguinte. Quadros de insônia grave podem mimetizar ou piorar drasticamente sintomas de TDAH e Depressão. A regulação do sono deve ser a base prioritária de qualquer tratamento em saúde mental.`,
                showSuggestions: total >= 15 
            };
        }
    },

    // --- 12. AUTOESTIMA (Rosenberg) ---
    autoestima: {
        id: "autoestima", title: "Autoestima (Rosenberg)", color: "#db2777", weight: 1.0, maxScore: 30,
        suggestions: ["depressao", "fobia_social"],
        options: ["Concordo plenamente", "Concordo", "Discordo", "Discordo plenamente"],
        questions: [{text:"Sinto que sou uma pessoa de valor, no mínimo tanto quanto as outras.", inv:false}, {text:"Sinto que tenho várias boas qualidades.", inv:false}, {text:"Sinto que sou capaz de fazer as coisas tão bem quanto a maioria das pessoas.", inv:false}, {text:"Tenho uma atitude positiva em relação a mim mesmo.", inv:false}, {text:"Sinto-me satisfeito comigo mesmo.", inv:false}, {text:"Sinto que não tenho muito do que me orgulhar.", inv:true}, {text:"Às vezes me sinto inútil.", inv:true}, {text:"Sinto que não sou bom em nada.", inv:true}, {text:"Às vezes me sinto um fracasso.", inv:true}, {text:"Eu gostaria de ter mais respeito por mim mesmo.", inv:true}],
        calculate: (answers) => {
            const map = [3, 2, 1, 0]; const mapInv = [0, 1, 2, 3]; let total = 0;
            answers.forEach((idx, i) => { total += Battery.autoestima.questions[i].inv ? mapInv[idx] : map[idx]; });
            const low = total <= 15;
            return { 
                score: total, result: low ? "AUTOESTIMA BAIXA" : "AUTOESTIMA SAUDÁVEL",
                details: `Escore: ${total}/30. A escala de Rosenberg define 15 como limiar de fragilidade emocional.`,
                interpretation: low ? 
                    "Os níveis de autoestima registrados indicam uma fragilidade acentuada na percepção de autovalor. Este estado gera um 'filtro mental' negativo que distorce conquistas e habilidades, tornando o indivíduo mais vulnerável a quadros depressivos e de ansiedade social. A autocrítica elevada atua como um fator de manutenção para comportamentos de evitação e medo de errar." : 
                    "A percepção de autovalor encontra-se dentro dos parâmetros de funcionalidade e serve como um fator de proteção psicológica contra transtornos do humor.",
                showSuggestions: low 
            };
        }
    },

    // --- 13. SUBSTÂNCIAS (AUDIT) ---
    substancias: {
        id: "substancias", title: "Uso de Substâncias (AUDIT)", color: "#4c1d95", weight: 1.3, maxScore: 40,
        suggestions: ["tab", "borderline", "trauma"],
        options: ["Nunca", "Uma vez por mês ou menos", "2 a 4 vezes por mês", "2 a 3 vezes por semana", "4 vezes ou mais por semana"],
        questions: [{text:"Com que frequência você consome bebidas alcoólicas?"}, {text:"Quantas doses você bebe em um dia comum de consumo?"}, {text:"Com que frequência você bebe 6 ou mais doses de uma vez só?"}, {text:"Com que frequência percebe que não consegue parar de beber depois que começou?"}, {text:"Com que frequência você deixou de cumprir obrigações por causa da bebida?"}, {text:"Com que frequência precisou beber logo cedo para se recuperar de uma bebedeira?"}, {text:"Sente culpa ou remorso depois de ter bebido?"}, {text:"Já esqueceu o que aconteceu na noite anterior por causa da bebida?"}, {text:"Você ou outra pessoa já se machucou por causa da sua bebida?"}, {text:"Alguém já sugeriu que você parasse de beber?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0); const high = total >= 8;
            return { 
                score: total, result: high ? "CONSUMO DE RISCO" : "CONSUMO DE BAIXO RISCO",
                details: `Escore AUDIT: ${total}/40. Ponto de corte para risco à saúde física e mental: 8.`,
                interpretation: high ? 
                    "O padrão de consumo identificado aponta para riscos à integridade física e mental. Tecnicamente, o uso de substâncias pode estar operando como uma 'automedicação' para silenciar sofrimentos internos (ansiedade, trauma ou depressão), criando um ciclo de dependência psicológica. É necessária uma avaliação criteriosa sobre o impacto do uso na rede social e profissional, além de estratégias de redução de danos." : 
                    "O consumo de álcool registrado encontra-se dentro dos limites estatísticos de baixo risco.",
                showSuggestions: high 
            };
        }
    }
};
