// public/games.js
let gameTimer = null;
let gameLoop = null;

// Limpa estado anterior antes de carregar um novo jogo
function resetGame() {
    clearInterval(gameTimer);
    clearInterval(gameLoop);
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = "";
    document.getElementById("titulo").innerText = "";
    return gameArea;
}

// Chamada pelo onclick dos botões no index.html
function iniciarJogo(id) {
    const area = resetGame();
    if (id === 1) jogarTransito(area);
    if (id === 2) jogarIluminacao(area);
    if (id === 3) jogarLixo(area);
    if (id === 4) jogarAgua(area);
    if (id === 5) jogarPlantio(area);
}

// ========================
// JOGO 1: TRÂNSITO FLUIDO
// ========================
function jogarTransito(area) {
    document.getElementById("titulo").innerText = "🚦 Trânsito Inteligente";

    let score = 0;
    let timeLeft = 10; // Segundos para vencer
    let isGameOver = false;

    // Configura a Interface do Jogo (Placar e Tempo)
    const ui = document.createElement("div");
    ui.style.marginBottom = "10px";
    ui.innerHTML = `<h3>Sincronize os semáforos quebrados rápido!</h3>
                    <p style="font-size:18px; margin:5px;">Tempo: <strong id="time">10</strong>s | Arrumados: <strong id="score">0</strong>/10</p>`;
    area.appendChild(ui);

    const playArea = document.createElement("div");
    playArea.style.position = "relative";
    playArea.style.width = "100%";
    playArea.style.height = "100%";
    area.appendChild(playArea);

    // Lógica para spawnar o sinal
    function spawnSemaforo() {
        if (isGameOver) return;
        const p = document.createElement("div");
        p.innerText = "🔴"; // Semáforo vermelho quebrado
        p.style.position = "absolute";
        p.style.fontSize = "45px";
        p.style.cursor = "pointer";
        p.style.userSelect = "none";
        p.style.left = Math.floor(Math.random() * 85) + "%";
        p.style.top = Math.floor(Math.random() * 70) + "%";
        p.style.transition = "transform 0.1s";

        // Quando o jogador clica para sincronizar (ficar verde)
        p.onmousedown = () => {
            if (isGameOver) return;
            p.innerText = "🟢";
            p.style.transform = "scale(1.2)";
            score++;
            document.getElementById("score").innerText = score;

            setTimeout(() => { if (playArea.contains(p)) p.remove(); }, 150);

            // Checa condição de vitória
            if (score >= 10) {
                isGameOver = true;
                area.innerHTML = `<h2 style="color:#4ade80;">🎉 Trânsito Liberado!</h2>
                                  <p>Você sincronizou os sinais e evitou um super engarrafamento na cidade.</p>`;
            } else {
                spawnSemaforo();
            }
        };
        playArea.appendChild(p);
    }

    spawnSemaforo(); // Inicia o loop do jogador clicando

    // Lógica contagem regressiva
    gameTimer = setInterval(() => {
        if (isGameOver) return clearInterval(gameTimer);
        timeLeft--;
        const timeEl = document.getElementById("time");
        if (timeEl) timeEl.innerText = timeLeft;

        // Checa condição de Derrota
        if (timeLeft <= 0) {
            isGameOver = true;
            area.innerHTML = `<h2 style="color:#ef4444;">💥 Fim de Jogo!</h2>
                              <p>Tempo esgotado! A cidade sofreu um engarrafamento quilométrico.</p>`;
        }
    }, 1000);
}

// ========================
// JOGO 2: ILUMINAÇÃO INTELIGENTE
// ========================
function jogarIluminacao(area) {
    document.getElementById("titulo").innerText = "💡 Iluminação Inteligente";

    let score = 0;

    const ui = document.createElement("div");
    ui.style.marginBottom = "10px";
    ui.innerHTML = `<h3>Economize energia clicando nas lâmpadas esbanjadoras (amarelas) para colocar LEDs!</h3>
                    <p style="font-size:18px;">Postes modernizadas: <strong id="leds">0</strong>/8</p>`;
    area.appendChild(ui);

    const playArea = document.createElement("div");
    playArea.style.position = "relative";
    playArea.style.width = "100%";
    playArea.style.height = "100%";
    area.appendChild(playArea);

    for (let i = 0; i < 8; i++) {
        const lamp = document.createElement("div");
        lamp.innerText = "🟡";
        lamp.style.position = "absolute";
        lamp.style.fontSize = "40px";
        lamp.style.cursor = "pointer";
        lamp.style.userSelect = "none";
        lamp.style.left = Math.floor(Math.random() * 85) + "%";
        lamp.style.top = Math.floor(Math.random() * 70) + "%";
        lamp.style.transition = "transform 0.1s";

        lamp.onmousedown = () => {
            if (lamp.innerText === "💡") return;
            lamp.innerText = "💡";
            lamp.style.transform = "scale(1.2)";
            score++;
            document.getElementById("leds").innerText = score;
            setTimeout(() => { lamp.style.transform = "scale(1)"; }, 150);

            if (score === 8) {
                setTimeout(() => {
                    area.innerHTML = `<h2 style="color:#facc15;">🎉 Iluminação Salva!</h2>
                                      <p>A praça agora usa lâmpadas de LED que duram 50x mais e economizam energia!</p>`;
                }, 500);
            }
        };
        playArea.appendChild(lamp);
    }
}

// ========================
// JOGO 3: RECICLAGEM OTIMIZADA
// ========================
function jogarLixo(area) {
    document.getElementById("titulo").innerText = "🗑️ Coleta Otimizada";

    let score = 0;
    let isGameOver = false;

    const ui = document.createElement("div");
    ui.innerHTML = `<h3>Controle a lixeira passando o mouse por cima dela para coletar os recicláveis!</h3>
                    <p style="font-size:18px;">Lixo Reciclado: <strong id="lixo">0</strong>/10</p>`;
    area.appendChild(ui);

    const playArea = document.createElement("div");
    playArea.style.position = "relative";
    playArea.style.width = "100%";
    playArea.style.height = "250px";
    area.appendChild(playArea);

    const lixeira = document.createElement("div");
    lixeira.innerText = "🗑️";
    lixeira.style.position = "absolute";
    lixeira.style.bottom = "0";
    lixeira.style.fontSize = "50px";
    lixeira.style.left = "45%";
    lixeira.style.userSelect = "none";
    lixeira.style.cursor = "col-resize";
    playArea.appendChild(lixeira);

    // Suporte a Mouse e Touch
    function mover(e) {
        if (isGameOver) return;
        const rect = playArea.getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let posX = clientX - rect.left - 25;
        if (posX < 0) posX = 0;
        if (posX > rect.width - 50) posX = rect.width - 50;
        lixeira.style.left = posX + "px";
    }
    playArea.addEventListener("mousemove", mover);
    playArea.addEventListener("touchmove", mover);

    function spawnTrash() {
        if (isGameOver) return;
        const trash = document.createElement("div");
        const items = ["🥤", "📦", "🥫", "📄"];
        trash.innerText = items[Math.floor(Math.random() * items.length)];
        trash.style.position = "absolute";
        trash.style.top = "0px";
        trash.style.left = Math.floor(Math.random() * 85) + "%";
        trash.style.fontSize = "30px";
        trash.style.userSelect = "none";
        playArea.appendChild(trash);

        let trashTop = 0;
        const fallTimer = setInterval(() => {
            if (isGameOver) { clearInterval(fallTimer); return; }
            trashTop += 5;
            trash.style.top = trashTop + "px";

            const lixRect = lixeira.getBoundingClientRect();
            const trashRect = trash.getBoundingClientRect();

            // Detectar colisão Simples
            if (trashRect.bottom >= lixRect.top &&
                trashRect.left >= lixRect.left - 30 &&
                trashRect.right <= lixRect.right + 30) {
                // Pegou!
                clearInterval(fallTimer);
                trash.remove();
                score++;
                document.getElementById("lixo").innerText = score;
                if (score >= 10) {
                    isGameOver = true;
                    area.innerHTML = `<h2 style="color:#d946ef;">🎉 Cidade Limpa!</h2>
                                      <p>O cesto inteligente identificou que está cheio e chamou o caminhão no mesmo minuto.</p>`;
                }
            } else if (trashTop > 250) {
                clearInterval(fallTimer);
                trash.remove();
            }
        }, 50);
    }

    gameLoop = setInterval(spawnTrash, 1200);
}

// ========================
// JOGO 4: GESTÃO DA ÁGUA
// ========================
function jogarAgua(area) {
    document.getElementById("titulo").innerText = "💧 Gestão da Água";

    let score = 0;
    let isGameOver = false;

    const ui = document.createElement("div");
    ui.style.marginBottom = "10px";
    ui.innerHTML = `<h3>Monitore os canos e clique rápido naqueles que vazarem água azul piscante!</h3>
                    <p style="font-size:18px;">Vazamentos Consertados: <strong id="agua">0</strong>/15</p>`;
    area.appendChild(ui);

    const playArea = document.createElement("div");
    playArea.style.position = "relative";
    playArea.style.width = "100%";
    playArea.style.height = "100%";
    area.appendChild(playArea);

    for (let i = 0; i < 15; i++) {
        const pipe = document.createElement("div");
        pipe.innerText = "🔧";
        pipe.style.position = "absolute";
        pipe.style.fontSize = "35px";
        pipe.style.cursor = "pointer";
        pipe.style.userSelect = "none";
        pipe.style.left = Math.floor(Math.random() * 85) + "%";
        pipe.style.top = Math.floor(Math.random() * 70) + "%";
        pipe.style.filter = "grayscale(100%)";
        pipe.dataset.leaking = "false";

        pipe.onmousedown = () => {
            if (pipe.dataset.leaking === "true" && !isGameOver) {
                pipe.dataset.leaking = "false";
                pipe.style.filter = "grayscale(100%)";
                pipe.style.transform = "scale(1.2)";
                setTimeout(() => { pipe.style.transform = "scale(1)"; }, 150);
                score++;
                document.getElementById("agua").innerText = score;

                if (score === 15) {
                    isGameOver = true;
                    setTimeout(() => {
                        area.innerHTML = `<h2 style="color:#60a5fa;">🎉 Água Poupada!</h2>
                                          <p>Os sensores IoT detectaram as fissuras na rede e você resolveu sem desperdiçar uma gota.</p>`;
                    }, 500);
                }
            }
        };
        playArea.appendChild(pipe);
    }

    function leak() {
        if (isGameOver) return;
        const pipes = playArea.children;
        const p = pipes[Math.floor(Math.random() * pipes.length)];
        if (p.dataset.leaking === "false") {
            p.dataset.leaking = "true";
            p.style.filter = "drop-shadow(0 0 10px #3b82f6) hue-rotate(180deg) brightness(200%)";
        }
    }

    gameLoop = setInterval(leak, 650);
}

// ========================
// JOGO 5: PLANTIO VERDE E BENEFÍCIOS
// ========================
function jogarPlantio(area) {
    document.getElementById("titulo").innerText = "🌱 Plante a Cidade";

    let score = 0;

    const ui = document.createElement("div");
    ui.innerHTML = `<h3>Clique repetidamente e freneticamente no espaço vazio para plantar árvores e limpar o ar!</h3>
                    <p style="font-size:18px;">Ar Puro: <strong id="ar">0</strong>%</p>`;
    area.appendChild(ui);

    const playArea = document.createElement("div");
    playArea.style.position = "relative";
    playArea.style.width = "100%";
    playArea.style.height = "250px";
    playArea.style.cursor = "crosshair";
    area.appendChild(playArea);

    playArea.onmousedown = (e) => {
        if (score >= 100) return;
        score += 2;
        document.getElementById("ar").innerText = score;

        const tree = document.createElement("div");
        const types = ["🌳", "🌴", "🌲", "🌻", "🌷"];
        tree.innerText = types[Math.floor(Math.random() * types.length)];
        tree.style.position = "absolute";
        tree.style.fontSize = Math.floor(Math.random() * 20 + 30) + "px";

        // Compensate for element coords
        const rect = playArea.getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let clientY = e.touches ? e.touches[0].clientY : e.clientY;

        tree.style.left = (clientX - rect.left - 15) + "px";
        tree.style.top = (clientY - rect.top - 15) + "px";
        tree.style.userSelect = "none";
        playArea.appendChild(tree);

        if (score >= 100) {
            setTimeout(() => {
                area.innerHTML = `<h2 style="color:#22c55e;">🎉 Cidade Respirando!</h2>
                                  <p>O maior benefício da cidade inteligente é a sustentabilidade aliada com tecnologia de ponta!</p>`;
            }, 500);
        }
    };

    // Adicionar listener touch para mobile no lugar mágico
    playArea.addEventListener("touchstart", (e) => {
        e.preventDefault();
        playArea.onmousedown(e);
    });
}
