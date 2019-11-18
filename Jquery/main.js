
$(function () {

    var inputusuario = $('.inputusuario');
    var botaobuscar = $('.botaobuscar');
    var retorno = $('#retorno');
    var form = $('.form');
    var repositorios = $ ('.repositorios');
    var visitados = $ ('.visitados');




    form.on('submit', function (event) {
        event.preventDefault();

    });

     botaobuscar.on('click', function () {
            $.ajax({
                url: "https://api.github.com/users/" + inputusuario.val()
            }).done(function (data) {
                console.log(data)

                var resultado = "<h1> Nome:" + data.name + "</h1> "
                resultado += "<h2>Nick:" + data.login + "</h2>"
                resultado += "<img src='" + data.avatar_url + "'/>"
                resultado += "<h3>Localização:" + data.location + "</h3>"
                resultado += "<h3>Biografia:" + data.bio + "</h3>"

                repositorio(resultado, inputusuario)
                visitado(resultado, inputusuario) 

                retorno.html(resultado);
            }).error(function () {
                retorno.text('Usuário não encontrado')
            }).always(function () {
                form.fadeIn();
            });
        });
        function repositorio(resultado, inputusuario) {
            repositorios.on('click', function () {
            $.ajax({
                url: "https://api.github.com/users/" + inputusuario.val() + "/repos"
            }).done(function (data) {
                console.log(data)

                $.each(data, function (key,objeto) {
                    console.log(objeto);
                    resultado += "<br/><a href='" + objeto.html_url + "'>" + objeto.name + "</a>"
                });
                retorno.html(resultado);
            }).error(function () {
                retorno.text('Usuário não encontrado')
            }).always(function () {
                form.fadeIn();
            });
        });
    }


    function visitado(resultado, inputusuario) {
        visitados.on('click', function () {
            $.ajax({
                url: "https://api.github.com/users/" + inputusuario.val() + "/starred"
            }).done(function (data) {
                console.log(data)

                $.each(data, function (key,objeto) {
                    console.log(objeto);
                    resultado += "<br/><a href='" + objeto.clone_url + "'>" + objeto.full_name + "</a>"
                });
                retorno.html(resultado);
            }).error(function () {
                retorno.text('Usuário não encontrado')
            }).always(function () {
                form.fadeIn();
            });
        });
    }
});
