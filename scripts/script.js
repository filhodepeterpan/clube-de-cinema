const paginaInicial = document.getElementById("clube-de-cinema");

paginaInicial.addEventListener("mouseover", function(){
    paginaInicial.style.cursor = "pointer";

    paginaInicial.addEventListener("click", function(){
        window.location.href = "../index.html";
    })
})

let temaAlternativo = false;

function mudaTema(){
    const botoes = document.querySelectorAll("button");
    const creditos = document.getElementById("creditos");
    const footer = document.querySelector("footer");
    const iconePadrao = document.getElementById("github");
    const iconeTematico = document.getElementById("github2");

    const root = {
        "--cor-primaria" : "#FFFFFF",
        "--cor-secundaria" : "#B0B0B0",
        "--cor-terciaria" : "blue",
        "--cor-destaque" : "rgb(182, 14, 14)",
        "--cor-destaque-hover" : "rgb(150, 0, 0)",
        "--cor-input-aceito" : "rgb(26, 200, 26)",
        "--cor-fonte-padrao" : "#000000"
    };

    for (const [variavel, cor] of Object.entries(root)) {
        if (!temaAlternativo) {
            document.documentElement.style.setProperty(variavel, cor);
        } 
        else {
            document.documentElement.style.removeProperty(variavel);
        }
    }

    const corBotao = temaAlternativo ? "#000000" : "#FFFFFF";
    const corCreditos = temaAlternativo ? "var(--cor-destaque)" : "blue";
    const corFooter = temaAlternativo ? "#FFFFFF" : "#FFFFFF";
    const corBgFooter = temaAlternativo ? "var(--cor-terciaria)" : "#000000";
    const visibilidadeIconeTematico = temaAlternativo ? "none" : "inline";
    const visibilidadeIconePadrao = temaAlternativo ? "inline" : "none";

    botoes.forEach(botao => {
        botao.style.color = corBotao;
    })

    creditos.style.color = corCreditos;
    footer.style.color = corFooter;
    footer.style.backgroundColor = corBgFooter;
    iconeTematico.style.display = visibilidadeIconeTematico;
    iconePadrao.style.display = visibilidadeIconePadrao;

    temaAlternativo = !temaAlternativo;
}

const camposObrigatorios = document.querySelectorAll("input[required]");

camposObrigatorios.forEach(campo => {
    const label = campo.closest(".formulario-item").querySelector("label");

    label.innerHTML += "<b>*</b>";
});

document.addEventListener("DOMContentLoaded", function() {
    const progressoValor = document.querySelector(".progresso-valor");
    const progressoBarra = document.querySelector(".progresso");

    function atualizaProgresso() {
        const preenchidos = Array.from(camposObrigatorios).filter(campo => campo.value.trim() != "").length;
        const total = camposObrigatorios.length;
        const porcentagem = Math.round((preenchidos / total) * 100);

        progressoValor.textContent = `${porcentagem}%`;
        progressoBarra.style.background = `conic-gradient(var(--cor-destaque) ${porcentagem * 3.6}deg, grey 0deg)`;
    }

    camposObrigatorios.forEach(campo => {
        campo.addEventListener("input", atualizaProgresso);
    });

    window.atualizaProgresso = atualizaProgresso;
});

function mudaPagina(){
    const select = document.getElementById("menu");
    const pagina = select.value;

    if (pagina){
        window.location.href = pagina;
    }

}

function validaTelefone(telefone){
        telefone.value = telefone.value.replace(/[^0-9()\- ]/g, '');

        const numeroDeTelefone = telefone.value.replace(/[^0-9]/g, '');

        return numeroDeTelefone;
}

function pegaEndereco(){
    const cep = document.getElementById("cep").value.replace("-", "");
    const rua = document.getElementById("rua");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado")

    if (cep.length !== 8){
        alert("Por favor, digite um CEP válido.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro){
                alert("CEP não encontrado.");
            } 
            
            else{
                const componentesDeEndereco = [rua, bairro, cidade, estado];

                rua.value = data.logradouro;
                bairro.value = data.bairro;
                cidade.value = data.localidade;
                estado.value = data.uf

                componentesDeEndereco.forEach(componente => {
                    componente.style.color = 'var(--cor-fonte-padrao)';
                })

                atualizaProgresso();
            }
        })
        .catch(error => {
            alert("Erro ao buscar o CEP.");
        });
}
