// Funciones auxiliares para cálculos vectoriales

function obtenerVector(prefijo) {
  const x = Number.parseFloat(document.getElementById(prefijo + "x").value) || 0
  const y = Number.parseFloat(document.getElementById(prefijo + "y").value) || 0
  const z = Number.parseFloat(document.getElementById(prefijo + "z").value) || 0
  return { x, y, z }
}

function esVector2D(vector) {
  return vector.z === 0
}

function esVectorCero(vector) {
  return vector.x === 0 && vector.y === 0 && vector.z === 0
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

    const dimension = esVector2D(vectorResultante) ? "2D" : "3D"
    const mensaje = `El vector resultante (${dimension}) es: ${formatearVector(vectorResultante)}`
    mostrarResultado("resultadoSuma", mensaje)
  } catch (error) {
    mostrarResultado("resultadoSuma", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 2: Resta de Vectores
function calcularRestaVectores() {
  try {
    const vectorA = obtenerVector("restaA")
    const vectorB = obtenerVector("restaB")

    const vectorResultante = {
      x: vectorA.x - vectorB.x,
      y: vectorA.y - vectorB.y,
      z: vectorA.z - vectorB.z,
    }

    const dimension = esVector2D(vectorResultante) ? "2D" : "3D"
    const mensaje = `El vector resultante A - B (${dimension}) es: ${formatearVector(vectorResultante)}`
    mostrarResultado("resultadoResta", mensaje)
  } catch (error) {
    mostrarResultado("resultadoResta", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 3: Ángulo entre Vectores
function calcularAnguloVectores() {
  try {
    const vectorA = obtenerVector("anguloA")
    const vectorB = obtenerVector("anguloB")

    if (esVectorCero(vectorA)) {
      mostrarResultado(
        "resultadoAngulo",
        "Error: El vector A es cero. El ángulo no está definido para vectores de magnitud cero.",
        true,
      )
      return
    }

    if (esVectorCero(vectorB)) {
      mostrarResultado(
        "resultadoAngulo",
        "Error: El vector B es cero. El ángulo no está definido para vectores de magnitud cero.",
        true,
      )
      return
    }

    const magnitudA = magnitudVector(vectorA)
    const magnitudB = magnitudVector(vectorB)

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

// Función 4: Producto Punto
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

// Función 5: Norma (Magnitud) de un Vector
function calcularNormaVector() {
  try {
    const vectorA = obtenerVector("normaA")

    const norma = magnitudVector(vectorA)

    const dimension = esVector2D(vectorA) ? "2D" : "3D"
    const mensaje = `La norma (magnitud) del vector ${dimension} es: ${norma.toFixed(3)}`
    mostrarResultado("resultadoNorma", mensaje)
  } catch (error) {
    mostrarResultado("resultadoNorma", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 6: Producto Cruz
function calcularProductoCruz() {
  try {
    const vectorA = obtenerVector("cruzA")
    const vectorB = obtenerVector("cruzB")

    if (esVector2D(vectorA) && esVector2D(vectorB)) {
      mostrarResultado(
        "resultadoCruz",
        "Error: El producto cruz solo está definido para vectores 3D. Ingrese valores para la componente Z.",
        true,
      )
      return
    }

    const vectorResultante = productoCruzVectores(vectorA, vectorB)

    const mensaje = `El producto cruz (3D) es el vector: ${formatearVector(vectorResultante)}`
    mostrarResultado("resultadoCruz", mensaje)
  } catch (error) {
    mostrarResultado("resultadoCruz", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 7: Producto Triple Escalar
function calcularProductoTripleEscalar() {
  try {
    const vectorA = obtenerVector("tripleA")
    const vectorB = obtenerVector("tripleB")
    const vectorC = obtenerVector("tripleC")

    if (esVector2D(vectorA) && esVector2D(vectorB) && esVector2D(vectorC)) {
      mostrarResultado(
        "resultadoTriple",
        "Error: El producto triple escalar solo está definido para vectores 3D. Ingrese valores para las componentes Z.",
        true,
      )
      return
    }

    // Calcular B × C
    const productoCruzBC = productoCruzVectores(vectorB, vectorC)

    // Calcular A · (B × C)
    const productoTriple = productoPuntoVectores(vectorA, productoCruzBC)

    const mensaje = `El producto triple escalar (3D) es: ${productoTriple.toFixed(3)} (representa el volumen del paralelepípedo formado por los tres vectores)`
    mostrarResultado("resultadoTriple", mensaje)
  } catch (error) {
    mostrarResultado("resultadoTriple", "Error en el cálculo. Verifique los valores ingresados.", true)
  }
}

// Función 8: Producto Triple Vectorial A × (B × C)
function calcularProductoTripleVectorial() {
  try {
    const vectorA = obtenerVector("tripleVecA")
    const vectorB = obtenerVector("tripleVecB")
    const vectorC = obtenerVector("tripleVecC")

    if (esVector2D(vectorA) && esVector2D(vectorB) && esVector2D(vectorC)) {
      mostrarResultado(
        "resultadoTripleVectorial",
        "Error: El producto triple vectorial solo está definido para vectores 3D. Ingrese valores para las componentes Z.",
        true,
      )
      return
    }

    // Primero calcular B × C
    const productoCruzBC = productoCruzVectores(vectorB, vectorC)

    // Luego calcular A × (B × C)
    const vectorResultante = productoCruzVectores(vectorA, productoCruzBC)

    const mensaje = `El producto triple vectorial A × (B × C) (3D) es: ${formatearVector(vectorResultante)}`
    mostrarResultado("resultadoTripleVectorial", mensaje)
  } catch (error) {
    mostrarResultado("resultadoTripleVectorial", "Error en el cálculo. Verifique los valores ingresados.", true)
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
        } else if (id.startsWith("resta")) {
          calcularRestaVectores()
        } else if (id.startsWith("angulo")) {
          calcularAnguloVectores()
        } else if (id.startsWith("punto")) {
          calcularProductoPunto()
        } else if (id.startsWith("norma")) {
          calcularNormaVector()
        } else if (id.startsWith("cruz")) {
          calcularProductoCruz()
        } else if (id.startsWith("triple") && !id.startsWith("tripleVec")) {
          calcularProductoTripleEscalar()
        } else if (id.startsWith("tripleVec")) {
          calcularProductoTripleVectorial()
        }
      }
    })
  })
})
