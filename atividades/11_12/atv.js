// ---------------------- exemplo 1 ---------------------- //

function function_name(val) {
    return val
}

/* console.log(function_name('valor')) */

// ---------------------- exemplo 2 ---------------------- //

function fun_1(...params) {
    console.log(params.length)
}

/* fun_1()
fun_1(5)
fun_1(5, 6, 7) */


// ---------------------- exemplo 3 ---------------------- //

var func = function(x,y){ return x*y }

function product() {
    var result
    result = func(10, 20)
    console.log("The product: " + result)
}

//product()

// ---------------------- exemplo 4 ---------------------- //

function fazRequisicao() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise Resolvida")
        }, 5000)
    })
}

/* fazRequisicao()
    .then(console.log)
    .catch(console.log)
    .finally(console.log("Finalizando"))
 */

 // ---------------------- exemplo 5 ---------------------- //

/* fetch = require("node-fetch")
let cepBuscado
console.log("Buscando CEP")
cepBuscado = buscarCep("13845373")
console.log("CEP buscado")
console.log("CEP encontrado: " + cepBuscado)
 */

 function buscarCep(param) {
    let cep
    fetch(`https://viacep.com.br/ws/${param}/json/`)
        .then(response => response.json())
        .then(data => {
            cep = data.cep
            console.log("CEP encontrado: " + cep)
        })
        .catch(console.error)
    return cep
}

// ---------------------- exemplo 6 ---------------------- //

function promiseSoma(num1, num2) {
    return new Promise((resolve, reject) => {
        if(num1 <= 0 || num2 <= 0)
            reject("Erro: ambos os números devem ser positivos")

        setTimeout(() => {
            resolve(num1 + num2)
        }, 2000)
    })
}

let num1 = 2, num2 = 4

promiseSoma(num1, num2)
    .then(response => console.log(response * 2))
    .catch(err => console.error(err))
    .finally(console.log(`(${num1} + ${num2}) * 2 = `))