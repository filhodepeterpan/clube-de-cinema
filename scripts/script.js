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
    var select = document.getElementById("menu");
    var pagina = select.value;

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
                    componente.style.color = '#FFFFFF';
                })

                atualizaProgresso();
            }
        })
        .catch(error => {
            alert("Erro ao buscar o CEP.");
        });
}
