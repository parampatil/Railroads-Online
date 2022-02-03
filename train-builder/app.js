//elements
const $addCargo = document.querySelector('#add__cargo')
const $clearWorkspace = document.querySelector('#clear__workspace')
const $cargoList = document.querySelector('#cargo__list')
let countCargo = 0;



//eventlisteners
$addEngine.addEventListener('click', addEngine)

$engines.addEventListener('change', onEngineSelect)




// Cargo list


$addCargo.addEventListener('click', () =>{
    countCargo++;
    if(countCargo===1){
        $clearWorkspace.style.display = 'block'
    }

    console.log(countCargo)
    //Cargo type
    //create label

    //create select
    const  cargoSelect= document.createElement('select')
    cargoSelect.classList.add('cargoType')
    //create options
    cargoList.forEach(({ cargoType }) => {
        const option = document.createElement('option')
        option.setAttribute('value', cargoType)
        option.textContent = cargoType
        cargoSelect.append(option)
    })

    // const subgroupCargo1 = document.createElement('div')
    // subgroupCargo1.append(cargoSelect)
    // subgroupCargo1.classList.add('cargo__list-cargo-heading')


    const cargoinput2 = document.createElement('input')
    cargoinput2.value = "None"
    cargoinput2.setAttribute('disabled', 'disabled')
    cargoinput2.classList.add('carType')

    // const subgroupCargo2 = document.createElement('div')        
    // subgroupCargo2.append(cargoinput2)
    // subgroupCargo2.classList.add('cargo__list-cargo-cartype')

    const cargoinput3 = document.createElement('input')
    cargoinput3.setAttribute('type', 'number')
    cargoinput3.setAttribute('min', '1')
    cargoinput3.setAttribute('max', '6')
    cargoinput3.classList.add('QTY')

    // const subgroupCargo3 = document.createElement('div')        
    // subgroupCargo3.append(cargoinput3)
    // subgroupCargo3.classList.add('cargo__list-cargo-QTY')

    //no of cars
    const cargoinput4 = document.createElement('input')
    cargoinput4.setAttribute('type', 'number')
    cargoinput4.setAttribute('min', '1')
    cargoinput4.classList.add('Noofcars')

    // const subgroupCargo4 = document.createElement('div')        
    // subgroupCargo4.append(cargoinput4)
    // subgroupCargo4.classList.add('cargo__list-cargo-carnos')


    const cargoinput5 = document.createElement('input')
    cargoinput5.setAttribute('type', 'number')
    cargoinput5.setAttribute('disabled', 'disabled')
    cargoinput5.classList.add('Loaded')

    // const subgroupCargo5 = document.createElement('div')        
    // subgroupCargo5.append(cargoinput5)
    // subgroupCargo5.classList.add('cargo__list-cargo-loadwt')


    const cargoGroup = document.createElement('div')
    cargoGroup.append(cargoSelect)
    cargoGroup.append(cargoinput2)
    cargoGroup.append(cargoinput3)
    cargoGroup.append(cargoinput4)
    cargoGroup.append(cargoinput5)
    cargoGroup.style.display = "flex"
    cargoGroup.classList.add('Container')
    $cargoList.append(cargoGroup)
})

$cargoList.addEventListener('change', (e) => {
    const targetElement = e.target.value
    const cargo = cargoList.find((cargo) =>{
        return cargo.cargoType === targetElement;
    })

    const carDisplay = e.target.parentElement.childNodes[1]
    carDisplay.value = cargo.frightCar

    const inputElement = e.target.parentElement.childNodes[2]
    inputElement.setAttribute('max', cargo.unitPercar)
    inputElement.setAttribute('value', cargo.unitPercar)
})

//function for clear workspace
const clearWorkSpace = () => {
    const choice = confirm('This will delete all data. Do you want to continue?')
    if(choice === false){
        return
    }
    $engines.innerHTML = ""
    $cargoList.innerHTML = ""
    count = 0
    countCargo = 0
    $clearWorkspace.style.display = 'none'
}

$clearWorkspace.addEventListener('click', clearWorkSpace)



