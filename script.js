const API_KEY = "dc061f8ef4d68fa0fb8acf1530a58652";
const CIDADES = ['Rio de Janeiro', 'Itajaí','São Paulo','Belo Horizonte'];

async function buscarClima(cidade) {
    try{
        const resposta = await fetch (
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`
        );
        const dados = await resposta.json();
        return dados;
    } catch (erro){
        console.error("Erro ao buscar o clima:", erro);
    }
}

function criarCardClima (dados) {
    const card = document.createElement ("div");
    card.className = "card";

    card.innerHTML = `
        <h2 class="cidade">${dados.name}</h2>
            <div class="clima-info">
                <span class="temperatura">${Math.round(dados.main.temp)}ºC</span>
                <span class="condicao">${dados.weather[0].description} ${obterIcone(dados.weather[0].icon)}</span>
            </div>
    `;
    return card;
}

function obterIcone(codigoIcone) {
    const icones = {
        "01": "☀️", "02": "⛅", "03": "☁️", "04": "☁️",
        "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "❄️"
    };
    return icones[codigoIcone.slice(0, 2)] || "🌡️";
}

async function exibirDashboard() {
    const container = document.querySelector(".container");
    container.innerHTML = "<p>Carregando...</p>";

    try {
        container.innerHTML = ""; 

        for (const cidade of CIDADES) {
            const dadosClima = await buscarClima(cidade);
            if (dadosClima) {
                container.appendChild(criarCardClima(dadosClima));
            }
        }
    } catch (erro) {
        container.innerHTML = "<p>Erro ao carregar dados. Tente recarregar a página.</p>";
        console.error(erro);
    }
}

window.onload = exibirDashboard;