/**
 * ARQUIVO: neuro-data.js
 * VERSÃO: 4.0 (Master Clinical Grade)
 * DESCRIÇÃO: Inteligência diagnóstica com 13 protocolos e matriz de comorbidades.
 */

export const Battery = {
    // --- 1. TDAH (ASRS-18) - Versão Adulta Completa ---
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
                details: `Identificados ${partA}/6 sintomas críticos na triagem primária.`,
                interpretation: high ? "Escore sugestivo de TDAH. A sobreposição com sintomas de Ansiedade e TEA (AuDHD) é estatisticamente comum e deve ser investigada." : "Sintomas abaixo do limiar clínico.",
                showSuggestions: high
            };
        }
    },

    // --- 2. AUTISMO (RAADS-14) - Versão Adulta Completa ---
    tea: {
        id: "tea", title: "Autismo Adulto (RAADS-14)", color: "#7c3aed", weight: 1.5, maxScore: 42,
        description: "Rastreio de traços autistas, processamento sensorial e cognição social.",
        suggestions: ["tdah", "fobia_social", "toc"],
        options: ["Verdadeiro agora e quando jovem", "Verdadeiro apenas agora", "Verdadeiro apenas quando jovem", "Nunca"],
        questions: [
            { text: "É difícil entender o que as pessoas querem dizer quando não são diretas." },
            { text: "Certas texturas e tecidos em minhas roupas me incomodam muito." },
            { text: "Prefiro fazer as coisas sozinho(a) do que com os outros." },
            { text: "Dificuldade em saber quando falar ou parar de falar em uma conversa." },
            { text: "Levo as coisas ao pé da letra e não entendo bem ironias ou sarcasmos." },
            { text: "Sinto que preciso atuar ou imitar as pessoas para parecer 'normal' socialmente." },
            { text: "Fico extremamente ansioso(a) ou irritado(a) se minha rotina muda inesperadamente." },
            { text: "Tenho interesses tão intensos que esqueço de todo o resto ao meu redor." },
            { text: "As pessoas dizem que eu sou rude ou insensível, mas eu não percebo." },
            { text: "Faço movimentos repetitivos (balançar, estalar dedos) quando estou nervoso(a) ou animado(a)." },
            { text: "Tenho muita dificuldade em manter amizades de longo prazo." },
            { text: "Noto barulhos ou detalhes visuais que as outras pessoas parecem ignorar." },
            { text: "Sinto uma exaustão mental profunda após eventos sociais ou festas." },
            { text: "Tenho rituais ou formas de fazer as coisas que não consigo quebrar." }
        ],
        calculate: (answers) => {
            const map = [3, 2, 1, 0];
            const total = answers.reduce((acc, idx) => acc + map[idx], 0);
            const high = total >= 14;
            return {
                score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE",
                details: `Pontuação: ${total}/42. (Corte clínico: 14).`,
                interpretation: high ? "Marcadores significativos de neurodivergência. A investigação de fobia social é recomendada para diferenciar isolamento por medo vs. isolamento por custo social." : "Traços dentro da curva neurotípica.",
                showSuggestions: high
            };
        }
    },

    // --- 3. FOBIA SOCIAL (SPIN - 17 Itens Completo) ---
    fobia_social: {
        id: "fobia_social", title: "Fobia Social (SPIN)", color: "#1e40af", weight: 1.1, maxScore: 68,
        description: "Avaliação profunda de ansiedade social, medo de julgamento e sintomas físicos.",
        suggestions: ["tea", "ansiedade", "autoestima"],
        options: ["Nada", "Um pouco", "Mais ou menos", "Muito", "Extremamente"],
        questions: [
            { text: "Tenho medo de pessoas em posição de autoridade." },
            { text: "Fico incomodado(a) por ficar corado(a) na frente das pessoas." },
            { text: "Festas e eventos sociais me apavoram." },
            { text: "Evito falar com pessoas que não conheço." },
            { text: "Ser criticado(a) me assusta muito." },
            { text: "Evito fazer coisas por medo de passar vergonha." },
            { text: "Suar ou tremer na frente dos outros me deixa ansioso(a)." },
            { text: "Evito falar em público por medo." },
            { text: "Fico desconfortável se alguém me observa trabalhando." },
            { text: "Tenho medo de ser avaliado(a) negativamente." },
            { text: "Evito olhar as pessoas nos olhos." },
            { text: "Sinto palpitações quando estou com pessoas." },
            { text: "Tenho medo de que pensem que eu sou tolo(a)." },
            { text: "Evito comer ou beber em público." },
            { text: "Tenho medo de não saber o que dizer em situações sociais." },
            { text: "Situações de desempenho (ex: provas) me paralisam." },
            { text: "Sinto náuseas em situações sociais." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 19;
            let level = total < 20 ? "Leve" : total < 30 ? "Moderada" : total < 40 ? "Grave" : "Muito Grave";
            return {
                score: total, result: high ? `Fobia Social ${level}` : "Risco Baixo",
                details: `Escore total de ${total}.`,
                interpretation: high ? "Sintomatologia de ansiedade social significativa. Necessário diferenciar de retraimento por TEA." : "Perfil social dentro da funcionalidade.",
                showSuggestions: high
            };
        }
    },

    // --- 4. ANSIEDADE (GAD-7) ---
    ansiedade: {
        id: "ansiedade", title: "Ansiedade (GAD-7)", color: "#0ea5e9", weight: 1.2, maxScore: 21,
        suggestions: ["depressao", "trauma", "sono"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [{text:"Sentir-se nervoso, ansioso ou muito tenso."}, {text:"Não ser capaz de impedir ou de controlar as preocupações."}, {text:"Preocupar-se muito com diversas coisas."}, {text:"Dificuldade para relaxar."}, {text:"Ficar tão agitado que é difícil permanecer sentado."}, {text:"Ficar facilmente aborrecido ou irritado."}, {text:"Sentir medo como se algo terrível fosse acontecer."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : "Grave";
            return { score: total, result: `Ansiedade ${res}`, details: `Total: ${total} pontos.`, interpretation: `O escore indica ansiedade de nível ${res.toLowerCase()}.`, showSuggestions: total >= 10 };
        }
    },

    // --- 5. DEPRESSÃO (PHQ-9) ---
    depressao: {
        id: "depressao", title: "Depressão (PHQ-9)", color: "#475569", weight: 1.5, maxScore: 27,
        suggestions: ["tab", "sono", "autoestima"],
        options: ["Nenhuma vez", "Vários dias", "Mais da metade", "Quase todos os dias"],
        questions: [{text:"Pouco interesse ou prazer em fazer as coisas."}, {text:"Sentir-se triste, deprimido ou sem esperança."}, {text:"Dificuldade para dormir ou dormir demais."}, {text:"Sentir-se cansado ou com pouca energia."}, {text:"Falta de apetite ou comer demais."}, {text:"Sentir-se mal consigo mesmo ou um fracasso."}, {text:"Dificuldade para se concentrar."}, {text:"Lentidão ou agitação perceptível."}, {text:"Pensamentos de que seria melhor morrer."}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const risk = answers[8] > 0;
            let res = total <= 4 ? "Mínima" : total <= 9 ? "Leve" : total <= 14 ? "Moderada" : total <= 19 ? "Moderada Grave" : "Grave";
            return { score: total, result: `Depressão ${res}${risk ? " (⚠️ RISCO)" : ""}`, details: `Total: ${total} pontos. Ideação: ${risk ? "SIM" : "NÃO"}.`, interpretation: `Escore sugestivo de depressão ${res.toLowerCase()}. Alerta crítico para o item 9.`, showSuggestions: total >= 10 || risk };
        }
    },

    // --- 6. TRAUMA (PCL-5 Completo) ---
    trauma: {
        id: "trauma", title: "Trauma (PCL-5)", color: "#991b1b", weight: 1.5, maxScore: 80,
        description: "Protocolo padrão-ouro para rastreio de Estresse Pós-Traumático.",
        suggestions: ["ansiedade", "borderline", "sono"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [
            { text: "Lembranças repetitivas e perturbadoras de uma experiência estressante?" },
            { text: "Sonhos perturbadores repetitivos sobre a experiência?" },
            { text: "Sentir ou agir como se a experiência estressante estivesse acontecendo de novo?" },
            { text: "Sentir-se muito perturbado quando algo o lembra da experiência?" },
            { text: "Reações físicas fortes (coração batendo forte, suor) ao lembrar?" },
            { text: "Evitar pensamentos ou sentimentos relacionados à experiência?" },
            { text: "Evitar situações, pessoas ou lugares que lembram a experiência?" },
            { text: "Dificuldade em lembrar de partes importantes da experiência?" },
            { text: "Crenças negativas persistentes sobre si ou o mundo?" },
            { text: "Culpar-se ou culpar os outros pelo que aconteceu?" },
            { text: "Estado emocional negativo persistente (medo, horror, raiva)?" },
            { text: "Diminuição acentuada do interesse em atividades?" },
            { text: "Sentir-se distante ou cortado das outras pessoas?" },
            { text: "Incapacidade persistente de sentir emoções positivas?" },
            { text: "Comportamento irritável ou acessos de raiva?" },
            { text: "Comportamento arriscado ou autodestrutivo?" },
            { text: "Sentir-se excessivamente alerta, vigilante ou de guarda?" },
            { text: "Susto fácil por qualquer barulho ou movimento?" },
            { text: "Dificuldade de concentração?" },
            { text: "Perturbações no sono?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 33;
            return { score: total, result: high ? "ALTO RISCO (TEPT)" : "BAIXO RISCO", details: `Escore: ${total}/80. (Corte clínico: 33).`, interpretation: high ? "Sintomatologia compatível com Transtorno de Estresse Pós-Traumático. Comorbidades com TDAH e Borderline são frequentes." : "Sem sinais clínicos de trauma persistente.", showSuggestions: high };
        }
    },

    // --- 7. TOC (OCI-R Completo) ---
    toc: {
        id: "toc", title: "Rastreio de TOC (OCI-R)", color: "#065f46", weight: 1.3, maxScore: 72,
        description: "Investigação de obsessões e compulsões.",
        suggestions: ["ansiedade", "tea"],
        options: ["Nada", "Um pouco", "Moderadamente", "Muito", "Extremamente"],
        questions: [
            { text: "Eu verifico as coisas com mais frequência do que o necessário." },
            { text: "Eu me lavo ou limpo as coisas com mais frequência do que o necessário." },
            { text: "Eu me sinto compelido(a) a contar enquanto faço as coisas." },
            { text: "Eu fico perturbado(a) se as coisas não estiverem na ordem correta." },
            { text: "Eu tenho pensamentos desagradáveis que entram na minha mente e não saem." },
            { text: "Eu sinto que algo terrível vai acontecer se eu não fizer as coisas de um certo jeito." },
            { text: "Eu coleciono coisas das quais não preciso realmente." },
            { text: "Eu me sinto compelido(a) a repetir certas ações até que elas pareçam 'certas'." },
            { text: "Eu me preocupo excessivamente com germes ou doenças." },
            { text: "Eu preciso que as coisas estejam simétricas." },
            { text: "Eu verifico portas, janelas ou gás repetidamente." },
            { text: "Eu tenho medo de ter pensamentos pecaminosos ou proibidos." },
            { text: "Eu gasto muito tempo organizando as coisas." },
            { text: "Eu me sinto obrigado(a) a tocar em certas coisas repetidamente." },
            { text: "Eu me preocupo se joguei fora algo importante." },
            { text: "Eu evito certos números ou cores." },
            { text: "Eu sinto que minhas mãos nunca estão limpas o suficiente." },
            { text: "Eu me sinto ansioso(a) se alguém toca nas minhas coisas." }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 21;
            return { score: total, result: high ? "INDICATIVO DE TOC" : "BAIXO RISCO", details: `Escore: ${total}. (Corte clínico: 21).`, interpretation: high ? "Presença de padrões obsessivo-compulsivos que exigem diagnóstico diferencial de rituais de TEA." : "Sintomas abaixo do limiar clínico.", showSuggestions: high };
        }
    },

    // --- 8. SONO (ISI - Insomnia Severity Index) ---
    sono: {
        id: "sono", title: "Qualidade do Sono (ISI)", color: "#1e1b4b", weight: 1.2, maxScore: 28,
        suggestions: ["depressao", "burnout", "ansiedade"],
        options: ["Nenhum", "Leve", "Moderado", "Grave", "Muito Grave"],
        questions: [
            { text: "Dificuldade para pegar no sono?" },
            { text: "Dificuldade em manter o sono (acorda durante a noite)?" },
            { text: "Problemas por acordar cedo demais?" },
            { text: "Nível de insatisfação com seu padrão de sono atual?" },
            { text: "Quanto o sono interfere nas suas atividades diárias?" },
            { text: "Quão perceptível aos outros é o prejuízo causado pelo sono?" },
            { text: "Quão preocupado(a) você está com seus problemas de sono?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            let res = total <= 7 ? "Ausente" : total <= 14 ? "Subclínica" : total <= 21 ? "Moderada" : "Grave";
            return { score: total, result: `Insônia ${res}`, details: `Escore: ${total}/28.`, interpretation: `A qualidade do sono é um pilar da regulação do humor e foco. Níveis acima de 15 são críticos.`, showSuggestions: total >= 15 };
        }
    },

    // --- 9. AUTOESTIMA (Rosenberg - 10 Itens Completo) ---
    autoestima: {
        id: "autoestima", title: "Autoestima (Rosenberg)", color: "#db2777", weight: 1.0, maxScore: 30,
        suggestions: ["depressao", "fobia_social"],
        options: ["Concordo plenamente", "Concordo", "Discordo", "Discordo plenamente"],
        questions: [
            { text: "Sinto que sou uma pessoa de valor, no mínimo tanto quanto os outros.", inv: false },
            { text: "Sinto que tenho várias boas qualidades.", inv: false },
            { text: "Sou capaz de fazer as coisas tão bem quanto a maioria das outras pessoas.", inv: false },
            { text: "Tenho uma atitude positiva em relação a mim mesmo(a).", inv: false },
            { text: "Sinto-me satisfeito(a) comigo mesmo(a).", inv: false },
            { text: "Sinto que não tenho muito do que me orgulhar.", inv: true },
            { text: "Às vezes, eu me sinto inútil.", inv: true },
            { text: "Sinto que não sou bom(boa) em nada.", inv: true },
            { text: "Às vezes, sinto que sou um fracasso.", inv: true },
            { text: "Eu gostaria de ter mais respeito por mim mesmo(a).", inv: true }
        ],
        calculate: (answers) => {
            const map = [3, 2, 1, 0]; const mapInv = [0, 1, 2, 3];
            let total = 0;
            answers.forEach((idx, i) => { total += Battery.autoestima.questions[i].inv ? mapInv[idx] : map[idx]; });
            const low = total <= 15;
            return { score: total, result: low ? "Autoestima Baixa" : "Autoestima Saudável", details: `Escore: ${total}/30.`, interpretation: low ? "Níveis baixos de autoestima são preditores de recaída em depressão." : "Autoestima dentro da funcionalidade.", showSuggestions: low };
        }
    },

    // --- 10. SUBSTÂNCIAS (AUDIT - 10 Itens Completo) ---
    substancias: {
        id: "substancias", title: "Uso de Substâncias (AUDIT)", color: "#4c1d95", weight: 1.3, maxScore: 40,
        description: "Identificação de padrões de risco no consumo de álcool.",
        suggestions: ["tab", "borderline", "trauma"],
        options: ["Nunca", "Mensal ou menos", "2 a 4x por mês", "2 a 3x por semana", "4x ou mais por semana"],
        questions: [
            { text: "Com que frequência você consome bebidas alcoólicas?" },
            { text: "Quantas doses você consome em um dia típico de consumo?" },
            { text: "Com que frequência consome 6 ou mais doses em uma única ocasião?" },
            { text: "Com que frequência não conseguiu parar de beber após começar?" },
            { text: "Com que frequência deixou de fazer o que era esperado por causa da bebida?" },
            { text: "Com que frequência precisou beber de manhã para se recuperar de uma bebedeira?" },
            { text: "Com que frequência sentiu remorso ou culpa após beber?" },
            { text: "Com que frequência não conseguiu lembrar do que aconteceu na noite anterior?" },
            { text: "Você ou outra pessoa já se feriu por causa da sua bebida?" },
            { text: "Alguém já sugeriu que você parasse de beber?" }
        ],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 8;
            return { score: total, result: high ? "CONSUMO DE RISCO" : "BAIXO RISCO", details: `Escore AUDIT: ${total}/40.`, interpretation: high ? "Padrão de consumo prejudicial. Pode indicar automedicação para quadros de ansiedade ou mania." : "Consumo dentro da zona de segurança.", showSuggestions: high };
        }
    },

    // --- 11. BIPOLARIDADE (MDQ) ---
    tab: {
        id: "tab", title: "Bipolaridade (MDQ)", color: "#6366f1", weight: 1.4, maxScore: 13,
        suggestions: ["depressao", "borderline", "substancias"],
        options: ["Não", "Sim"],
        questions: [{text:"Sentiu-se eufórico(a)?"}, {text:"Irritabilidade extrema?"}, {text:"Autoconfiança excessiva?"}, {text:"Dormiu menos sem fadiga?"}, {text:"Fala acelerada?"}, {text:"Pensamentos rápidos?"}, {text:"Fácil distração?"}, {text:"Muita energia?"}, {text:"Hiperatividade?"}, {text:"Socialização excessiva?"}, {text:"Interesse sexual alto?"}, {text:"Imprudência/Risco?"}, {text:"Gastos excessivos?"}, {text:"Simultaneidade?", isTiming:true}, {text:"Problemas graves?", isImpact:true}],
        calculate: (answers) => {
            const symp = answers.slice(0, 13).filter(a => a === 1).length;
            const pos = symp >= 7 && answers[13] === 1 && answers[14] === 1;
            return { score: symp, result: pos ? "TRIAGEM POSITIVA" : "TRIAGEM NEGATIVA", details: `Sintomas: ${symp}/13.`, interpretation: pos ? "Indicativos de episódios de ativação de humor compatíveis com TAB I ou II." : "Critérios não preenchidos.", showSuggestions: pos };
        }
    },

    // --- 12. BURNOUT (CBI) ---
    burnout: {
        id: "burnout", title: "Burnout (CBI)", color: "#ea580c", weight: 1.1, maxScore: 100,
        suggestions: ["ansiedade", "depressao", "sono"],
        options: ["Nunca", "Às vezes", "Frequentemente", "Muitas vezes", "Sempre"],
        questions: [{text:"Sente exaustão física?"}, {text:"Sente exaustão emocional?"}, {text:"Desejo de desistir?"}, {text:"Fragilidade física?"}, {text:"Frustração laboral?"}, {text:"Limite de energia atingido?"}, {text:"Falta de tempo para si?"}],
        calculate: (answers) => {
            const vals = [0, 25, 50, 75, 100];
            const avg = answers.reduce((a, b) => a + vals[b], 0) / 7;
            return { score: Math.round(avg), result: avg < 50 ? "Baixo Risco" : "Alto Risco", details: `Índice: ${Math.round(avg)}%.`, interpretation: `A carga de esgotamento é considerada ${avg >= 50 ? "alta" : "controlada"}.`, showSuggestions: avg >= 50 };
        }
    },

    // --- 13. BORDERLINE (MSI-BPD) ---
    borderline: {
        id: "borderline", title: "Borderline (MSI-BPD)", color: "#be185d", weight: 1.4, maxScore: 10,
        suggestions: ["tab", "trauma", "substancias"],
        options: ["Não", "Sim"],
        questions: [{text:"Relações instáveis?"}, {text:"Suicidabilidade/Mutilação?"}, {text:"Impulsividade?"}, {text:"Instabilidade afetiva?"}, {text:"Medo de abandono?"}, {text:"Perturbação da identidade?"}, {text:"Vazio crônico?"}, {text:"Ira intensa?"}, {text:"Paranoia sob estresse?"}, {text:"Autodestruição?"}],
        calculate: (answers) => {
            const total = answers.reduce((a, b) => a + b, 0);
            const high = total >= 7;
            return { score: total, result: high ? "ALTA PROBABILIDADE" : "BAIXA PROBABILIDADE", details: `Escore: ${total}/10.`, interpretation: high ? "Indicadores de desregulação emocional severa." : "Traços abaixo do limiar clínico.", showSuggestions: high };
        }
    }
};
