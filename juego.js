class Character {
  dañoMinimo = 1;
  nombreHabilidad = "Ataque básico";

  constructor(nombre, vida, ataque, defensa) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
  }

  recibirDaño(cantidadDaño) {
    this.vida -= cantidadDaño;
    if (this.vida < 0) {
      this.vida = 0; 
    }
  }

  estaVivo() {
    return this.vida > 0;
  }

  atacarEspecial(objetivo) {
    let daño = this.calcularDaño(objetivo); 
    if (daño < this.dañoMinimo) daño = this.dañoMinimo;
    objetivo.recibirDaño(daño);
    return { tipoHabilidad: this.nombreHabilidad, daño };
  }

  calcularDaño(objetivo) {
    return this.ataque - objetivo.defensa;
  }
}

class Guerrero extends Character {
  dañoMinimo = 5;
  nombreHabilidad = "Golpe de Furia";

  constructor(nombre, vida, ataque, defensa, rabia) {
    super(nombre, vida, ataque, defensa);
    this.rabia = rabia;
  }

  calcularDaño(objetivo) {
    return this.ataque + this.rabia - objetivo.defensa;
  }
}

class Mago extends Character {
  dañoMinimo = 8;
  nombreHabilidad = "Bola de Fuego";

  constructor(nombre, vida, ataque, defensa, mana) {
    super(nombre, vida, ataque, defensa);
    this.mana = mana;
  }

  calcularDaño(objetivo) {
    return Math.floor(this.ataque * 1.5 - objetivo.defensa * 0.5);
  }
}

class Arquero extends Character {
  dañoMinimo = 4;
  nombreHabilidad = "Disparo Certero";

  constructor(nombre, vida, ataque, defensa, precision) {
    super(nombre, vida, ataque, defensa);
    this.precision = precision;
  }

  calcularDaño(objetivo) {
    return (
      this.ataque +
      Math.floor(Math.random() * this.precision) -
      objetivo.defensa
    );
  }
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const personajes = [
  new Guerrero(
    "Aragorn",
    numeroAleatorio(90, 120),
    numeroAleatorio(20, 30),
    numeroAleatorio(10, 15),
    numeroAleatorio(5, 10),
  ),
  new Mago(
    "Gandalf",
    numeroAleatorio(70, 90),
    numeroAleatorio(25, 35),
    numeroAleatorio(5, 10),
    numeroAleatorio(20, 30),
  ),
  new Arquero(
    "Legolas",
    numeroAleatorio(80, 100),
    numeroAleatorio(18, 28),
    numeroAleatorio(8, 12),
    numeroAleatorio(10, 20),
  ),
  new Guerrero(
    "Boromir",
    numeroAleatorio(90, 120),
    numeroAleatorio(22, 32),
    numeroAleatorio(12, 18),
    numeroAleatorio(4, 8),
  ),
];

console.log("=== ¡COMIENZA LA BATALLA! ===");

for (const p of personajes) {
  console.log(`${p.nombre} (${p.constructor.name}): ${p.vida} HP`);
}

let turno = 1;

while (personajes.filter((p) => p.estaVivo()).length > 1) {
  console.log(`\n--- Turno ${turno} ---`);

  const vivos = personajes.filter((p) => p.estaVivo());

  const atacante = vivos[Math.floor(Math.random() * vivos.length)];

  const posiblesObjetivos = vivos.filter((p) => p !== atacante);
  const objetivo =
    posiblesObjetivos[Math.floor(Math.random() * posiblesObjetivos.length)];

  const resultadoAtaque = atacante.atacarEspecial(objetivo);

  console.log(
    `${atacante.nombre} (${atacante.constructor.name}) ataca a ${objetivo.nombre} con [${resultadoAtaque.tipoHabilidad}]!`,
  );
  console.log(`Daño infligido: ${resultadoAtaque.daño}`);
  console.log(
    `Estado de vida actual -> ${objetivo.nombre}: ${objetivo.vida} HP | ${atacante.nombre}: ${atacante.vida} HP`,
  );

  turno++;
}

console.log("\n==================================");
console.log("¡FIN DE LA BATALLA!");
const ganador = personajes.find((p) => p.estaVivo());
console.log(
  `El ganador indiscutible es: ${ganador.nombre} (${ganador.constructor.name}) con ${ganador.vida} HP restantes.`,
);
