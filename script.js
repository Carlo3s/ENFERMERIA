function calcularValores() {
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);
    let ps = parseInt(document.getElementById('ps').value);
    let pd = parseInt(document.getElementById('pd').value);

    if (!nombre || !edad || !peso || !altura || !ps || !pd) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let imc = (peso / (altura * altura)).toFixed(2);
    let pam = ((2 * pd) + ps) / 3;

    let imcClasificacion = "";
    let imcColor = "";
    let imcEmoji = "";

    if (imc < 18.5) {
        imcClasificacion = "Por debajo del peso normal";
        imcColor = "blue";
        imcEmoji = "🔵";
    } else if (imc < 24.9) {
        imcClasificacion = "Peso saludable";
        imcColor = "green";
        imcEmoji = "🟢";
    } else if (imc < 29.9) {
        imcClasificacion = "Sobrepeso";
        imcColor = "orange";
        imcEmoji = "🟠";
    } else if (imc < 34.9) {
        imcClasificacion = "Obesidad I";
        imcColor = "red";
        imcEmoji = "🔴";
    } else if (imc < 39.9) {
        imcClasificacion = "Obesidad II";
        imcColor = "purple";
        imcEmoji = "🟣";
    } else {
        imcClasificacion = "Obesidad III";
        imcColor = "darkviolet";
        imcEmoji = "🟪";
    }

    let valoracion = {
        nombre,
        edad,
        peso,
        altura,
        imc,
        imcClasificacion,
        pam: pam.toFixed(2),
        neurologico: document.getElementById('neurologico').value,
        respiratorio: document.getElementById('respiratorio').value,
        musculo: document.getElementById('musculo').value,
        piel: document.getElementById('piel').value
    };

    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(valoracion);
    localStorage.setItem('historial', JSON.stringify(historial));

    document.getElementById('resultado').innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad} años</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura} m</p>
        <p style="color:${imcColor};"><strong>IMC:</strong> ${imc} ${imcEmoji} (${imcClasificacion})</p>
        <p><strong>Presión Arterial Media:</strong> ${pam.toFixed(2)}</p>
    `;

    console.log("Historial actualizado:", historial);
}
