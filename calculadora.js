// Funciones auxiliares para cálculos vectoriales

function obtenerVector(prefijo) {
  const x = Number.parseFloat(document.getElementById(prefijo + "x").value) || 0
  const y = Number.parseFloat(document.getElementById(prefijo + "y").value) || 0
  const z = Number.parseFloat(document.getElementById(prefijo + "z").value) || 0
  return { x, y, z }
}

function magnitudVector(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z)
}

function productoPuntoVectores(vectorA, vectorB) {
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y + vectorA.z * vectorB.z
}

function productoCruzVectores(vectorA, vectorB) {
  return {
    x: vectorA.y * vectorB.z - vectorA.z * vectorB.y,
    y: vectorA.z * vectorB.x - vectorA.x * vectorB.z,
    z: vectorA.x * vectorB.y - vectorA.y * vectorB.x,
  }
}

function formatearVector(vector) {
  return `(${vector.x.toFixed(3)}, ${vector.y.toFixed(3)}, ${vector.z.toFixed(3)})`
}

function mostrarResultado(elementoId, mensaje, esError = false) {
  const elemento = document.getElementById(elementoId)
  elemento.textContent = mensaje
  elemento.className = esError ? "resultado error" : "resultado"
}

// Función 1: Suma de Vectores
function calcularSumaVectores() {
  try {
    const vectorA = obtenerVector("sumaA")
    const vectorB = obtenerVector("sumaB")

    const vectorResultante = {
      x: vectorA.x + vectorB.x,
      y: vectorA.y + vectorB.y,
      z: vectorA.z + vectorB.z,
    }

    const mensaje = `El vector resultante es: ${formatearVector(vectorResultante)}`
    mostrarResultado("resultadoSuma", mensaje)
  } catch (error) {
    mostrarResultado("resultadoSuma", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 2: Ángulo entre Vectores
function calcularAnguloVectores() {
  try {
    const vectorA = obtenerVector("anguloA")
    const vectorB = obtenerVector("anguloB")

    const magnitudA = magnitudVector(vectorA)
    const magnitudB = magnitudVector(vectorB)

    if (magnitudA === 0 || magnitudB === 0) {
      mostrarResultado("resultadoAngulo", "Error: No se puede calcular el ángulo con vectores de magnitud cero.", true)
      return
    }

    const productoPunto = productoPuntoVectores(vectorA, vectorB)
    const coseno = productoPunto / (magnitudA * magnitudB)

    // Asegurar que el coseno esté en el rango [-1, 1] para evitar errores de precisión
    const cosenoLimitado = Math.max(-1, Math.min(1, coseno))
    const anguloRadianes = Math.acos(cosenoLimitado)
    const anguloGrados = anguloRadianes * (180 / Math.PI)

    const mensaje = `El ángulo entre los vectores es: ${anguloGrados.toFixed(3)}° (${anguloRadianes.toFixed(3)} radianes)`
    mostrarResultado("resultadoAngulo", mensaje)
  } catch (error) {
    mostrarResultado("resultadoAngulo", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 3: Producto Punto
function calcularProductoPunto() {
  try {
    const vectorA = obtenerVector("puntoA")
    const vectorB = obtenerVector("puntoB")

    const productoPunto = productoPuntoVectores(vectorA, vectorB)

    const mensaje = `El producto punto es: ${productoPunto.toFixed(3)}`
    mostrarResultado("resultadoPunto", mensaje)
  } catch (error) {
    mostrarResultado("resultadoPunto", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 4: Producto Cruz
function calcularProductoCruz() {
  try {
    const vectorA = obtenerVector("cruzA")
    const vectorB = obtenerVector("cruzB")

    const vectorResultante = productoCruzVectores(vectorA, vectorB)

    const mensaje = `El producto cruz es el vector: ${formatearVector(vectorResultante)}`
    mostrarResultado("resultadoCruz", mensaje)
  } catch (error) {
    mostrarResultado("resultadoCruz", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 5: Producto Triple
function calcularProductoTriple() {
  try {
    const vectorA = obtenerVector("tripleA")
    const vectorB = obtenerVector("tripleB")
    const vectorC = obtenerVector("tripleC")

    // Calcular B × C
    const productoCruzBC = productoCruzVectores(vectorB, vectorC)

    // Calcular A · (B × C)
    const productoTriple = productoPuntoVectores(vectorA, productoCruzBC)

    const mensaje = `El producto triple es: ${productoTriple.toFixed(3)} (representa el volumen del paralelepípedo formado por los tres vectores)`
    mostrarResultado("resultadoTriple", mensaje)
  } catch (error) {
    mostrarResultado("resultadoTriple", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función para limpiar todos los campos (opcional)
function limpiarCampos() {
  const inputs = document.querySelectorAll('input[type="number"]')
  inputs.forEach((input) => (input.value = ""))

  const resultados = document.querySelectorAll(".resultado")
  resultados.forEach((resultado) => {
    resultado.textContent = ""
    resultado.className = "resultado"
  })
}

// Agregar eventos de teclado para calcular con Enter
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('input[type="number"]')

  inputs.forEach((input) => {
    input.addEventListener("keypress", (evento) => {
      if (evento.key === "Enter") {
        // Determinar qué función ejecutar basándose en el ID del input
        const id = input.id
        if (id.startsWith("suma")) {
          calcularSumaVectores()
        } else if (id.startsWith("angulo")) {
          calcularAnguloVectores()
        } else if (id.startsWith("punto")) {
          calcularProductoPunto()
        } else if (id.startsWith("cruz")) {
          calcularProductoCruz()
        } else if (id.startsWith("triple")) {
          calcularProductoTriple()
        }
      }
    })
  })
})
