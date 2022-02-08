//elements
const $clearWorkspace = document.querySelector('#clear__workspace')



//EVENT LISTENERS
//onload
function test_fun(){
    $cargoList.innerHTML=""
    $engines.innerHTML=""
    $result_msg.setAttribute('disabled', 'disabled')
    $result_msg.style.visibility = 'hidden'
}

//eventlisteners - engines
$addEngine.addEventListener('click', addEngine)
$engines.addEventListener('change', onEngineSelect)
$engines.addEventListener('change', update_values)
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

$clearWorkspace.addEventListener('click', clearWorkSpace)
