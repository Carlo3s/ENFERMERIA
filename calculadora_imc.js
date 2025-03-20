// Función para calcular el IMC y dar recomendaciones
function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value) / 100; // Convertir cm a metros
    
    if (isNaN(peso) || isNaN(altura) || altura <= 0 || peso <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }
    
    let imc = peso / (altura * altura);
    let categoria = "";
    let recomendaciones = "";
    
    if (imc < 18.5) {
        categoria = "Bajo peso";
        recomendaciones = "Aumenta tu ingesta calórica y consume alimentos ricos en proteínas y carbohidratos saludables.";
    } else if (imc >= 18.5 && imc < 24.9) {
        categoria = "Peso normal";
        recomendaciones = "Mantén una alimentación balanceada y realiza ejercicio regularmente.";
    } else if (imc >= 25 && imc < 29.9) {
        categoria = "Sobrepeso";
        recomendaciones = "Reduce el consumo de alimentos ultraprocesados y aumenta la actividad física diaria.";
    } else {
        categoria = "Obesidad";
        recomendaciones = "Consulta a un especialista para un plan de alimentación y ejercicio adecuado.";
    }
    
    document.getElementById("resultadoIMC").innerHTML = `
        <p>Tu IMC es: <strong>${imc.toFixed(2)}</strong></p>
        <p>Categoría: <strong>${categoria}</strong></p>
        <p>Recomendaciones: ${recomendaciones}</p>
    `;
}

// Agregar evento al botón
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcularIMC").addEventListener("click", calcularIMC);
});
