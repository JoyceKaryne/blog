
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const listaPosts = document.getElementById("lista-posts");


const textosPosts = [
    {
        titulo: "A importância de cuidar da saúde",
        texto: "Cuidar da saúde é importante para ter uma boa qualidade de vida. Consultas médicas, bons hábitos e prevenção ajudam a manter o bem-estar."
    },
    {
        titulo: "A importância da alimentação saudável",
        texto: "Uma alimentação variada ajuda o organismo a receber os nutrientes necessários para funcionar corretamente."
    },
    {
        titulo: "Por que precisamos dormir bem?",
        texto: "O sono é essencial para o descanso do corpo e do cérebro. Dormir bem contribui para a memória, a concentração e o bem-estar."
    },
    {
        titulo: "Saúde mental e bem-estar",
        texto: "A saúde mental também faz parte da saúde geral. Ter momentos de descanso, conversar com pessoas de confiança e buscar ajuda quando necessário são atitudes importantes."
    },
    {
        titulo: "Os benefícios da atividade física",
        texto: "A prática de atividades físicas ajuda a fortalecer o corpo, melhorar a disposição e contribuir para a saúde do coração."
    },
    {
        titulo: "Como prevenir doenças",
        texto: "Manter a higiene, ter hábitos saudáveis, manter as vacinas em dia e realizar consultas médicas são formas importantes de prevenção."
    },
    {
        titulo: "A importância da vacinação",
        texto: "As vacinas ajudam o organismo a se proteger contra diversas doenças e também contribuem para a proteção da comunidade."
    },
    {
        titulo: "A importância da higiene pessoal",
        texto: "Lavar as mãos, cuidar da higiene bucal e manter o corpo limpo são hábitos simples que ajudam a prevenir infecções."
    },
    {
        titulo: "Por que fazer exames médicos?",
        texto: "Os exames podem ajudar os profissionais de saúde a identificar alterações no organismo e acompanhar as condições de saúde de cada pessoa."
    },
    {
        titulo: "O papel dos profissionais da saúde",
        texto: "Médicos, enfermeiros, dentistas e outros profissionais trabalham para cuidar das pessoas, prevenir doenças e promover a saúde."
    }
];


const comentariosPorPost = [
    [
        "Cuidar da saúde deveria ser uma prioridade para todos!",
        "A prevenção é muito importante.",
        "Precisamos cuidar melhor dos nossos hábitos."
    ],
    [
        "Uma alimentação variada faz diferença.",
        "Comer bem também é cuidar da saúde.",
        "Gostei das dicas sobre alimentação!"
    ],
    [
        "Dormir bem ajuda na disposição.",
        "O sono também é importante para a memória.",
        "Precisamos descansar melhor."
    ],
    [
        "A saúde mental merece atenção.",
        "Conversar pode ajudar bastante.",
        "Gostei desse assunto!"
    ],
    [
        "A atividade física faz bem ao corpo.",
        "Caminhar também é uma boa opção.",
        "O importante é se movimentar."
    ],
    [
        "A prevenção ajuda a evitar doenças.",
        "Pequenos cuidados fazem diferença.",
        "A informação é muito importante."
    ],
    [
        "As vacinas protegem muitas pessoas.",
        "É importante manter a vacinação em dia.",
        "Gostei de aprender sobre esse assunto."
    ],
    [
        "Lavar as mãos é muito importante.",
        "A higiene ajuda a prevenir infecções.",
        "São hábitos simples e necessários."
    ],
    [
        "Os exames ajudam a acompanhar a saúde.",
        "Precisamos fazer consultas médicas.",
        "A prevenção é fundamental."
    ],
    [
        "Os profissionais da saúde são importantes.",
        "Cada profissional tem seu papel.",
        "Parabéns a todos os profissionais da saúde!"
    ]
];


async function carregarPosts() {

    try {

        const resposta = await fetch(API_URL);
        const posts = await resposta.json();

        listaPosts.innerHTML = "";

        posts.slice(0, 10).forEach((post, indice) => {

            const artigo = document.createElement("article");

            artigo.innerHTML = `
                <h3>${textosPosts[indice].titulo}</h3>
                <p>${textosPosts[indice].texto}</p>
            `;

            artigo.addEventListener("click", () => {
                carregarDetalhes(post.id, indice);
            });

            listaPosts.appendChild(artigo);

        });

    } catch (erro) {

        listaPosts.innerHTML =
            "Não foi possível carregar as publicações.";

        console.error(erro);

    }

}


async function carregarDetalhes(id, indice) {

    try {

        const [respostaPost, respostaComentarios] = await Promise.all([

            fetch(`${API_URL}/${id}`),
            fetch(`${API_URL}/${id}/comments`)

        ]);

        const post = await respostaPost.json();
        const comentarios = await respostaComentarios.json();

        document.getElementById("detalhes-post").style.display = "block";

        document.getElementById("conteudo-post").innerHTML = `
            <h3>${textosPosts[indice].titulo}</h3>
            <p>${textosPosts[indice].texto}</p>
        `;

        const listaComentarios =
            document.getElementById("lista-comentarios");

        listaComentarios.innerHTML = "";

        comentariosPorPost[indice].forEach((texto, i) => {

            const div = document.createElement("div");

            div.innerHTML = `
                <strong>Leitor ${i + 1}</strong>
                <p>${texto}</p>
            `;

            listaComentarios.appendChild(div);

        });

        document.getElementById("detalhes-post").scrollIntoView({
            behavior: "smooth"
        });

    } catch (erro) {

        console.error("Erro ao carregar detalhes:", erro);

    }

}


carregarPosts();
