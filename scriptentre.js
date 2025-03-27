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
            // Propagate to "Adicciones" in Actividad y Reposo
            const adiccionesTabaco = document.querySelector('input[name="adicciones_tabaco"][value="No"]');
            if (adiccionesTabaco) adiccionesTabaco.checked = true;
        }
    }

    // Auto-fill family history
    function updateFamilyHistory() {
        const antecedentes = document.querySelector('input[name="antecedentes_respiratorios"]:checked')?.value;
        if (antecedentes) {
            // Propagate to "Historia de Salud Familiar" in Actividad y Reposo
            const familiaEnfermedades = document.querySelector('input[name="familia_enfermedades_respiratorias"]');
            if (familiaEnfermedades) familiaEnfermedades.value = antecedentes === 'Sí' ? 'Respiratorias' : '';
        }
    }

    // Auto-fill alcohol-related questions
    function updateAlcoholRelated() {
        const alcohol = document.querySelector('input[name="consume_alcohol"]:checked')?.value;
        if (alcohol) {
            // Propagate to "Consumo de alcohol" in Nutrición
            const alcoholNutricion = document.querySelector('input[name="alcohol_nutricion"][value="' + alcohol + '"]');
            if (alcoholNutricion) alcoholNutricion.checked = true;
            // Affect "Factores emocionales" in Autoconcepto
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

    // Event listeners for dynamic updates
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

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Datos del formulario:', Object.fromEntries(formData));
        alert('Formulario enviado. Revisa la consola para los datos.');
        // Add backend integration here if needed
    });
});