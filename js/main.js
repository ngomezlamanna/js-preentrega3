//js para index.html (inicio de sesion)

const formInicio = document.querySelector("#formIni"),
usuarioInicio = document.querySelector("#usuarioIni"),
contraseniaInicio = document.querySelector("#contraseniaIni"),
pFalso = document.querySelector("#usuarioFalso");

function ingresoSesion (usuarios) {
    let usuarioEncontrado = usuarios.find((usuario) => {
        return usuario.usuario == usuarioInicio.value && usuario.contrasenia == contraseniaInicio.value;
    })



    if (usuarioEncontrado) {
        location.href= "../html/productos.html"
    } else {
        document.querySelector('#usuarioFalso').innerHTML = "<strong style='color: red'>Usuario no registrado. ¡Regístrese!</strong>";

    }
    //OPERADOR "?"
    // usuarioEncontrado ? location.href= "../html/productos.html" : document.querySelector('#usuarioFalso').innerHTML = "<strong style='color: red'>Usuario no registrado. ¡Regístrese!</strong>";
}

function recuperarLs () {
    return JSON.parse (localStorage.getItem("usuarios"));
}

const usuarioLs = recuperarLs();

formInicio.addEventListener('submit', (e) => {
    e.preventDefault();
    ingresoSesion(usuarioLs);
});