function calcularValores() {
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);
    let ps = parseInt(document.getElementById('ps').value);
    let pd = parseInt(document.getElementById('pd').value);
    
    let imc = (peso / (altura * altura)).toFixed(2);
    let pam = ((2 * pd) + ps) / 3;
    
    let imcClasificacion = "";
    if (imc < 18.5) imcClasificacion = "Bajo peso";
    else if (imc < 24.9) imcClasificacion = "Peso normal";
    else if (imc < 29.9) imcClasificacion = "Sobrepeso";
    else imcClasificacion = "Obesidad";
    
    // Guardar la valoración en localStorage
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    let nuevaValoracion = {
        nombre: nombre,
        edad: edad,
        peso: peso,
        altura: altura,
        imc: imc,
        imcClasificacion: imcClasificacion,
        pam: pam.toFixed(2),
        neurologico: document.getElementById('neurologico').value,
        respiratorio: document.getElementById('respiratorio').value,
        musculo: document.getElementById('musculo').value,
        piel: document.getElementById('piel').value
    };
    historial.push(nuevaValoracion);
    localStorage.setItem('historial', JSON.stringify(historial));

    // Mostrar los resultados
    document.getElementById('resultado').innerHTML = 
        `<p><strong>Nombre:</strong> ${nombre}</p>
         <p><strong>Edad:</strong> ${edad} años</p>
         <p><strong>Peso:</strong> ${peso} kg</p>
         <p><strong>Altura:</strong> ${altura} m</p>
         <p><strong>IMC:</strong> ${imc} (${imcClasificacion})</p>
         <p><strong>Presión Arterial Media:</strong> ${pam.toFixed(2)}</p>
         <p><strong>Estado Neurológico:</strong> ${document.getElementById('neurologico').value}</p>
         <p><strong>Saturación de Oxígeno:</strong> ${document.getElementById('respiratorio').value}%</p>
         <p><strong>Movilidad:</strong> ${document.getElementById('musculo').value}</p>
         <p><strong>Estado de la piel:</strong> ${document.getElementById('piel').value}</p>`;
}
// Recuperar el historial de valoraciones de localStorage y mostrarlas
window.onload = function() {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    let listaHistorial = document.getElementById('listaHistorial');

    // Si hay valoraciones en el historial, las mostramos
    if (historial.length > 0) {
        historial.forEach((valoracion, index) => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
                <p><strong>Nombre:</strong> ${valoracion.nombre}</p>
                <p><strong>Edad:</strong> ${valoracion.edad} años</p>
                <p><strong>Peso:</strong> ${valoracion.peso} kg</p>
                <p><strong>Altura:</strong> ${valoracion.altura} m</p>
                <p><strong>IMC:</strong> ${valoracion.imc} (${valoracion.imcClasificacion})</p>
                <p><strong>Presión Arterial Media:</strong> ${valoracion.pam}</p>
                <p><strong>Estado Neurológico:</strong> ${valoracion.neurologico}</p>
                <p><strong>Saturación de Oxígeno:</strong> ${valoracion.respiratorio}%</p>
                <p><strong>Movilidad:</strong> ${valoracion.musculo}</p>
                <p><strong>Estado de la piel:</strong> ${valoracion.piel}</p>
            `;
            listaHistorial.appendChild(listItem);
        });
    } else {
        listaHistorial.innerHTML = "<p>No hay valoraciones registradas.</p>";
    }
};

document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("user_XXXXXXX"); // Reemplaza con tu User ID de EmailJS
    
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar recarga de la página
    
        emailjs.sendForm("service_au421im", "template_56vf26b", this)
            .then(function() {
                document.getElementById("mensajeExito").style.display = "block";
            }, function(error) {
                alert("Error al enviar el mensaje: " + JSON.stringify(error));
            });
                });
        });
   
   // Función para limpiar el historial de valoraciones
function limpiarHistorial() {
    if (confirm("¿Estás seguro de que deseas borrar todo el historial?")) {
        localStorage.removeItem("historial"); // Elimina del almacenamiento local
        actualizarHistorial(); // Refrescar la lista de historial
        document.getElementById("listaHistorial").innerHTML = ""; // Limpia la UI
        alert("Historial borrado correctamente.");
    }
}

// Función para cargar y mostrar el historial
function actualizarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    let lista = document.getElementById("listaHistorial");

    lista.innerHTML = ""; // Limpiar antes de volver a mostrar

    historial.forEach((valoracion, index) => {
        let item = document.createElement("li");
        item.textContent = `${index + 1}. ${valoracion.nombre} - IMC: ${valoracion.imc} (${valoracion.imcClasificacion})`;
        lista.appendChild(item);
    });
}

// Cargar historial cuando la página cargue
document.addEventListener("DOMContentLoaded", function () {
    actualizarHistorial();
});
