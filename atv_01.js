
const listA = [0, 1, 20, 30, 4, 8, 10, 15, 18, 8]
const listB = [2, 3, 4, 2, 6, 2, 5, 2, 2, 3]

function ex01() {
        
    let countInterval = listA.filter(num => num >= 10 && num <= 20).length
    let countNotInterval = listA.length - countInterval

    console.log(`\nqtd de números entre 10 e 20: ${countInterval}\n`)

    console.log(`qtd de números fora do intervalo: ${countNotInterval}\n`)

}


function ex02() {
    let listC = []

    listA.forEach((num, idx) => {
        listC.push(num * listB[idx])
    })

    console.log(`lista C ${listC}\n`)
}


function ex03() {

    let listD = []

    for(let i = 0; i < listA.length; i++) {
        listD.push(listA[i])
        listD.push(listB[i])
    }
    
    console.log(`lista A ${listA}\n`)
    
    console.log(`lista B ${listB}\n`)
    
    console.log(`lista D ${listD}\n`)
}

ex01()
console.log("---------------------------------------------------------------\n")
ex02()
console.log("---------------------------------------------------------------\n")
ex03()
