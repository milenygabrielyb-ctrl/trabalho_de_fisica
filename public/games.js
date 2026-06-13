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
    document.getElementById("titulo").innerText = "Gestão da Água";

    const SVGS = {
        pipe: `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M10,0 L30,0 L30,10 L40,10 L40,30 L30,30 L30,40 L10,40 L10,30 L0,30 L0,10 L10,10 Z" fill="#64748b"/><path d="M15,5 L25,5 L25,10 L35,10 L35,20 L5,20 L5,10 L15,10 Z" fill="#94a3b8"/></svg>`,
        houseBlue: `<svg viewBox="0 0 40 40" width="45" height="45"><polygon points="20,5 35,20 35,35 5,35 5,20" fill="#cbd5e1" stroke="#334155" stroke-width="2"/><polygon points="0,20 20,0 40,20" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/><rect x="15" y="22" width="10" height="13" fill="#64748b"/></svg>`,
        houseRed: `<svg viewBox="0 0 40 40" width="45" height="45"><polygon points="20,5 35,20 35,35 5,35 5,20" fill="#cbd5e1" stroke="#334155" stroke-width="2"/><polygon points="0,20 20,0 40,20" fill="#ef4444" stroke="#7f1d1d" stroke-width="2"/><rect x="15" y="22" width="10" height="13" fill="#64748b"/></svg>`,
        dropDirty: `<svg viewBox="0 0 30 40" width="35" height="45"><path d="M15,0 C15,0 0,15 0,25 C0,33 6.7,40 15,40 C23.3,40 30,33 30,25 C30,15 15,0 15,0 Z" fill="#8c5835" /></svg>`,
        dropClean: `<svg viewBox="0 0 30 40" width="35" height="45"><path d="M15,0 C15,0 0,15 0,25 C0,33 6.7,40 15,40 C23.3,40 30,33 30,25 C30,15 15,0 15,0 Z" fill="#22c55e" /></svg>`,
        bacteria: `<svg viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="12" fill="#8b5cf6" /><circle cx="10" cy="10" r="5" fill="#a78bfa" /><circle cx="30" cy="10" r="4" fill="#a78bfa" /><circle cx="10" cy="30" r="4" fill="#a78bfa" /><circle cx="30" cy="30" r="6" fill="#a78bfa" /><circle cx="20" cy="5" r="3" fill="#a78bfa" /><circle cx="20" cy="35" r="3" fill="#a78bfa" /><circle cx="5" cy="20" r="3" fill="#a78bfa" /><circle cx="35" cy="20" r="3" fill="#a78bfa" /></svg>`
    };

    function resetPhase() {
        clearInterval(gameLoop);
        area.innerHTML = "";
    }

    function showTransition(msg, callback) {
        resetPhase();
        area.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;"><h2 style="color:#60a5fa;text-shadow:1px 1px 2px #000;text-align:center;">${msg}</h2></div>`;
        setTimeout(callback, 2500);
    }

    function finishGame() {
        resetPhase();
        area.innerHTML = `<h2 style="color:#22c55e; margin-bottom: 10px;">🎉 Missão Cumprida: Nível Singapura!</h2>
        <div style="text-align:left; max-width:500px; margin:auto; background:rgba(0,0,0,0.5); padding:15px; border-radius:10px;">
            <p style="margin-top:0; font-size:18px;"><strong>Power-ups conquistados:</strong></p>
            <ul style="font-size:18px; list-style:none; padding:0; margin:0;">
                <li style="margin-bottom:5px;">Evita desperdício</li>
                <li style="margin-bottom:5px;">Reduz perdas públicas</li>
                <li style="margin-bottom:5px;">Garante segurança</li>
                <li>Melhora o planejamento urbano</li>
            </ul>
        </div>`;
    }

    function iniciarFase1() {
        let score = 0;
        let active = true;
        const ui = document.createElement("div");
        ui.innerHTML = `<h3>Fase 1: Caça-vazamentos</h3><p style="margin:5px 0;">Conserte: <strong id="p1">0</strong>/8</p>`;
        area.appendChild(ui);
        const playArea = document.createElement("div");
        playArea.style.position = "relative"; playArea.style.width = "100%"; playArea.style.height = "220px";
        area.appendChild(playArea);

        for (let i = 0; i < 10; i++) {
            const pipe = document.createElement("div");
            pipe.innerHTML = SVGS.pipe; pipe.style.position = "absolute"; pipe.style.cursor = "pointer";
            pipe.style.left = Math.floor(Math.random() * 85) + "%"; pipe.style.top = Math.floor(Math.random() * 70) + "%";
            pipe.style.filter = "grayscale(100%)"; pipe.dataset.leaking = "false";

            pipe.onmousedown = () => {
                if (pipe.dataset.leaking === "true" && active) {
                    pipe.dataset.leaking = "false"; pipe.style.filter = "grayscale(100%)";
                    score++; document.getElementById("p1").innerText = score;
                    if (score >= 8) { active = false; showTransition("Parabéns! Fase concluída.", iniciarFase2); }
                }
            };
            playArea.appendChild(pipe);
        }

        gameLoop = setInterval(() => {
            if(!active) return;
            const pipes = playArea.children;
            const p = pipes[Math.floor(Math.random() * pipes.length)];
            if (p.dataset.leaking === "false") {
                p.dataset.leaking = "true";
                p.style.filter = "drop-shadow(0 0 10px #3b82f6) hue-rotate(180deg) brightness(200%)";
            }
        }, 650);
    }

    function iniciarFase2() {
        let score = 0; let active = true;
        const ui = document.createElement("div");
        ui.innerHTML = `<h3>Fase 2: Mestre do consumo</h3><p style="margin:5px 0;">Casas ajustadas: <strong id="p2">0</strong>/8</p>`;
        area.appendChild(ui);
        const playArea = document.createElement("div");
        playArea.style.position = "relative"; playArea.style.width = "100%"; playArea.style.height = "220px";
        area.appendChild(playArea);

        for (let i = 0; i < 8; i++) {
            const house = document.createElement("div");
            house.innerHTML = SVGS.houseBlue; house.style.position = "absolute"; house.style.cursor = "pointer";
            house.style.left = Math.floor(Math.random() * 85) + "%"; house.style.top = Math.floor(Math.random() * 70) + "%";
            house.dataset.high = "false";

            house.onmousedown = () => {
                if (house.dataset.high === "true" && active) {
                    house.dataset.high = "false"; 
                    house.innerHTML = SVGS.houseBlue;
                    house.style.filter = "none";
                    score++; document.getElementById("p2").innerText = score;
                    if (score >= 8) { active = false; showTransition("Consumo controlado!", iniciarFase3); }
                }
            };
            playArea.appendChild(house);
        }

        gameLoop = setInterval(() => {
            if(!active) return;
            const houses = playArea.children;
            const h = houses[Math.floor(Math.random() * houses.length)];
            if (h.dataset.high === "false") {
                h.dataset.high = "true";
                h.innerHTML = SVGS.houseRed;
                h.style.filter = "drop-shadow(0 0 15px red) sepia(50%) saturate(200%)";
            }
        }, 800);
    }

    function iniciarFase3() {
        let score = 0; let active = true;
        const ui = document.createElement("div");
        ui.innerHTML = `<h3>Fase 3: Reuso inteligente</h3><p style="margin:5px 0;">Água tratada: <strong id="p3">0</strong>/6</p>`;
        area.appendChild(ui);
        const playArea = document.createElement("div");
        playArea.style.position = "relative"; playArea.style.width = "100%"; playArea.style.height = "220px";
        area.appendChild(playArea);

        gameLoop = setInterval(() => {
            if(!active) return;
            const drop = document.createElement("div");
            drop.innerHTML = SVGS.dropDirty; drop.style.position = "absolute"; drop.style.cursor = "pointer";
            drop.style.left = Math.floor(Math.random() * 85) + "%"; drop.style.top = "0px";
            playArea.appendChild(drop);

            drop.onmousedown = () => {
                if(!active) return;
                drop.innerHTML = SVGS.dropClean;
                setTimeout(() => { if (playArea.contains(drop)) drop.remove(); }, 200);
                score++; document.getElementById("p3").innerText = score;
                if (score >= 6) { active = false; showTransition("Reuso ativado!", iniciarFase4); }
            };

            let top = 0;
            const fall = setInterval(() => {
                if(!active || !playArea.contains(drop)) { clearInterval(fall); return; }
                top += 3; drop.style.top = top + "px";
                if (top > 250) { clearInterval(fall); drop.remove(); }
            }, 50);
        }, 1200);
    }

    function iniciarFase4() {
        let score = 0; let active = true;
        const ui = document.createElement("div");
        ui.innerHTML = `<h3>Fase 4: Água segura</h3><p style="margin:5px 0;">Vírus eliminados: <strong id="p4">0</strong>/8</p>`;
        area.appendChild(ui);
        const playArea = document.createElement("div");
        playArea.style.position = "relative"; playArea.style.width = "100%"; playArea.style.height = "220px";
        playArea.style.borderBottom = "15px solid #3b82f6";
        area.appendChild(playArea);

        gameLoop = setInterval(() => {
            if(!active) return;
            const bacteria = document.createElement("div");
            bacteria.innerHTML = SVGS.bacteria; bacteria.style.position = "absolute"; bacteria.style.cursor = "pointer";
            bacteria.style.left = Math.floor(Math.random() * 85) + "%"; bacteria.style.top = "0px";
            playArea.appendChild(bacteria);

            bacteria.onmousedown = () => {
                if(!active) return;
                bacteria.remove();
                score++; document.getElementById("p4").innerText = score;
                if (score >= 8) { active = false; showTransition("Alerta! Chefão detectado!", iniciarBoss); }
            };

            let top = 0;
            const fall = setInterval(() => {
                if(!active || !playArea.contains(bacteria)) { clearInterval(fall); return; }
                top += 4; bacteria.style.top = top + "px";
                if (top > 230) { clearInterval(fall); bacteria.remove(); }
            }, 50);
        }, 1000);
    }

    function iniciarBoss() {
        let tempo = 15; let active = true;
        const ui = document.createElement("div");
        ui.innerHTML = `<h3 style="color:#facc15;">Boss: Singapura!</h3><p style="margin:5px 0;">Resolva os problemas rápido! Tempo: <strong id="bossTime">${tempo}</strong>s</p>`;
        area.appendChild(ui);
        const playArea = document.createElement("div");
        playArea.style.position = "relative"; playArea.style.width = "100%"; playArea.style.height = "220px";
        area.appendChild(playArea);

        gameLoop = setInterval(() => {
            if(!active) return;
            const tipo = Math.floor(Math.random() * 3);
            const el = document.createElement("div");
            el.style.position = "absolute"; el.style.cursor = "pointer";
            el.style.left = Math.floor(Math.random() * 85) + "%";

            if (tipo === 0) {
                el.innerHTML = SVGS.pipe; el.style.top = Math.floor(Math.random() * 70) + "%";
                el.style.filter = "drop-shadow(0 0 10px #3b82f6) hue-rotate(180deg) brightness(200%)";
                el.onmousedown = () => el.remove();
            } else if (tipo === 1) {
                el.innerHTML = SVGS.houseRed; el.style.top = Math.floor(Math.random() * 70) + "%";
                el.style.filter = "drop-shadow(0 0 15px red) sepia(50%) saturate(200%)";
                el.onmousedown = () => el.remove();
            } else {
                el.innerHTML = SVGS.bacteria; el.style.top = "0px";
                let top = 0;
                const fall = setInterval(() => {
                    if(!active || !playArea.contains(el)) { clearInterval(fall); return; }
                    top += 4; el.style.top = top + "px";
                    if(top > 250) { clearInterval(fall); el.remove(); }
                }, 50);
                el.onmousedown = () => { clearInterval(fall); el.remove(); };
            }
            playArea.appendChild(el);
        }, 600);

        const countdown = setInterval(() => {
            if(!active) { clearInterval(countdown); return; }
            tempo--; document.getElementById("bossTime").innerText = tempo;
            if (tempo <= 0) {
                active = false;
                clearInterval(countdown);
                finishGame();
            }
        }, 1000);
    }

    iniciarFase1();
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
