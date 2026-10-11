// ================== SLIDE (solo en index) ==================
const items = document.querySelectorAll('.slide-item');
const puntos = document.querySelectorAll('.punto');
let actual = 0;

function mostrarSlide(n) {
    items.forEach(i => i.classList.remove('activo'));
    puntos.forEach(p => p.classList.remove('activo'));
    items[n].classList.add('activo');
    puntos[n].classList.add('activo');
    actual = n;
}

if (items.length > 0) {
    puntos.forEach((p, i) => {
    p.addEventListener('click', () => mostrarSlide(i));
});

  // cambia solo cada 3 segundos
setInterval(() => {
    mostrarSlide((actual + 1) % items.length);
}, 3000);
}

// ================== FORMULARIO (solo en index) ==================
const formulario = document.getElementById('formReserva');

if (formulario) {
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const clave = document.getElementById('clave'); // aquí va el celular
    // const mensaje = document.getElementById('mensaje');

    formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const datos = {
        nombre: nombre.value,
        correo: correo.value,
        celular: clave.value
    };

    // 1) guardar en localStorage (lista de contactos)
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push(datos);
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // 2) enviar al servidor
    fetch('http://167.71.101.78/senati/fpw/reserva.php', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 200) {
            mensaje.innerHTML = 'SE REGISTRÓ SATISFACTORIAMENTE';
        } else {
            mensaje.innerHTML = 'Error: ' + data.message;
        }
    })
    .catch(error => {
        console.log(error);
        mensaje.innerHTML = 'No se pudo conectar con el servidor (se guardó en el navegador)';
    });

    formulario.reset();
});
}

// ================== CONTACTOS (solo en contactos.html) ==================
const cuerpoTabla = document.getElementById('cuerpoTabla');

if (cuerpoTabla) {
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const vacio = document.getElementById('vacio');

if (contactos.length === 0) {
    vacio.textContent = 'Todavía no hay contactos guardados. Registra uno desde el formulario del Home.';
} else {
    contactos.forEach(c => {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${c.nombre}</td><td>${c.correo}</td><td>${c.celular}</td>`;
    cuerpoTabla.appendChild(fila);
    });
}
}