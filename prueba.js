const items = [2, 4, 6, 8, 10]
const items2 = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 30 },
  { nombre: "María", edad: 22 },
  { nombre: "Carlos", edad: 28 },
  { nombre: "Sofía", edad: 26 }
];


const variable = items2.map((loquesea) => {
    const item = {
        edad: loquesea.edad + 2,
        ...loquesea
    }
    return item
})

console.log(variable)


