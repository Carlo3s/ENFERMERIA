function calcularValores() {
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);
    let ps = parseInt(document.getElementById('ps').value);
    let pd = parseInt(document.getElementById('pd').value);
    
    let imc = (peso / (altura * altura)).toFixed(2);
    let pam = ((2 * pd) + ps) / 3;
    
    let imcData = clasificarIMC(imc);
    
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    let nuevaValoracion = {
        nombre,
        edad,
        peso,
        altura,
        imc,
        imcClasificacion: imcData.clasificacion,
        pam: pam.toFixed(2),
        neurologico: document.getElementById('neurologico').value,
        respiratorio: document.getElementById('respiratorio').value,
        musculo: document.getElementById('musculo').value,
        piel: document.getElementById('piel').value
    };
    historial.push(nuevaValoracion);
    localStorage.setItem('historial', JSON.stringify(historial));

    document.getElementById('resultado').innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad} años</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>
        <p><strong>IMC:</strong> <span style="color: ${imcData.color};">${imc} (${imcData.clasificacion})</span></p>
        <p><strong>Presión Arterial Media:</strong> ${pam.toFixed(2)}</p>
        <p><strong>Estado Neurológico:</strong> ${document.getElementById('neurologico').value}</p>
        <p><strong>Saturación de Oxígeno:</strong> ${document.getElementById('respiratorio').value}%</p>
        <p><strong>Movilidad:</strong> ${document.getElementById('musculo').value}</p>
        <p><strong>Estado de la piel:</strong> ${document.getElementById('piel').value}</p>`;
}

function limpiarHistorial() {
    if (confirm("¿Estás seguro de que deseas borrar todo el historial?")) {
        localStorage.removeItem("historial");
        actualizarHistorial();
        document.getElementById("listaHistorial").innerHTML = "";
        alert("Historial borrado correctamente.");
    }
}

function actualizarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    let lista = document.getElementById("listaHistorial");
    lista.innerHTML = "";

    historial.forEach((valoracion, index) => {
        let item = document.createElement("li");
        item.textContent = `${index + 1}. ${valoracion.nombre} - IMC: ${valoracion.imc} (${valoracion.imcClasificacion})`;
        lista.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", actualizarHistorial);

function exportarHistorialPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let historial = document.getElementById("listaHistorial").innerHTML;
    
    if (historial.trim() === "") {
        alert("No hay historial para exportar.");
        return;
    }
    
    doc.setFont("helvetica");
    doc.setFontSize(14);
    doc.text("Historial de Valoraciones", 20, 20);
    
    let historialTexto = "";
    document.querySelectorAll("#listaHistorial li").forEach((item, index) => {
        historialTexto += `${index + 1}. ${item.innerText}\n\n`;
    });
    
    doc.setFontSize(12);
    doc.text(historialTexto, 20, 30);
    
    doc.save("Historial_Valoraciones.pdf");
}

function clasificarIMC(imc) {
    if (imc < 18.5) return { clasificacion: "Por debajo del peso normal", color: "blue" };
    if (imc >= 18.5 && imc < 24.9) return { clasificacion: "Peso saludable", color: "green" };
    if (imc >= 25 && imc < 29.9) return { clasificacion: "Sobrepeso", color: "orange" };
    if (imc >= 30 && imc < 34.9) return { clasificacion: "Obesidad I", color: "red" };
    if (imc >= 35 && imc < 39.9) return { clasificacion: "Obesidad II", color: "purple" };
    return { clasificacion: "Obesidad III", color: "darkviolet" };
}

document.addEventListener("DOMContentLoaded", function() {
    let botonExportar = document.createElement("button");
    botonExportar.textContent = "Exportar a PDF";
    botonExportar.style.marginTop = "10px";
    botonExportar.onclick = exportarHistorialPDF;
    document.getElementById("historial").appendChild(botonExportar);
});
