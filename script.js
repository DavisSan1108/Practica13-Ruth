// Generar la tabla de calificaciones
function generarTablaCalificaciones() {
    const tablaDiv = document.getElementById('tabla-calificaciones');
    const tabla = document.createElement('table');
    const cabecera = document.createElement('tr');
    
    // Crear cabecera
    for (let i = 0; i <= 3; i++) {
        const th = document.createElement('th');
        th.textContent = i === 0 ? "Alumno" : `Parcial ${i}`;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    // Crear las filas con calificaciones aleatorias
    for (let i = 1; i <= 10; i++) {
        const fila = document.createElement('tr');
        const tdNombre = document.createElement('td');
        tdNombre.textContent = `Alumno ${i}`;
        fila.appendChild(tdNombre);

        for (let j = 1; j <= 3; j++) {
            const td = document.createElement('td');
            const nota = (Math.random() * 5 + 5).toFixed(1);  // Genera notas aleatorias entre 5.0 y 10.0
            td.textContent = nota;
            fila.appendChild(td);
        }
        tabla.appendChild(fila);
    }

    tablaDiv.appendChild(tabla);
}

// Calcular resultados
function calcularResultados() {
    const tabla = document.querySelector('table');
    const filas = tabla.querySelectorAll('tr:not(:first-child)');
    let resultados = '';
    let sumas = [];
    let reprobados = 0;

    // Calcular promedios y otros resultados
    filas.forEach((fila, index) => {
        const celdas = fila.querySelectorAll('td:not(:first-child)');
        let suma = 0;
        let count = 0;

        celdas.forEach((celda) => {
            const valor = parseFloat(celda.textContent);
            suma += valor;
            if (valor < 7) reprobados++;  // Contar parciales reprobados
            count++;
        });

        const promedio = (suma / count).toFixed(1);
        sumas.push({ alumno: `Alumno ${index + 1}`, promedio: promedio });
    });

    const promedios = sumas.map(s => parseFloat(s.promedio));
    const maxPromedio = Math.max(...promedios);
    const minPromedio = Math.min(...promedios);

    resultados += `<p>Promedio más alto: ${maxPromedio}</p>`;
    resultados += `<p>Promedio más bajo: ${minPromedio}</p>`;
    resultados += `<p>Parciales reprobados (< 7.0): ${reprobados}</p>`;

    // Distribución de calificaciones
    const distribucion = {
        '0-5.9': 0,
        '6.0-6.9': 0,
        '7.0-7.9': 0,
        '8.0-8.9': 0,
        '9.0-10': 0
    };

    promedios.forEach((promedio) => {
        if (promedio < 6) distribucion['0-5.9']++;
        else if (promedio < 7) distribucion['6.0-6.9']++;
        else if (promedio < 8) distribucion['7.0-7.9']++;
        else if (promedio < 9) distribucion['8.0-8.9']++;
        else distribucion['9.0-10']++;
    });

    resultados += `<h3>Distribución de calificaciones</h3>`;
    for (let rango in distribucion) {
        resultados += `<p>${rango}: ${distribucion[rango]} alumnos</p>`;
    }

    document.getElementById('resultados').innerHTML = resultados;
}

// Inicializar la tabla al cargar la página
window.onload = generarTablaCalificaciones;
