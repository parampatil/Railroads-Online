//elements
const $resultList = document.querySelector('#result__list')
const $grade = document.querySelector('#grade')
const $result_msg = document.querySelector('#result_msg')


//1 - Train weight
//3 - Engine can pull
//5 - net effort

let total_train_weight = 0;
let max_pull = 0;
let net_effort = 0;
let rolling_resistance = 0.004;
let grade_resistance = 0.01;
let curve_resistance = 0.0004;



//Formula:
    //Total train Weight = All engine weight + tender weight + cargo loaded weight
    //max pull( Your engine can pull) = (sum of all tractive effort) / (grade * grade resistance + rolling resistance) - All engine weight + tender weight
    //net effort (How much your engine can pull) = Max pull - Total train weight

const update_values = () =>{
    total_trainwt()
    total_maxPull()
    net_effort = max_pull - total_train_weight.toFixed(0)
    $resultList.childNodes[1].value = total_train_weight.toFixed(0)
    $resultList.childNodes[3].value = max_pull.toFixed(0)

    if(net_effort > 0){
        $resultList.childNodes[5].style.color = "rgb(75, 236, 75)"
        $resultList.childNodes[5].value = net_effort.toFixed(0)
        console.log($result_msg)
        $result_msg.style.visibility = "visible"
        $result_msg.value = "Your train can pull! Have safe journey!"
        $result_msg.style.color = "rgb(75, 236, 75)"
    }else if(net_effort < 0){
        $resultList.childNodes[5].style.color = "red"
        $resultList.childNodes[5].value = net_effort.toFixed(0)
        $result_msg.style.visibility = "visible"
        $result_msg.value = "Your train can't pull! Please add more engines"
        $result_msg.style.color = "red"

    }else{
        $resultList.childNodes[5].value =""
    }
    if($engines.innerHTML==="" && $cargoList.innerHTML===""){
        $resultList.childNodes[1].value = ""
        $resultList.childNodes[3].value = ""
        $resultList.childNodes[5].value = ""
        $result_msg.style.visibility = "hidden"
    }
}


//Function to calculate total train weight
const total_trainwt = () =>{
    //Total train Weight = All engine weight + tender weight + cargo loaded weight

    //variables for total train weight
    let total_engineWeight = 0;
    let total_tenderWeight = 0;
    let total_cargoWeight = 0;

    //getting values of engine weight
    let collection_eweight = document.getElementsByClassName("eweight");
    for (let i = 1; i < collection_eweight.length; i++) {
        total_engineWeight = total_engineWeight + Number(collection_eweight[i].value)
    }

    //getting values of tender weight
    let collection_tweight = document.getElementsByClassName("tweight");
    for (let i = 1; i < collection_tweight.length; i++) {
        total_tenderWeight = total_tenderWeight + Number(collection_tweight[i].value)
    }

    //getting values of Loaded cargo weight
    let collection_Loaded = document.getElementsByClassName("Loaded");
    for (let i = 1; i < collection_Loaded.length; i++) {
        total_cargoWeight = total_cargoWeight + Number(collection_Loaded[i].value)
    }

    total_train_weight = total_engineWeight + total_tenderWeight + total_cargoWeight 

    return total_train_weight
}

const total_maxPull = () =>{
    //max pull( Your engine can pull) = (sum of all tractive effort) / (grade * grade resistance + rolling resistance) - All engine weight + tender weight

    //variables for max pull
    let total_engineWeight = 0;
    let total_tenderWeight = 0;
    let total_tractiveEffort = 0;

    //getting values of engine weight
    let collection_eweight = document.getElementsByClassName("eweight");
    for (let i = 1; i < collection_eweight.length; i++) {
        total_engineWeight = total_engineWeight + Number(collection_eweight[i].value)
    }

    //getting values of tender weight
    let collection_tweight = document.getElementsByClassName("tweight");
    for (let i = 1; i < collection_tweight.length; i++) {
        total_tenderWeight = total_tenderWeight + Number(collection_tweight[i].value)
    }

    //getting values of tractive effort
    let collection_teffort = document.getElementsByClassName("teffort");
    for (let i = 1; i < collection_teffort.length; i++) {
        total_tractiveEffort = total_tractiveEffort + Number(collection_teffort[i].value)
    }

    max_pull = (total_tractiveEffort / ($grade.value * grade_resistance + rolling_resistance) - (total_engineWeight + total_tenderWeight))

    return max_pull
}