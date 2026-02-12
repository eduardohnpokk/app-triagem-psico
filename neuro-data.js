/**
 * ARQUIVO: neuro-data.js
 * DESCRIÇÃO: Cérebro central (Sem QI, apenas testes clínicos validados).
 */

export const Battery = {
    // 1. TDAH ADULTO (ASRS-18)
    tdah: {
        id: "tdah",
        title: "TDAH Adulto (ASRS-18)",
        color: "#2563eb",
        description: "Avaliação de sintomas de desatenção e hiperatividade (Protocolo OMS).",
        type: "scale",
        options: ["Nunca", "Raramente", "Algumas vezes", "Frequentemente", "Muito Frequentemente"],
        questions: [
            { text: "Dificuldade para finalizar detalhes finais de um projeto quando as partes difíceis já foram concluídas?", weight: 1, group: "A" },
            { text: "Dificuldade para organizar as coisas quando precisa fazer algo que exige planejamento?", weight: 1, group: "A" },
            { text: "Problemas para lembrar de compromissos ou obrigações?", weight: 1, group: "A" },
            { text: "Evita ou adia iniciar tarefas que exigem muito esforço mental?", weight: 1, group: "A" },
            { text: "Balança as mãos ou os pés quando precisa ficar sentado por muito tempo?", weight: 1, group: "A" },
            { text: "Sente-se excessivamente ativo, como se estivesse 'com o motor ligado'?", weight: 1, group: "A" },
            { text: "Comete erros por descuido em projetos chatos ou difíceis?", weight: 1, group: "B" },
            { text: "Dificuldade para manter a atenção em trabalhos repetitivos?", weight: 1, group: "B" },
            { text: "Dificuldade para se concentrar no que as pessoas dizem, mesmo quando falam diretamente com você?", weight: 1, group: "B" },
            { text: "Perde ou tem dificuldade para encontrar objetos?", weight: 1, group: "B" },
            { text: "Se distrai com atividades ou barulhos ao redor?", weight: 1, group: "B" },
            { text: "Levanta da cadeira em reuniões ou situações onde deveria ficar sentado?", weight: 1, group: "B" },
            { text: "Sente-se inquieto ou agitado?", weight: 1, group: "B" },
            { text: "Dificuldade para sossegar e relaxar no tempo livre?", weight: 1, group: "B" },
            { text: "Fala demais em situações sociais?", weight: 1, group: "B" },
            { text: "Termina as frases das pessoas antes delas?", weight: 1, group: "B" },
            { text: "Dificuldade para esperar sua vez?", weight: 1, group: "B" },
            { text: "Interrompe os outros quando estão ocupados?", weight: 1, group: "B" }
        ]
    },

    // 2. AUTISMO (RAADS-14)
    tea: {
        id: "tea",
        title: "Espectro Autista (RAADS-14)",
        color: "#7c3aed",
        description: "Rastreio de traços do espectro, sensibilidade e camuflagem social.",
        type: "scale",
        options: ["Nunca", "Verdadeiro apenas quando jovem", "Verdadeiro apenas agora", "Verdadeiro agora e quando jovem"],
        questions: [
            { text: "É muito difícil para mim entender o que os outros estão pensando ou sentindo se não disserem claramente.", domain: "Mentalização" },
            { text: "Certas texturas (roupas/alimentos) ou barulhos me incomodam muito mais do que aos outros.", domain: "Sensorial" },
            { text: "Eu prefiro sair sozinho do que com outras pessoas.", domain: "Social" },
            { text: "Tenho dificuldade em saber a hora de falar ou falo demais sobre meus interesses.", domain: "Social" },
            { text: "Entendo as coisas 'ao pé da letra' e tenho dificuldade com sarcasmo.", domain: "Mentalização" },
            { text: "Sinto que preciso 'atuar' ou usar uma máscara para parecer normal em público.", domain: "Social" },
            { text: "Fico extremamente ansioso ou irritado quando minha rotina muda.", domain: "Sensorial" },
            { text: "Quando gosto de um assunto, leio tudo sobre ele a ponto de esquecer o resto.", domain: "Mentalização" },
            { text: "Dizem que sou 'sem filtro' ou rude sem eu ter intenção.", domain: "Mentalização" },
            { text: "Faço movimentos repetitivos (balançar, estalar dedos) quando nervoso.", domain: "Sensorial" },
            { text: "Tenho dificuldade em manter amigos, mesmo tentando.", domain: "Social" },
            { text: "Noto padrões ou sons que outros ignoram.", domain: "Sensorial" },
            { text: "Me sinto exausto após eventos sociais.", domain: "Social" },
            { text: "Tenho interesses muito específicos e intensos.", domain: "Mentalização" }
        ]
    },

    // 3. ALTAS HABILIDADES / SUPERDOTAÇÃO
    ahsd: {
        id: "ahsd",
        title: "Altas Habilidades / Superdotação",
        color: "#d97706",
        description: "Investigação de intensidade, sobre-excitabilidade e intelecto.",
        type: "scale",
        options: ["Não me descreve", "Descreve um pouco", "Descreve bem", "Descreve perfeitamente"],
        questions: [
            { text: "Aprendo rápido e fico entediado quando os outros demoram para entender.", domain: "Intelectual" },
            { text: "Tenho senso de justiça aguçado e me incomodo com falta de lógica.", domain: "Criativo" },
            { text: "Sinto-me um 'alienígena', como se ninguém compartilhasse da minha intensidade.", domain: "Sensibilidade" },
            { text: "Tenho curiosidade insaciável e faço perguntas profundas sobre a existência.", domain: "Intelectual" },
            { text: "Sou extremamente perfeccionista e autocrítico.", domain: "Criativo" },
            { text: "Meus sentimentos são intensos; eu não fico 'triste', entro em desespero.", domain: "Sensibilidade" },
            { text: "Tenho memória excelente para detalhes que os outros esquecem.", domain: "Intelectual" },
            { text: "Questiono autoridades e regras que não fazem sentido lógico.", domain: "Criativo" },
            { text: "Sensibilidade sensorial elevada (luzes, sons incomodam).", domain: "Sensibilidade" },
            { text: "Vejo conexões entre assuntos desconexos que outros não percebem.", domain: "Criativo" },
            { text: "Prefiro conversas profundas; 'conversa fiada' me exaure.", domain: "Sensibilidade" },
            { text: "Entro em hiperfoco e esqueço de comer ou dormir.", domain: "Intelectual" }
        ]
    },

    // 4. ANSIEDADE (GAD-7)
    ansiedade: {
        id: "ansiedade",
        title: "Ansiedade Generalizada (GAD-7)",
        color: "#0ea5e9",
        description: "Mapeamento de níveis de tensão e preocupação excessiva.",
        type: "scale",
        options: ["Nenhuma vez", "Vários dias", "Mais da metade dos dias", "Quase todos os dias"],
        questions: [
            { text: "Sentir-se nervoso(a), ansioso(a) ou muito tenso(a)." },
            { text: "Não ser capaz de impedir ou de controlar as preocupações." },
            { text: "Preocupar-se muito com diversas coisas." },
            { text: "Dificuldade para relaxar." },
            { text: "Ficar tão agitado(a) que se torna difícil permanecer sentado(a)." },
            { text: "Ficar facilmente aborrecido(a) ou irritado(a)." },
            { text: "Sentir medo como se algo horrível fosse acontecer." }
        ]
    },

    // 5. DEPRESSÃO (PHQ-9)
    depressao: {
        id: "depressao",
        title: "Depressão (PHQ-9)",
        color: "#475569",
        description: "Avaliação de humor, energia vital e anedonia.",
        type: "scale",
        options: ["Nenhuma vez", "Vários dias", "Mais da metade dos dias", "Quase todos os dias"],
        questions: [
            { text: "Pouco interesse ou prazer em fazer as coisas." },
            { text: "Sentir-se triste, deprimido(a) ou sem esperança." },
            { text: "Dificuldade para dormir ou dormir demais." },
            { text: "Cansado(a) ou com pouca energia." },
            { text: "Pouco apetite ou comer em excesso." },
            { text: "Sentir-se mal consigo mesmo(a) ou fracassado(a)." },
            { text: "Dificuldade para se concentrar." },
            { text: "Lentidão ou agitação motora." },
            { text: "Pensar em se ferir ou que seria melhor estar morto(a).", alert: true }
        ]
    },

    // 6. BURNOUT (CBI Adaptado)
    burnout: {
        id: "burnout",
        title: "Síndrome de Burnout",
        color: "#ea580c",
        description: "Mensuração de exaustão física e emocional ligada à rotina.",
        type: "scale",
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [
            { text: "Com que frequência você se sente fisicamente exausto?" },
            { text: "Com que frequência você se sente emocionalmente exausto?" },
            { text: "Com que frequência você pensa: 'Não aguento mais'?" },
            { text: "Com que frequência você se sente fraco e suscetível a doenças?" },
            { text: "O seu trabalho (ou rotina diária) faz você se sentir frustrado?" },
            { text: "Você sente que está trabalhando muito, mas produzindo pouco?" },
            { text: "Você sente que cada hora de trabalho é um sacrifício?" }
        ]
    },

    // 7. BIPOLARIDADE (MDQ)
    tab: {
        id: "tab",
        title: "Transtorno Bipolar (MDQ)",
        color: "#6366f1",
        description: "Rastreio de oscilações de humor (mania e hipomania).",
        type: "binary",
        options: ["Não", "Sim"],
        questions: [
            { text: "Você se sentiu tão bem ou tão hiperativo que outras pessoas acharam estranho?" },
            { text: "Você ficou tão irritado que gritou com as pessoas ou começou brigas?" },
            { text: "Você se sentiu muito mais autoconfiante do que o habitual?" },
            { text: "Você dormiu muito menos que o habitual e não sentiu falta?" },
            { text: "Você estava muito mais falante ou falou mais rápido do que o costume?" },
            { text: "Seus pensamentos corriam na cabeça (pensamento acelerado)?" },
            { text: "Você se distraía facilmente com coisas ao redor?" },
            { text: "Você tinha muito mais energia do que o habitual?" },
            { text: "Você estava muito mais ativo ou fez muito mais coisas do que o habitual?" },
            { text: "Você estava muito mais social (ex: ligando para amigos de madrugada)?" },
            { text: "Você estava muito mais interessado em sexo do que o habitual?" },
            { text: "Você fez coisas arriscadas (ex: gastar demais, dirigir imprudentemente)?" },
            { text: "Esses sintomas aconteceram no mesmo período de tempo?" }
        ]
    },

    // 8. BORDERLINE (MSI-BPD)
    borderline: {
        id: "borderline",
        title: "Transtorno Borderline (TPB)",
        color: "#be185d",
        description: "Avaliação de instabilidade emocional e medo de abandono.",
        type: "binary",
        options: ["Não", "Sim"],
        questions: [
            { text: "Seus relacionamentos próximos foram prejudicados por muitas discussões ou rompimentos?" },
            { text: "Você já se machucou fisicamente de propósito ou tentou suicídio?" },
            { text: "Você tem problemas com impulsividade (gastar, comer, sexo, substâncias)?" },
            { text: "Você tem mudanças de humor extremas e repentinas (horas de duração)?" },
            { text: "Você sente muita raiva a maior parte do tempo?" },
            { text: "Você costuma desconfiar das intenções das pessoas (paranoia) sob estresse?" },
            { text: "Você já se sentiu 'irreal' ou fora do corpo (dissociação)?" },
            { text: "Você sente um vazio crônico por dentro?" },
            { text: "Você sente que não sabe quem você realmente é (autoimagem instável)?" },
            { text: "Você faz esforços desesperados para evitar ser abandonado(a)?" }
        ]
    }
};
