//elements
const $clearWorkspace = document.querySelector('#clear__workspace')
let current_weightUnit


//EVENT LISTENERS
//onload
const onLoad_fun = () => {
    $cargoList.innerHTML=""
    $engines.innerHTML=""
    $result_msg.setAttribute('disabled', 'disabled')
    $result_msg.style.visibility = 'hidden'
    $clearWorkspace.style.display = 'none'
    current_weightUnit = "lbs"
}

//eventlisteners - engines
$addEngine.addEventListener('click', addEngine)
$engines.addEventListener('change', onEngineSelect)
// $engines.addEventListener('change', )
$deleteAllEngines.addEventListener('click', deleteAllEngines)

//eventlisteners - cargo
$addCargo.addEventListener('click', addCargo)
$cargoList.addEventListener('change',onCargoSelect)
$cargoList.addEventListener('change', update_values)
$deleteAllCargo.addEventListener('click', deleteAllCargo)

//eventlisteners - difficulty & grade
$difficulty.addEventListener('change', () => {
    let collection_cargodiv = document.getElementsByClassName('Loaded');
    for (let i = 1; i < collection_cargodiv.length; i++) {
        // console.log(collection_cargodiv[i].parentElement.childNodes)
        onCargoSelect(collection_cargodiv[i])
        update_values()
    }
})
$grade.addEventListener('change', update_values)

//eventlisteners - lbs_ton toggle
$weight_toggle.addEventListener('change', () => {
    update_weightUnit()
})

const update_weightUnit = () => {
    if ($weight_toggle.checked === true && current_weightUnit === "lbs") {
        lbs_to_ton()
        update_result()
    }
    else if($weight_toggle.checked === false && current_weightUnit === "ton"){
        ton_to_lbs()
        update_result()
    }
}

//Function to change unit
const lbs_to_ton = () =>{
    //variables for lbs to ton
    let collection_teffort = document.getElementsByClassName("teffort");
    for (let i = 1; i < collection_teffort.length; i++) {
        collection_teffort[i].value = (collection_teffort[i].value / 2000).toFixed(2)
    }

    let collection_eweight = document.getElementsByClassName("eweight");
    for (let i = 1; i < collection_eweight.length; i++) {
        collection_eweight[i].value = (Number(collection_eweight[i].value) / 2000).toFixed(2)
    }

    let collection_tweight = document.getElementsByClassName("tweight");
    for (let i = 1; i < collection_tweight.length; i++) {
        collection_tweight[i].value = (Number(collection_tweight[i].value) / 2000).toFixed(2)
    }

    let collection_Loaded = document.getElementsByClassName("Loaded");
    for (let i = 1; i < collection_Loaded.length; i++) {
        collection_Loaded[i].value = (Number(collection_Loaded[i].value) / 2000).toFixed(2)
    }

    $resultList.childNodes[1].value =  (Number($resultList.childNodes[1].value) / 2000).toFixed(2)
    $resultList.childNodes[3].value =  (Number($resultList.childNodes[3].value) / 2000).toFixed(2)
    $resultList.childNodes[5].value =  (Number($resultList.childNodes[5].value) / 2000).toFixed(2)
    current_weightUnit = "ton"
}

const ton_to_lbs = () =>{
    //variables for ton to lbs
    let collection_teffort = document.getElementsByClassName("teffort");
    for (let i = 1; i < collection_teffort.length; i++) {
        collection_teffort[i].value = (collection_teffort[i].value * 2000).toFixed(0)
    }

    let collection_eweight = document.getElementsByClassName("eweight");
    for (let i = 1; i < collection_eweight.length; i++) {
        collection_eweight[i].value = (Number(collection_eweight[i].value) * 2000).toFixed(0)
    }

    let collection_tweight = document.getElementsByClassName("tweight");
    for (let i = 1; i < collection_tweight.length; i++) {
        collection_tweight[i].value = (Number(collection_tweight[i].value) * 2000).toFixed(0)
    }

    let collection_Loaded = document.getElementsByClassName("Loaded");
    for (let i = 1; i < collection_Loaded.length; i++) {
        collection_Loaded[i].value = (Number(collection_Loaded[i].value) * 2000).toFixed(0)
    }

    $resultList.childNodes[1].value = (Number($resultList.childNodes[1].value) * 2000).toFixed(0)
    $resultList.childNodes[3].value = (Number($resultList.childNodes[3].value) * 2000).toFixed(0)  
    $resultList.childNodes[5].value = (Number($resultList.childNodes[5].value) * 2000).toFixed(0)
    current_weightUnit = "lbs"
}

//function for clear workspace
const clearWorkSpace = () => {
    const choice = confirm('This will delete all data. Do you want to continue?')
    if(choice === false){
        return
    }
    $engines.innerHTML = ""
    $cargoList.innerHTML = ""
    $resultList.childNodes[1].value = ""
    $resultList.childNodes[3].value = ""
    $resultList.childNodes[5].value = ""
    $result_msg.style.visibility = 'hidden'
    count = 0
    countCargo = 0
    $clearWorkspace.style.display = 'none'
}

//eventlisteners - clear workspace
$clearWorkspace.addEventListener('click', clearWorkSpace)