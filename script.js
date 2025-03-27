// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('assessmentForm');

    // Show/hide follow-up questions
    function toggleFollowUp(elementId, show) {
        const element = document.getElementById(elementId);
        if (element) element.classList.toggle('hidden', !show);
    }

    // Calculate frequency (e.g., respiratory issues)
    function calculateFrequency() {
        const problemas = document.querySelector('input[name="problemas_respiratorios"]')?.value || 0;
        const resultado = document.getElementById('frecuencia_resultado');
        if (problemas > 0 && resultado) {
            const frecuenciaMensual = (problemas / 6).toFixed(2);
            resultado.textContent = ` (Aproximadamente ${frecuenciaMensual} veces por mes)`;
        } else if (resultado) {
            resultado.textContent = '';
        }
    }

    // Auto-fill smoking-related questions
    function updateSmokingRelated() {
        const fuma = document.querySelector('input[name="fuma"]:checked')?.value;
        if (fuma === 'No') {
            const humoAmbiente = document.querySelector('input[name="humo_ambiente"][value="No"]');
            if (humoAmbiente) humoAmbiente.checked = true;
            const adiccionesTabaco = document.querySelector('input[name="adicciones_tabaco"][value="No"]');
            if (adiccionesTabaco) adiccionesTabaco.checked = true;
        }
    }

    // Auto-fill family history
    function updateFamilyHistory() {
        const antecedentes = document.querySelector('input[name="antecedentes_respiratorios"]:checked')?.value;
        if (antecedentes) {
            const familiaEnfermedades = document.querySelector('input[name="familia_enfermedades_respiratorios"]');
            if (familiaEnfermedades) familiaEnfermedades.value = antecedentes === 'Sí' ? 'Respiratorias' : '';
        }
    }

    // Auto-fill alcohol-related questions
    function updateAlcoholRelated() {
        const alcohol = document.querySelector('input[name="consume_alcohol"]:checked')?.value;
        if (alcohol) {
            const alcoholNutricion = document.querySelector('input[name="alcohol_nutricion"][value="' + alcohol + '"]');
            if (alcoholNutricion) alcoholNutricion.checked = true;
            const factoresEmocionales = document.querySelector('input[name="factores_emocionales_alcohol"]');
            if (factoresEmocionales) factoresEmocionales.checked = alcohol === 'Sí';
        }
    }

    // Auto-fill gender-related questions
    function updateGenderRelated() {
        const sexo = document.querySelector('select[name="sexo"]').value;
        if (sexo) {
            const soyQuien = document.querySelector('input[name="se_quien_soy"]');
            if (soyQuien) soyQuien.value = sexo === 'M' ? 'Hombre' : 'Mujer';
            const comportoComo = document.querySelector('input[name="comporto_como"]');
            if (comportoComo) comportoComo.value = sexo === 'M' ? 'Hombre' : 'Mujer';
        }
    }

    // Handle checkbox for "Otros" in spiritual beliefs
    function toggleOtrosCreencias() {
        const otrosCheckbox = document.querySelector('input[name="creencias"][value="Otros"]');
        const otrosInput = document.getElementById('creencias_otros');
        if (otrosCheckbox && otrosInput) {
            otrosInput.classList.toggle('hidden', !otrosCheckbox.checked);
        }
    }

    // Calcular valores (IMC y PAM)
    function calcularValores(data) {
        let peso = parseFloat(data.peso) || 0;
        let altura = parseFloat(data.altura) || 0;
        let ps = parseInt(data.ps) || 0;
        let pd = parseInt(data.pd) || 0;

        if (peso && altura) {
            data.imc = (peso / (altura * altura)).toFixed(2);
            data.imcClasificacion = "";
            data.imcColor = "";
            data.imcEmoji = "";

            if (data.imc < 18.5) {
                data.imcClasificacion = "Por debajo del peso normal";
                data.imcColor = "blue";
                data.imcEmoji = "🔵";
            } else if (data.imc < 24.9) {
                data.imcClasificacion = "Peso saludable";
                data.imcColor = "green";
                data.imcEmoji = "🟢";
            } else if (data.imc < 29.9) {
                data.imcClasificacion = "Sobrepeso";
                data.imcColor = "orange";
                data.imcEmoji = "🟠";
            } else if (data.imc < 34.9) {
                data.imcClasificacion = "Obesidad I";
                data.imcColor = "red";
                data.imcEmoji = "🔴";
            } else if (data.imc < 39.9) {
                data.imcClasificacion = "Obesidad II";
                data.imcColor = "purple";
                data.imcEmoji = "🟣";
            } else {
                data.imcClasificacion = "Obesidad III";
                data.imcColor = "darkviolet";
                data.imcEmoji = "🟪";
            }
        }

        if (ps && pd) {
            data.pam = ((2 * pd) + ps) / 3).toFixed(2);
        }

        return data;
    }

    // Event listeners for dynamic updates and submission
    if (form) {
        form.addEventListener('change', (e) => {
            const target = e.target;
            if (target.name === 'cambios_respiracion') toggleFollowUp('q1_followup', target.value === 'Sí');
            if (target.name === 'medicamentos_respiratorios') toggleFollowUp('q3_followup', target.value === 'Sí');
            if (target.name === 'fuma') {
                toggleFollowUp('q4_followup', target.value === 'Sí');
                updateSmokingRelated();
            }
            if (target.name === 'antecedentes_respiratorios') {
                toggleFollowUp('q8_followup', target.value === 'Sí');
                updateFamilyHistory();
            }
            if (target.name === 'suplementos') toggleFollowUp('q14_followup', target.value === 'Sí');
            if (target.name === 'consume_alcohol') {
                toggleFollowUp('q12_followup', target.value === 'Sí');
                updateAlcoholRelated();
            }
            if (target.name === 'sexo') updateGenderRelated();
            if (target.name === 'problemas_respiratorios') calculateFrequency();
            if (target.name === 'creencias' && target.value === 'Otros') toggleOtrosCreencias();
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            let data = Object.fromEntries(formData);

            // Calcular IMC y PAM
            data = calcularValores(data);

            // Solo logueamos aquí, el envío a Firebase está en el HTML
            console.log('Datos del formulario:', data);
        });
    }
});