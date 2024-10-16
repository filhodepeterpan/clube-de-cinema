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

                componentesDeEndereco.forEach(componenteDeEndereco => {
                    componenteDeEndereco.style.color = 'white';
                })

            }
        })
        .catch(error => {
            alert("Erro ao buscar o CEP.");
        });
}

