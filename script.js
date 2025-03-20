// Función para calcular valores y clasificar el IMC 
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
    
    let usuario = localStorage.getItem('usuarioActual') || 'defaultUser';
    
    let historial = JSON.parse(localStorage.getItem(`historial_${usuario}`)) || [];
    let nuevaValoracion = {
        nombre, edad, peso, altura,
        imc, imcClasificacion: imcData.clasificacion,
        pam: pam.toFixed(2),
        neurologico: document.getElementById('neurologico').value,
        respiratorio: document.getElementById('respiratorio').value,
        musculo: document.getElementById('musculo').value,
        piel: document.getElementById('piel').value
    };
    historial.push(nuevaValoracion);
    localStorage.setItem(`historial_${usuario}`, JSON.stringify(historial));

    document.getElementById('resultado').innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad} años</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>
        <p style="color:${imcData.color};"><strong>IMC:</strong> ${imc} ${imcData.emoji} (${imcData.clasificacion})</p>
        <p><strong>Presión Arterial Media:</strong> ${pam.toFixed(2)}</p>
    `;
    actualizarHistorial();
}

// Clasificación del IMC con colores y emojis
function clasificarIMC(imc) {
    if (imc < 18.5) return { clasificacion: "Bajo peso", color: "blue", emoji: "🔵" };
    if (imc < 24.9) return { clasificacion: "Peso saludable", color: "green", emoji: "🟢" };
    if (imc < 29.9) return { clasificacion: "Sobrepeso", color: "orange", emoji: "🟠" };
    if (imc < 34.9) return { clasificacion: "Obesidad I", color: "red", emoji: "🔴" };
    if (imc < 39.9) return { clasificacion: "Obesidad II", color: "purple", emoji: "🟣" };
    return { clasificacion: "Obesidad III", color: "darkviolet", emoji: "🟪" };
}

// Limpiar historial solo del usuario actual
function limpiarHistorial() {
    if (confirm("¿Seguro que quieres borrar el historial?")) {
        let usuario = localStorage.getItem('usuarioActual') || 'defaultUser';
        localStorage.removeItem(`historial_${usuario}`);
        actualizarHistorial();
        alert("Historial borrado correctamente.");
    }
}

// Mostrar historial del usuario actual
function actualizarHistorial() {
    let usuario = localStorage.getItem('usuarioActual') || 'defaultUser';
    let historial = JSON.parse(localStorage.getItem(`historial_${usuario}`)) || [];
    let lista = document.getElementById('listaHistorial');
    
    lista.innerHTML = "";
    historial.forEach((valoracion, index) => {
        let item = document.createElement("li");
        item.innerHTML = `
            <p><strong>${index + 1}. ${valoracion.nombre}</strong> - IMC: ${valoracion.imc} ${clasificarIMC(valoracion.imc).emoji} (${valoracion.imcClasificacion})</p>
        `;
        lista.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", actualizarHistorial);
