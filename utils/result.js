//elements
const $resultList = document.querySelector('#result__list')
const $grade = document.querySelector('#grade')
const $result_msg = document.querySelector('#result_msg')
const $weight_toggle = document.querySelector('#lbs_ton')
const $result_heading_last = document.querySelector('#result_heading_last')
const $kg = document.querySelector('#kg')
const $pounds = document.querySelector('#pounds')
const $train_weight_progress = document.querySelector('#progress-bar-trainweight')
const $max_pull_progress = document.querySelector('#progress-bar-maxpull')
const $progress_div = document.querySelector('#progress-div')

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

const update_values = () => {
    if (current_weightUnit == "ton") {
        ton_to_lbs()
        update_result()
        lbs_to_ton()
    }
    else {
        update_result()
    }
}

const update_result = () => {  
    if ($engines.innerHTML == "" && $cargoList.innerHTML == "") {
        count = 0
        countCargo = 0
        $resultList.childNodes[1].value = ""
        $resultList.childNodes[3].value = ""
        $resultList.childNodes[5].value = ""
        $resultList.childNodes[7].value = ""
        $result_msg.style.visibility = "hidden"
        $clearWorkspace.style.display = 'none'
        $result_heading_last.innerHTML = "How much more you can pull / need to pull"
        $progress_div.style.visibility = 'hidden'
    }
    else {
        //calculating all 3 values
        total_trainwt()
        total_maxPull()
        net_effort = max_pull - total_train_weight.toFixed(0)

        //updating values to the screen
        if (current_weightUnit == "ton") {
            $resultList.childNodes[1].value = total_train_weight.toFixed(2)
            $resultList.childNodes[3].value = max_pull.toFixed(2)
        } else {
            $resultList.childNodes[1].value = total_train_weight.toFixed(0)
            $resultList.childNodes[3].value = max_pull.toFixed(0)
        }
        if (net_effort > 0) {
            $resultList.childNodes[5].style.color = "rgb(75, 236, 75)"
            if (current_weightUnit == "ton") {
                $resultList.childNodes[5].value = net_effort.toFixed(2)
            }else{
                $resultList.childNodes[5].value = net_effort.toFixed(0)
            }
            $resultList.childNodes[7].style.color = "rgb(75, 236, 75)"
            $resultList.childNodes[7].value = (total_train_weight / max_pull * 100).toFixed(1) + "%"
            $result_msg.style.visibility = "visible"
            $result_msg.value = "Your train can pull! Have safe journey!"
            $result_msg.style.color = "rgb(75, 236, 75)"
            $result_heading_last.innerHTML = "You can pull more"

            $progress_div.style.visibility = 'visible'
            $train_weight_progress.style.width = (total_train_weight / max_pull * 100).toFixed(0) + "%"
            if (total_train_weight / max_pull * 100 > 80) {
                $train_weight_progress.style.backgroundColor = "rgb(255, 165, 0)"
            }else{
            $train_weight_progress.style.backgroundColor = "rgb(75, 236, 75)"
            }
            $max_pull_progress.style.width = (max_pull / max_pull * 100).toFixed(0) + "%"
            $max_pull_progress.style.backgroundColor = "rgb(75, 236, 75)"
            


        } else if (net_effort < 0) {
            $resultList.childNodes[5].style.color = "red"
            if (current_weightUnit == "ton") {
                $resultList.childNodes[5].value = net_effort.toFixed(2)
            }else{
                $resultList.childNodes[5].value = net_effort.toFixed(0)
            }
            $resultList.childNodes[7].style.color = "red"
            if (max_pull <= 0) {
                $resultList.childNodes[7].value = ""
            }
            else {
                if(current_weightUnit == "ton"){
                    $resultList.childNodes[7].value = (total_train_weight / max_pull * 100).toFixed(2) + "%"
                } else{
                    $resultList.childNodes[7].value = (total_train_weight / max_pull * 100).toFixed(0) + "%"
                }
            }
            $result_msg.style.visibility = "visible"
            $result_msg.value = "Your train can't pull! Please add more engines"
            $result_msg.style.color = "red"
            $result_heading_last.innerHTML = "Your train needs to pull more"
            
            $progress_div.style.visibility = 'visible'
            $train_weight_progress.style.width = (total_train_weight / total_train_weight * 100).toFixed(0) + "%"
            $max_pull_progress.style.width = (max_pull / total_train_weight * 100).toFixed(0) + "%"
            $train_weight_progress.style.backgroundColor = "rgb(255, 0, 0)"
            $max_pull_progress.style.backgroundColor = "rgb(255, 165, 0)"


        } else {
            $result_heading_last.innerHTML = "How much more you can pull / need to pull"
            $resultList.childNodes[5].style.color = "white"
            $result_msg.style.visibility = "hidden"
            $resultList.childNodes[5].value = ""
            $resultList.childNodes[7].value = ""
            $progress_div.style.visibility = 'hidden'
        }
    }
}


//Function to calculate total train weight
const total_trainwt = () => {
    //Total train Weight = All engine weight + tender weight + cargo loaded weight

    //variables for total train weight
    // let total_engineWeight = 0;
    // let total_tenderWeight = 0;
    let total_cargoWeight = 0;

    // //getting values of engine weight
    // let collection_eweight = document.getElementsByClassName("eweight");
    // for (let i = 1; i < collection_eweight.length; i++) {
    //     total_engineWeight = total_engineWeight + Number(collection_eweight[i].value)
    // }

    // //getting values of tender weight
    // let collection_tweight = document.getElementsByClassName("tweight");
    // for (let i = 1; i < collection_tweight.length; i++) {
    //     total_tenderWeight = total_tenderWeight + Number(collection_tweight[i].value)
    // }

    //getting values of Loaded cargo weight
    let collection_Loaded = document.getElementsByClassName("Loaded");
    for (let i = 1; i < collection_Loaded.length; i++) {
        total_cargoWeight = total_cargoWeight + Number(collection_Loaded[i].value)
    }

    total_train_weight = total_cargoWeight

    return total_train_weight
}

const total_maxPull = () => {
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
    max_pull = (total_tractiveEffort / ($grade.value * grade_resistance + rolling_resistance)) - (total_engineWeight + total_tenderWeight)

    return max_pull

}

const save_diff_grade_unit = () => {
    let diff_grade_items = {}
    diff_grade_items['difficulty'] = $difficulty.value;
    diff_grade_items['grade'] = $grade.value;
    diff_grade_items['unit'] = current_weightUnit;
    diff_grade_items['autosave'] = autosave;
    localStorage.setItem("diff_grade", JSON.stringify(diff_grade_items))
}

const load_diff_grade_unit = () => {
    let diff_grade_items = JSON.parse(localStorage.getItem("diff_grade"))
    if (diff_grade_items !== null) {
        $(".custom-select-wrapper.grade").find("select").val( diff_grade_items.grade)
        $("#sel_grade").text(diff_grade_items.grade)
        $(".custom-select-wrapper.difficulty").find("select").val( diff_grade_items.difficulty)
        $("#sel_difficulty").text(diff_grade_items.difficulty)
        document.getElementsByClassName("custom-options difficulty")[0].childNodes.forEach(element => {
            if ($(element).attr("data-value") == diff_grade_items.difficulty) {
                $("#sel_difficulty").text(element.innerHTML)    
            }
        });
        if (diff_grade_items.unit === "ton") {
            $weight_toggle.checked = true
            current_weightUnit = "lbs"
            update_weightUnit()
        }
        autosave = diff_grade_items.autosave
    }
}