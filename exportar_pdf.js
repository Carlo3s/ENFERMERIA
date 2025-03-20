// Función para exportar el historial de valoraciones a un archivo PDF
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

// Agregar botón de exportación en la página
document.addEventListener("DOMContentLoaded", function() {
    let botonExportar = document.createElement("button");
    botonExportar.textContent = "Exportar a PDF";
    botonExportar.style.marginTop = "10px";
    botonExportar.onclick = exportarHistorialPDF;
    document.getElementById("historial").appendChild(botonExportar);
});
