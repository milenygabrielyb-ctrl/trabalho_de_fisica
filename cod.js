const express = require("express");
const path = require("path");
const app = express();

// Ele vai buscar o HTML tanto se estiver solto quanto se estiver dentro da "public"
app.use(express.static("public"));
app.use(express.static(__dirname));

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

// Porta dinâmica para a internet da nuvem
const p = process.env.PORT || 3000;
app.listen(p, () => {
    console.log("Servidor mágico rodando redondinho! 🚀");
});
