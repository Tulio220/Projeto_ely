(function () {
    var medicamentos = [];

    function inserir() {
    
        document.getElementById('legendaInserir').style.display = 'block';
        
        document.getElementById('legendaSalvar').style.display = 'none';
        var nomeMedicamento = getValue("nomeMedicamento");
        var dosagem = getValue("dosagem");
        var frequencia = getValue("frequencia");
        var dataInicio = getValue("dataInicio");
        var dataTermino = getValue("dataTermino");
        var instrucoes = getValue("instrucoes");

        if (nomeMedicamento && dosagem && frequencia && dataInicio && dataTermino && instrucoes) {
            var medicamento = {
                nomeMedicamento: nomeMedicamento,
                dosagem: dosagem,
                frequencia: frequencia,
                dataInicio: dataInicio,
                dataTermino: dataTermino,
                instrucoes: instrucoes
            };

            medicamentos.push(medicamento);

            limparCampos();
            listar();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

    function listar() {
        var tab = document.getElementById("tabelaCorpo");
        tab.innerHTML = "";

        for (var i in medicamentos) {
            tab.innerHTML += "<tr><td>" +
                medicamentos[i].nomeMedicamento +
                "</td><td>" +
                medicamentos[i].dosagem +
                "</td><td>" +
                medicamentos[i].frequencia +
                "</td><td>" +
                medicamentos[i].dataInicio +
                "</td><td>" +
                medicamentos[i].dataTermino +
                "</td><td>" +
                medicamentos[i].instrucoes +
                "</td><td>" +
                "<button onclick='excluir(" + i + ")'>Excluir</button>" +
                "</td></tr>";
        }
    }

    function excluir(i) {
        medicamentos.splice(i, 1);
        listar();
        Salvar(); 
    }

    function Salvar() {
        var dados = JSON.stringify(medicamentos);
        localStorage.setItem("dadosMedicamentos", dados);
        document.getElementById('legendaInserir').style.display = 'none';
        document.getElementById('legendaSalvar').style.display = 'block'
    }

    function Abrir() {
        var dados = localStorage.getItem("dadosMedicamentos");
        medicamentos = JSON.parse(dados) || [];
        listar();
    }

    function limparMedicamentos() {
        medicamentos = [];
        limparCampos();
        listar();
        Salvar(); 
    }

    function limparCampos() {
        var campos = ["nomeMedicamento", "dosagem", "frequencia", "dataInicio", "dataTermino", "instrucoes"];
        campos.forEach(function (campo) {
            document.getElementById(campo).value = "";
        });

        document.getElementById("nomeMedicamento").focus();
    }

    function getValue(id) {
        return document.getElementById(id).value;
    }

    window.addEventListener('load', function () {
        Abrir();
    
        
        window.inserir = inserir;
        window.listar = listar;
        window.Salvar = Salvar;
        window.Abrir = Abrir;
        window.excluir = excluir;
        window.limparMedicamentos = limparMedicamentos;
    });
})();
