$(document).ready(function () {
  let presupuesto = 0;
  let gastos = [];
  let saldo = 0;

  $("#calcularBtn").click(() => {
    if ($("#presupuestoInput").val() !== "") {
      presupuesto = parseInt($("#presupuestoInput").val());
    } else {
      alert("Debe ingresar un valor para continuar");
    }
    $("#mostrarPresupuesto").attr("data-value", presupuesto);
    $("#mostrarPresupuesto").html("$" + presupuesto.toLocaleString("es-CL"));
    $("#presupuestoInput").val("");

    calcularSaldo();
  });

  $("#anadirGastoBtn").click(() => {
    var nombreGasto = $("#nombreGastoInput").val().trim();
    var cantidadGasto = parseInt($("#cantidadGastoInput").val());

    if (nombreGasto === "") {
      alert("Ingrese un nombre de gasto válido.");
    } else if (isNaN(cantidadGasto) || cantidadGasto <= 0) {
      alert("Ingrese un monto válido (mayor a 0 y menor al saldo actual).");
    } else if (cantidadGasto > saldo) {
      alert("El monto del gasto no puede superar el saldo del presupuesto.");
    } else {
      gastos.push({ nombre: nombreGasto, monto: cantidadGasto });
      calcularSaldo();
      $("#nombreGasto").val("");
      $("#cantidadGasto").val("");
      dibujarGastos();
    }
  });

  function dibujarGastos() {
    $("#listadoGastos").html("");
    gastos.forEach((gasto, index) => {
      $("#listadoGastos").append(
        `<tr>
          <td>${gasto.nombre}</td>
          <td>$${gasto.monto.toLocaleString("es-CL")}</td>
          <td> 
            <i class="fa-solid fa-trash-can btn btn-primary" data-index="${index}"></i>
          </td>
        </tr>`
      );
    });
  }

  function calcularSaldo() {
    let totalGastos = 0;
    gastos.forEach((gasto) => {
      totalGastos += gasto.monto;
    });
    saldo = presupuesto - totalGastos;
    $("#mostrarGastos").html("$" + totalGastos.toLocaleString("es-CL"));
    $("#mostrarSaldo").html("$" + saldo.toLocaleString("es-CL"));
  }

  $("#listadoGastos").on("click", ".fa-trash-can", function () {
    const index = $(this).attr("data-index");
    gastos.splice(index, 1);
    calcularSaldo();
    dibujarGastos();
  });
});
