// ================== SLIDER ==================
const slides = document.querySelectorAll('.slide');
const puntos = document.querySelectorAll('.punto');
let actual = 0;

function mostrarSlide(n) {
  slides.forEach(s => s.classList.remove('activo'));
  puntos.forEach(p => p.classList.remove('activo'));
  slides[n].classList.add('activo');
  puntos[n].classList.add('activo');
  actual = n;
}

// al hacer clic en un punto se va a esa imagen
puntos.forEach((punto, i) => {
  punto.addEventListener('click', () => mostrarSlide(i));
});

// cambia solo cada 4 segundos
setInterval(() => {
  mostrarSlide((actual + 1) % slides.length);
}, 4000);


// ================== FORMULARIO (localStorage) ==================
const formulario = document.getElementById('registro');
const mensaje = document.getElementById('mensaje');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const celular = document.getElementById('celular').value.trim();

  // validación simple del celular (9 dígitos, como en Perú)
  if (!/^[0-9]{9}$/.test(celular)) {
    mensaje.style.color = 'red';
    mensaje.textContent = 'El celular debe tener 9 dígitos';
    return;
  }

  const registro = { nombre: nombre, correo: correo, celular: celular };

  // se guarda en una lista dentro del localStorage
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.push(registro);
  localStorage.setItem('registros', JSON.stringify(registros));

  mensaje.style.color = 'green';
  mensaje.textContent = 'Registro guardado correctamente';
  formulario.reset();
});
