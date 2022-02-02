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
    const cargoLabel1 = document.createElement('label')
    cargoLabel1.textContent = "Cargo" + countCargo

    //create select
    const cargoSelect = document.createElement('select')
    cargoSelect.classList.add('select-custom')
    //create options
    cargoList.forEach(({ cargoType }) => {
        const option = document.createElement('option')
        option.setAttribute('value', cargoType)
        option.textContent = cargoType
        cargoSelect.append(option)
    })

    const subgroupCargo1 = document.createElement('div')
    //subgroupCargo1.append(cargoLabel1)
    subgroupCargo1.append(cargoSelect)
    //subgroupCargo1.classList.add('display__cargo')
    subgroupCargo1.classList.add('cargo__list-cargo-heading')

    const cargoLabel2 = document.createElement('label')
    cargoLabel2.textContent = "Car"
    const cargoinput1 = document.createElement('input')
    cargoinput1.value = "None"
    cargoinput1.style.width = "150px"
    //cargoinput1.setAttribute('disabled', 'disabled')

    const subgroupCargo2 = document.createElement('div')        
    //subgroupCargo2.append(cargoLabel2)
    subgroupCargo2.append(cargoinput1)
    //subgroupCargo2.classList.add('display__cargo')
    subgroupCargo2.classList.add('cargo__list-cargo-cartype')

    const cargoLabel3 = document.createElement('label')
    cargoLabel3.textContent = "Cargo QTY"
    const cargoinput2 = document.createElement('input')
    cargoinput2.setAttribute('type', 'number')
    cargoinput2.setAttribute('min', '1')
    cargoinput2.setAttribute('max', '6')
    cargoinput2.style.width = '50px'
    //cargoinput2.value = 6

    const subgroupCargo3 = document.createElement('div')        
    //subgroupCargo3.append(cargoLabel3)
    subgroupCargo3.append(cargoinput2)
    //subgroupCargo3.classList.add('display__cargo')
    subgroupCargo3.classList.add('cargo__list-cargo-QTY')

    //no of cars
    const cargoinput3 = document.createElement('input')
    cargoinput3.setAttribute('type', 'number')
    cargoinput3.style.width = '50px'
    cargoinput3.setAttribute('min', '1')
    //cargoinput2.value = 6

    const subgroupCargo4 = document.createElement('div')        
    //subgroupCargo4.append(cargoLabel4)
    subgroupCargo4.append(cargoinput3)
    //subgroupCargo4.classList.add('display__cargo')
    subgroupCargo4.classList.add('cargo__list-cargo-carnos')

    //const cargoLabel5 = document.createElement('label')
    //cargoLabel4.textContent = "Loaded weight"
    const cargoinput4 = document.createElement('input')
    cargoinput4.setAttribute('type', 'number')
    cargoinput4.style.width = '90px'
    //cargoinput2.value = 6

    const subgroupCargo5 = document.createElement('div')        
    //subgroupCargo4.append(cargoLabel5)
    subgroupCargo5.append(cargoinput4)
    //subgroupCargo4.classList.add('display__cargo')
    subgroupCargo5.classList.add('cargo__list-cargo-loadwt')


    const cargoGroup = document.createElement('div')
    cargoGroup.append(subgroupCargo1)
    cargoGroup.append(subgroupCargo2)
    cargoGroup.append(subgroupCargo3)
    cargoGroup.append(subgroupCargo4)
    cargoGroup.append(subgroupCargo5)
    cargoGroup.style.display = "flex"
    cargoGroup.classList.add('cargo__container')
    $cargoList.append(cargoGroup)
})

$cargoList.addEventListener('change', (e) => {
    const targetElement = e.target.value
    const cargo = cargoList.find((cargo) =>{
        return cargo.cargoType === targetElement;
    })

    const carDisplay = e.target.parentElement.parentElement.childNodes[1].childNodes[0]
    carDisplay.value = cargo.frightCar
    carDisplay.setAttribute('disabled', 'disabled')

    const inputElement = e.target.parentElement.parentElement.childNodes[2].childNodes[0]
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



