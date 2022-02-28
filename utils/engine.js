const $engine = document.querySelector('#engine')
const $tractiveEffort = document.querySelector('#tractive-effort')
const $engines = document.querySelector('#engine__list')
const $addEngine = document.querySelector('#add__engine')
const $engine_delete = document.querySelector('#enngine_delete')
let count = 0
let engines__totalwt= 0

const addEngine = () =>{
    count++;
    if(count===1){
        $clearWorkspace.style.display = 'block'
    }

    //Engine type
    //create select
    const select = document.createElement('select')
 
    //create options
    engineList.forEach(({ engine }) => {
        const option = document.createElement('option')
        option.setAttribute('value', engine)
        option.textContent = engine
        select.append(option)
    })

    // select.classList.add('display__engine')
    select.classList.add('engine')

    /************************************ */
    //tractive effort 
    //create input to display value
    const input2 = document.createElement('input')
    // input2.value = 0
    input2.setAttribute('disabled', 'disabled')

    // input2.classList.add('display__engine')
    input2.classList.add('teffort')

    //Engine Weight
    //create input to display value
    const input3 = document.createElement('input')
    // input3.value = 0
    input3.setAttribute('disabled', 'disabled')

    // input3.classList.add('display__engine')
    input3.classList.add('eweight')

    //Tender Weight
    //create input to display value
    const input4 = document.createElement('input')
    // input4.value = '0'
    input4.setAttribute('disabled', 'disabled')
    // input4.style.visibility = 'hidden'

    // input4.classList.add('display__engine')
    // input4.classList.add('display__tender')
    input4.classList.add('tweight')

    //Delete Button
    //create i tag to delete individual engine
    const delete_icon = document.createElement('i')
    delete_icon.classList.add('fas')
    delete_icon.classList.add('fa-trash')
    delete_icon.classList.add('engine_del')
    delete_icon.id = 'engine_delete'
    delete_icon.style.userSelect = 'auto'
    delete_icon.style.cursor = 'pointer'
    delete_icon.addEventListener('click', delete_engine_function)
    


    const group = document.createElement('div')
    group.classList.add('Container', 'new-Container')
    // group.classList.add('engine__container')
    group.append(select)
    group.append(input2)
    group.append(input3)
    group.append(input4)
    group.append(delete_icon)
    group.style.display = "flex"
    group.style.justifyContent = "space-around"
    //group.style.gap = "15px"

    $engines.insertAdjacentElement('beforeend', group)
}

const onEngineSelect = (e) => {
    const parentElement = e.target.parentElement

    const engine = engineList.find((engineData) => {
        return engineData.engine === e.target.value
    })

    engines__totalwt = engines__totalwt + engine.engineWeight
  
    if (current_weightUnit == "ton") {
        parentElement.childNodes[1].value = (engine.teffort / 2000).toFixed(2)
        parentElement.childNodes[2].value = (engine.engineWeight / 2000).toFixed(2)
        if(engine.tenderAvailable){
            parentElement.childNodes[3].value = (engine.tenderWeight / 2000).toFixed(2)
        }
        else{
            parentElement.childNodes[3].value = ''
        }
    }
    else{
        parentElement.childNodes[1].value = engine.teffort
        parentElement.childNodes[2].value = engine.engineWeight
        if(engine.tenderAvailable){
            parentElement.childNodes[3].value = engine.tenderWeight
        }
        else{
            parentElement.childNodes[3].value = ''
        }
    }
    update_values()
}

//Delete Engine
const delete_engine_function = (e) => {
    to_delete = e.target.parentElement
    to_delete.remove()
    update_result()
}

