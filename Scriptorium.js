    // Firebase conf
    const firebaseConfig = {
        apiKey: "AIzaSyD2w7EPPFUk3tiBD9CZlnvlm24XQy7IaOg",
        authDomain: "scriptoriumdb.firebaseapp.com",
        databaseURL: "https://scriptoriumdb-default-rtdb.firebaseio.com",
        projectId: "scriptoriumdb",
        storageBucket: "scriptoriumdb.appspot.com",
        messagingSenderId: "212770434544",
        appId: "1:212770434544:web:3c2d08027acdd658b8c135"
    };

    // ini Firebase
    const app = initializeApp(firebaseConfig);

    // Variáveis para armazenar informações sobre a navegação do usuário
    var paginaInicial = window.location.href;
    var tempoInicio = new Date();
    var acoesRealizadas = [];

    // Função para registrar uma ação do usuário
    function registrarAcao(nomeAcao) {
        var tempoAcao = new Date();
        var duracaoAcao = tempoAcao - tempoInicio;

        acoesRealizadas.push({
            acao: nomeAcao,
            duracao: duracaoAcao
        });

        tempoInicio = tempoAcao;
    }

    // Enviar dados para o Firebase quando o usuário sair da página
    window.onbeforeunload = function() {
        var tempoTotal = new Date() - tempoInicio;
        acoesRealizadas.push({
            acao: "Tempo Total na Página",
            duracao: tempoTotal
        });

        // Envie os dados para o Firebase
        var database = app.database();
        var referenciaUsuarios = database.ref("usuarios");
        referenciaUsuarios.push({
            paginaInicial: paginaInicial,
            acoes: acoesRealizadas
        });
    };