function pasajero(numero, nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.numero = numero;
    this.ocupado = false;
    this.alerta = function() {
        let srt = "";
        srt += "<strong>Asiento N°" + numero + "</strong><br>";
        srt += "<strong>RESERVADO</strong><br>";
        return "<div class='lista'>" + srt + "</div>";
    }
}

function asientos() {
    this.asientos = new Array(10);
    this.numAsiento = undefined;
    this.asientoSelec = -1;
    this.add = function(pasajero, numero) {
        this.asientos[numero] = pasajero;
    }
    this.crearTabla = function() {
        let fila = new Array(2);
        for (let j = 0; j < fila.length; j++) {
            fila[j] = "<tr>";
            for (let i = j + 1; i <= this.asientos.length; i += fila.length) {
                let asiento = this.asientos[i - 1];
                if (asiento != undefined) {
                    fila[j] += "<td class='reservado' onclick='redirect(this)'>" + i + "</td>";
                } else {
                    fila[j] += "<td class='desocupado' onclick='redirect(this)'>" + i + "</td>";
                }
            }
        }
        return "<table>" + fila.reverse().join("</tr>") + "</table>";
    }

    this.form = function(numero) {
        let srt = "";
        srt += "<h2>Asiento N°" + numero + "</h2>";
        srt += "<p>Nombre: <input id='nombre' type='text' placeholder='Nombre' required/></p>";
        srt += "<p>Apellidos: <input id='apellido' type='text' placeholder='Apellidos' required></p>";
        srt += "<p>DNI: <input id='dni' type='number' placeholder='Dni' required></p>";
        srt += "<p><button class='btn1' type='submit' onclick='reservar()'>Reservar</button></p>";
        return "<form id='reservar'" + srt + "</form>";
    }

    this.cancelar = function() {
        this.asientos[this.numAsiento - 1] = undefined;
    }
}
var asientos = new asientos();
$("#asientos").html(asientos.crearTabla());

function redirect(event) {
    asientos.numAsiento = event.textContent;
    let estadoCelda = event.className;
    if (estadoCelda == "desocupado") {
        $("#registro").html(asientos.form(asientos.numAsiento));
    } else {
        $("#registro").html(asientos.asientos[asientos.numAsiento - 1].alerta() +
                    "<p><button class='btn1' onclick='cancelarReserva()'>Cancelar Reserva</button></p>");
    }
}

function reservar() {
    let nombre = $("#nombre").value;
    let apellido = $("#apellido").value;
    let dni = $("#dni").value;
    if ( nombre != "" &&  apellido != "" &&  dni != "") {
        asientos.asientos[asientos.numAsiento - 1] = new pasajero(asientos.numAsiento,  nombre,  apellido,  dni);
        $("#asientos").html(asientos.crearTabla());
        limpiarInputs();
    }
}

function cancelarReserva() {
    asientos.cancelar();
    $("#asientos").html(asientos.crearTabla());
    limpiarInputs();
}

function limpiarInputs() {
    $("#mostrar").html("");
    $("#registro").html("");
}

