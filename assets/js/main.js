function pasajero(numero, nombre, apellido, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.numero = numero;
    this.ocupado = false;
    this.alerta = function() {
        let html = "";
        html += "<strong>Asiento N°" + numero + "</strong><br>";
        html += "<strong>RESERVADO</strong><br>";
        return "<div class='lista'>" + html + "</div>";
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
        let filas = new Array(2);
        for (let j = 0; j < filas.length; j++) {
            filas[j] = "<tr>";
            for (let i = j + 1; i <= this.asientos.length; i += filas.length) {
                let asiento = this.asientos[i - 1];
                if (asiento != undefined) {
                    filas[j] += "<td class='reservado' onclick='redirect(this)'>" + i + "</td>";
                } else {
                    filas[j] += "<td class='desocupado' onclick='redirect(this)'>" + i + "</td>";
                }
            }
        }
        return "<table>" + filas.reverse().join("</tr>") + "</table>";
    }

    this.form = function(numero) {
        let html = "";
        html += "<h2>Asiento N°" + numero + "</h2>";
        html += "<p>Nombre: <input id='nombre' type='text' placeholder='Nombre' required/></p>";
        html += "<p>Apellidos: <input id='apellido' type='text' placeholder='Apellidos' required></p>";
        html += "<p>DNI: <input id='dni' type='number' placeholder='Dni' required></p>";
        html += "<p><button class='btn1' type='submit' onclick='reservar()'>Reservar</button></p>";
        return "<form id='reservar'" + html + "</form>";
    }

    this.cancelar = function() {
        this.asientos[this.numAsiento - 1] = undefined;
    }

    this.buscar = function(dni) {
        for (var i in this.asientos) {
            if (this.asientos[i] != undefined && this.asientos[i].dni == dni) {
                this.asientoSelec = parseInt(i) + 1;
                return this.asientos[i];
            }
        }
        return undefined;
    };
}
var asientos = new asientos();
document.getElementById("asientos").innerHTML = asientos.crearTabla();

function redirect(event) {
    asientos.numAsiento = event.textContent;
    let estadoCelda = event.className;
    if (estadoCelda == "desocupado") {
        document.getElementById("registro").innerHTML = asientos.form(asientos.numAsiento);
    } else {
        document.getElementById("registro").innerHTML = asientos.asientos[asientos.numAsiento - 1].alerta() +
            "<p><button class='btn1' onclick='cancelarReserva()'>Cancelar Reserva</button></p>";
    }
}

function reservar() {
    localStorage.nombre = document.getElementById("nombre").value;
    localStorage.apellido = document.getElementById("apellido").value;
    localStorage.dni = document.getElementById("dni").value;
    if (localStorage.nombre != "" && localStorage.apellido != "" && localStorage.dni != "") {
        asientos.asientos[asientos.numAsiento - 1] = new pasajero(asientos.numAsiento, localStorage.nombre, localStorage.apellido, localStorage.dni); //se almacena en el array
        document.getElementById("asientos").innerHTML = asientos.crearTabla();
        limpiarInputs();
    }
}

function limpiarInputs() {
    document.getElementById("mostrar").innerHTML = "";
    document.getElementById("registro").innerHTML = "";
}

function cancelarReserva() {
    asientos.cancelar();
    document.getElementById("asientos").innerHTML = asientos.crearTabla();
    limpiarInputs();
}
