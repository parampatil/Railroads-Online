//elements
const $addCargo = document.querySelector('#add__cargo')
const $cargoList = document.querySelector('#cargo__list')
const $difficulty = document.querySelector('#difficulty')
let countCargo = 0
let cargo_totalwt=0

const addCargo = () =>{
    countCargo++;
    if(countCargo===1){
        $clearWorkspace.style.display = 'block'
    }

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
    cargoinput2.value = ""
    cargoinput2.setAttribute('disabled', 'disabled')
    cargoinput2.classList.add('carType')

    // const subgroupCargo2 = document.createElement('div')        
    // subgroupCargo2.append(cargoinput2)
    // subgroupCargo2.classList.add('cargo__list-cargo-cartype')

    const cargoinput3 = document.createElement('input')
    cargoinput3.setAttribute('type', 'number')
    cargoinput3.setAttribute('min', '0')
    cargoinput3.setAttribute('max', '6')
    cargoinput3.setAttribute('disabled', 'disabled')
    cargoinput3.classList.add('QTY')

    // const subgroupCargo3 = document.createElement('div')        
    // subgroupCargo3.append(cargoinput3)
    // subgroupCargo3.classList.add('cargo__list-cargo-QTY')

    //no of cars
    const cargoinput4 = document.createElement('input')
    cargoinput4.setAttribute('type', 'number')
    cargoinput4.setAttribute('min', '1')
    cargoinput4.setAttribute('disabled', 'disabled')
    cargoinput4.classList.add('Noofcars')

    // const subgroupCargo4 = document.createElement('div')        
    // subgroupCargo4.append(cargoinput4)
    // subgroupCargo4.classList.add('cargo__list-cargo-carnos')


    const cargoinput5 = document.createElement('input')
    cargoinput5.setAttribute('type', 'number')
    cargoinput5.setAttribute('disabled', 'disabled')
    cargoinput5.classList.add('Loaded')

    const cargo_delete_icon = document.createElement('i')
    cargo_delete_icon.classList.add('fas')
    cargo_delete_icon.classList.add('fa-trash')
    cargo_delete_icon.classList.add('cargo_del')
    cargo_delete_icon.id = 'cargo_delete'
    cargo_delete_icon.style.userSelect = 'auto'
    cargo_delete_icon.style.cursor = 'pointer'
    cargo_delete_icon.addEventListener('click', delete_cargo_function)

    // const subgroupCargo5 = document.createElement('div')        
    // subgroupCargo5.append(cargoinput5)
    // subgroupCargo5.classList.add('cargo__list-cargo-loadwt')


    const cargoGroup = document.createElement('div')
    cargoGroup.append(cargoSelect)
    cargoGroup.append(cargoinput2)
    cargoGroup.append(cargoinput3)
    cargoGroup.append(cargoinput4)
    cargoGroup.append(cargoinput5)
    cargoGroup.append(cargo_delete_icon)
    cargoGroup.style.display = "flex"
    cargoGroup.classList.add('Container', 'new-Container')
    $cargoList.append(cargoGroup)

}

const onCargoSelect = (e) => {
    //0 - cargoType
    //1 - cartype
    //2 - QTY
    //3 - Noofcars
    //4 - Loaded

    //Loaded Weight Formula
    //Loaded = Noofcars * (fright car weight +(QTY * difficulty * unit weight))

    if (current_weightUnit === 'ton') {
        ton_to_lbs()
        let targetElement = e.target
        if(e.target === undefined){
            targetElement = e
        }
        //reference to cargoList array object
        let cargo = cargoList.find((cargo) =>{
            return cargo.cargoType === targetElement.parentElement.childNodes[0].value;
        })
        
        //reference to frightList array object
        let carwt = frightList.find((carwt) =>{
            return carwt.frightCar === cargo.frightCar;
        })

        if (targetElement.classList.value == 'cargoType') {
            if (targetElement.parentElement.childNodes[0].value !== 'Select Cargo') {
                //set cartype
                targetElement.parentElement.childNodes[1].value = cargo.cargoType

                //Set min/max for QTY
                targetElement.parentElement.childNodes[2].disabled = false;
                let cargoqtyDisplay = targetElement.parentElement.childNodes[2]
                cargoqtyDisplay.setAttribute('max', cargo.unitPercar)
                cargoqtyDisplay.setAttribute('min', 0)
                cargoqtyDisplay.value = cargo.unitPercar

                //set default no of cars
                targetElement.parentElement.childNodes[3].disabled = false;
                targetElement.parentElement.childNodes[3].value = 1

                //Set Loaded weight
                targetElement.parentElement.childNodes[4].value = targetElement.parentElement.childNodes[3].value * (carwt.frightCarWeight + (targetElement.parentElement.childNodes[2].value * $difficulty.value * cargo.unitWeight))
            }
            else {
                targetElement.parentElement.childNodes[1].value = ""
                targetElement.parentElement.childNodes[2].value = ""
                targetElement.parentElement.childNodes[2].disabled = true;
                targetElement.parentElement.childNodes[3].value = ""
                targetElement.parentElement.childNodes[3].disabled = true;
                targetElement.parentElement.childNodes[4].value = ""
            }
        }
        else{
            //Set Loaded weight
            if (targetElement.parentElement.childNodes[0].value !== 'Select Cargo'){
                targetElement.parentElement.childNodes[4].value = targetElement.parentElement.childNodes[3].value * (carwt.frightCarWeight + (targetElement.parentElement.childNodes[2].value * $difficulty.value * cargo.unitWeight))
            }
        }
        lbs_to_ton()
    }
    else{
        let targetElement = e.target
        if(e.target === undefined){
            targetElement = e
        }
        //reference to cargoList array object
        let cargo = cargoList.find((cargo) =>{
            return cargo.cargoType === targetElement.parentElement.childNodes[0].value;
        })
        
        //reference to frightList array object
        let carwt = frightList.find((carwt) =>{
            return carwt.frightCar === cargo.frightCar;
        })

        if (targetElement.classList.value == 'cargoType') {
            if (targetElement.parentElement.childNodes[0].value !== 'Select Cargo') {
                //set cartype
                targetElement.parentElement.childNodes[1].value = carwt.frightCar

                //set default no of cars
                targetElement.parentElement.childNodes[3].disabled = false;
                targetElement.parentElement.childNodes[3].value = 1

                //Set min/max for QTY
                targetElement.parentElement.childNodes[2].disabled = false;
                let cargoqtyDisplay = targetElement.parentElement.childNodes[2]
                cargoqtyDisplay.setAttribute('max', cargo.unitPercar)
                cargoqtyDisplay.setAttribute('min', 0)
                cargoqtyDisplay.value = cargo.unitPercar

                //Set Loaded weight
                targetElement.parentElement.childNodes[4].value = targetElement.parentElement.childNodes[3].value * (carwt.frightCarWeight + (targetElement.parentElement.childNodes[2].value * $difficulty.value * cargo.unitWeight))
            }
            else {
                targetElement.parentElement.childNodes[1].value = ""
                targetElement.parentElement.childNodes[2].value = ""
                targetElement.parentElement.childNodes[2].disabled = true;
                targetElement.parentElement.childNodes[3].value = ""
                targetElement.parentElement.childNodes[3].disabled = true;
                targetElement.parentElement.childNodes[4].value = ""
            }
        }
        else{
            //Set Loaded weight
            if (targetElement.parentElement.childNodes[0].value !== 'Select Cargo'){
                targetElement.parentElement.childNodes[4].value = targetElement.parentElement.childNodes[3].value * (carwt.frightCarWeight + (targetElement.parentElement.childNodes[2].value * $difficulty.value * cargo.unitWeight))
            }
        }
    }
    update_values()
}

//Delete Cargo
const delete_cargo_function = (e) => {
    to_delete = e.target.parentElement
    to_delete.remove()
    update_values()
}
