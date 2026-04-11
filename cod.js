const express = require("express");
const app = express();

app.use(express.static("public"));

const slides = [
    {
        titulo: "Cidades Inteligentes",
        conteudo: "Tecnologia para melhorar a vida nas cidades"
    },
    {
        titulo: "O que são?",
        conteudo: "Uso de tecnologia e dados para melhorar a qualidade de vida."
    },
    {
        titulo: "Tecnologia nas cidades",
        conteudo: "Melhora trânsito, segurança e serviços."
    },
    {
        titulo: "Iluminação Inteligente",
        conteudo: "Sensores que economizam energia e aumentam segurança."
    },
    {
        titulo: "Gestão de Lixo",
        conteudo: "Lixeiras inteligentes e coleta otimizada."
    },
    {
        titulo: "Gestão da Água",
        conteudo: "Monitoramento e redução de desperdícios."
    },
    {
        titulo: "Benefícios",
        conteudo: "Sustentabilidade, eficiência e qualidade de vida."
    },
    {
        titulo: "Conclusão",
        conteudo: "Tecnologia transforma cidades."
    }
];

app.get("/api/slides", (req, res) => {
    res.json(slides);
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});