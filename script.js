const dependencias = {
  "Vivencias de la medicina": ["Vivencias de la medicina 2", "Psicología médica"],
  "Bases científicas": ["Bases estructurales y funcionales 1", "Bioestadística", "Bases estructurales y funcionales 3"],
  "Mecanismos celulares en salud y enfermedad": ["Bases estructurales y funcionales 1"],
  "Técnicas avanzadas de aprendizaje": ["Introducción al razonamiento clínico"],
  "Inglés general 1": ["Inglés general 2"],
  "Psicología médica": ["Introducción a la práctica clínica", "Bioética"],
  "Bases estructurales y funcionales 1": ["Bases estructurales y funcionales 2", "Bases estructurales y funcionales 3"],
  "Inglés general 2": ["Inglés general 3"],
  "Introducción a la práctica clínica": ["Introducción al razonamiento clínico", "Bases estructurales y funcionales 3", "Semiología"],
  "Bases estructurales y funcionales 2": ["Morfofisiopatología 1"],
  "Bioestadística": ["Epidemiología"],
  "Bioética": ["Semiología", "Metodología de la investigación clínica 1", "Salud pública", "Salud sexual"],
  "Epidemiología": ["Metodología de la investigación clínica 1", "Salud pública", "Administración y gestión en salud"],
  "Morfofisiopatología 1": ["Morfofisiopatología 2", "Electivo 1", "Electivo 2"],
  "Introducción al razonamiento clínico": ["Integrado médico quirúrgico 1", "Electivo 1", "Electivo 2"],
  "Bases estructurales y funcionales 3": ["Semiología", "Electivo 1", "Electivo 2"],
  "Semiología": ["Microbiología clínica", "Salud digital", "Integrado médico quirúrgico 1", "Morfofisiopatología 3"],
  "Morfofisiopatología 2": ["Microbiología clínica", "Integrado médico quirúrgico 1", "Morfofisiopatología 3"],
  "Metodología de la investigación clínica 1": ["Electivo 1", "Metodología de la investigación clínica 2", "Electivo 2"],
  "Salud pública": ["Salud digital", "Administración y gestión en salud"],
  "Microbiología clínica": ["Integrado médico quirúrgico 2"],
  "Integrado médico quirúrgico 1": ["Integrado médico quirúrgico 2", "Morfofisiopatología 3"],
  "Integrado médico quirúrgico 2": ["Integrado médico quirúrgico 3", "Salud sexual", "Medicina legal", "Administración y gestión en salud"],
  "Morfofisiopatología 3": ["Integrado médico quirúrgico 3"],
  "Integrado médico quirúrgico 3": ["Salud mental y psiquiatría 1", "Órganos de los sentidos 1", "Pediatría", "Órganos de los sentidos 2", "Ginecología y obstetricia"],
  "Salud mental y psiquiatría 1": ["Salud mental y psiquiatría 2"],
  "Administración y gestión en salud": ["Administración y gestión en salud 2"]
};

const semestres = {
  "Primer año - I semestre": ["Vivencias de la medicina", "Bases científicas", "Mecanismos celulares en salud y enfermedad", "Pensamiento crítico", "Técnicas avanzadas de aprendizaje", "Inglés general 1"],
  "Primer año - II semestre": ["Vivencias de la medicina 2", "Psicología médica", "Bases estructurales y funcionales 1", "Inglés general 2", "Curso de formación general 1", "Curso de formación general 2"],
  "Segundo año - III semestre": ["Introducción a la práctica clínica", "Bases estructurales y funcionales 2", "Bioestadística", "Bioética", "Inglés general 3", "Curso de formación general 3"],
  "Segundo año - IV semestre": ["Epidemiología", "Morfofisiopatología 1", "Introducción al razonamiento clínico", "Bases estructurales y funcionales 3", "Curso de formación general 4", "Curso de formación general 5"],
  "Tercer año - V semestre": ["Semiología", "Morfofisiopatología 2", "Metodología de la investigación clínica 1", "Salud pública"],
  "Tercer año - VI semestre": ["Microbiología clínica", "Salud digital", "Integrado médico quirúrgico 1", "Curso de formación general 6"],
  "Cuarto año - VII semestre": ["Integrado médico quirúrgico 2", "Electivo 1", "Metodología de la investigación clínica 2", "Morfofisiopatología 3"],
  "Cuarto año - VIII semestre": ["Integrado médico quirúrgico 3", "Salud sexual", "Electivo 2", "Medicina legal"],
  "Quinto año - IX semestre": ["Salud mental y psiquiatría 1", "Órganos de los sentidos 1", "Administración y gestión en salud", "Pediatría"],
  "Quinto año - X semestre": ["Salud mental y psiquiatría 2", "Órganos de los sentidos 2", "Administración y gestión en salud 2", "Ginecología y obstetricia"],
  "Sexto año": ["Internado de psiquiatría", "Internado electivo", "Internado de urgencias", "Internado médico quirúrgico 4.a", "Internado de medicina interna y geriatría", "Internado especialidades", "Internado médico quirúrgico 4.b"],
  "Séptimo año": ["Internado de pediatría", "Internado integral de salud comunitaria", "Internado médico quirúrgico 5.a", "Internado de ginecología y obstetricia", "Internado de cirugía", "Internado médico quirúrgico 5.b"]
};

const aprobados = new Set();

function crearMalla() {
  const container = document.getElementById('malla');
  for (const [semestre, ramos] of Object.entries(semestres)) {
    const bloque = document.createElement('section');
    const titulo = document.createElement('h2');
    titulo.textContent = semestre;
    bloque.appendChild(titulo);

    const grid = document.createElement('div');
    grid.className = 'grid';

    ramos.forEach(ramo => {
      const btn = document.createElement('button');
      btn.textContent = ramo;
      btn.className = 'ramo bloqueado';
      btn.onclick = () => aprobarRamo(ramo, btn);
      btn.disabled = !esDesbloqueado(ramo);
      btn.id = ramo;
      grid.appendChild(btn);
    });

    bloque.appendChild(grid);
    container.appendChild(bloque);
  }
}

function esDesbloqueado(ramo) {
  for (const [req, dependientes] of Object.entries(dependencias)) {
    if (dependientes.includes(ramo) && !aprobados.has(req)) return false;
  }
  return true;
}

function aprobarRamo(ramo, btn) {
  if (aprobados.has(ramo)) return;
  aprobados.add(ramo);
  btn.classList.remove('bloqueado');
  btn.classList.add('aprobado');
  actualizarDisponibles();
}

function actualizarDisponibles() {
  for (const ramo of document.querySelectorAll('.ramo')) {
    const nombre = ramo.textContent;
    if (!aprobados.has(nombre) && esDesbloqueado(nombre)) {
      ramo.disabled = false;
      ramo.classList.remove('bloqueado');
    }
  }
}

window.onload = crearMalla;
