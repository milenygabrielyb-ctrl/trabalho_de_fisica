const express = require("express");
const path = require("path");
const app = express();

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

// Força achar a página inicial
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Utilizando porta dinâmica configurada pelo Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
