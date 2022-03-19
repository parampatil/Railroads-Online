//elements
const $resultList = document.querySelector("#result__list");
const $grade = document.querySelector("#grade");
const $result_msg = document.querySelector("#result_msg");
const $weight_toggle = document.querySelector("#lbs_ton");
const $result_heading_last = document.querySelector("#result_heading_last");
const $kg = document.querySelector("#kg");
const $pounds = document.querySelector("#pounds");
const $train_weight_progress = document.querySelector(
  "#progress-bar-trainweight"
);
const $max_pull_progress = document.querySelector("#progress-bar-maxpull");
const $progress_div = document.querySelector("#progress-div");

//1 - Train weight
//3 - Engine can pull
//5 - net effort

let total_train_weight = 0;
let max_pull = 0;
let net_effort = 0;
let rolling_resistance_lbs = 0.004;
// let rolling_resistance_kg = 8;
let grade_resistance_lbs = 0.01;
// let grade_resistance_kg = 20;
// let curve_resistance_lbs = 0.0004;
// let curve_resistance_kg = 0.8;
let gravity_lbs = 1;
let gravity_kg = 9.8067;

//Formula:
//Total train Weight = cargo loaded weight
//max pull( Your engine can pull) = ((sum of all tractive effort) / (grade * 100 * grade resistance + rolling resistance)) - (All engine weight + tender weight)
//net effort (How much your engine can pull) = Max pull - Total train weight

const update_result = () => {
  console.log("update_result");
  if ($engines.innerHTML == "" && $cargoList.innerHTML == "") {
    count = 0;
    countCargo = 0;
    $resultList.childNodes[1].value = "";
    $resultList.childNodes[3].value = "";
    $resultList.childNodes[5].value = "";
    $resultList.childNodes[7].value = "";
    $result_msg.style.visibility = "hidden";
    $clearWorkspace.style.display = "none";
    $result_heading_last.innerHTML =
      "How much more you can pull / need to pull";
    $progress_div.style.visibility = "hidden";
  } else {
    //calculating all 3 values
    total_trainwt();
    total_maxPull();
    net_effort = Number(max_pull) - Number(total_train_weight).toFixed(0);

    //updating values to the screen
    if (current_weightUnit === "ton") {
      $resultList.childNodes[1].value = kgFormat.format(
        Number(total_train_weight.toFixed(0))
      );
      $resultList.childNodes[3].value = kgFormat.format(
        Number(max_pull.toFixed(0))
      );
      $resultList.childNodes[5].value = kgFormat.format(
        Number(net_effort.toFixed(0))
      );
    } else {
      $resultList.childNodes[1].value = lbFormat.format(
        Number(total_train_weight.toFixed(0))
      );
      $resultList.childNodes[3].value = lbFormat.format(
        Number(max_pull.toFixed(0))
      );
      $resultList.childNodes[5].value = lbFormat.format(
        Number(net_effort.toFixed(0))
      );
    }

    if (net_effort > 0) {
      //Result Peoperties
      $resultList.childNodes[5].style.color = "rgb(75, 236, 75)";
      $resultList.childNodes[7].style.color = "rgb(75, 236, 75)";
      $resultList.childNodes[7].value = percentFormat.format(
        Number((total_train_weight / max_pull).toFixed(1))
      );
      // Message Properties
      $result_msg.style.visibility = "visible";
      $result_msg.value = "Your train can pull! Have safe journey!";
      $result_msg.style.color = "rgb(75, 236, 75)";
      $result_heading_last.innerHTML = "You can pull more";

      //Progress Bar Properties
      $progress_div.style.visibility = "visible";
      $train_weight_progress.style.width =
        ((total_train_weight / max_pull) * 100).toFixed(0) + "%";
      if ((total_train_weight / max_pull) * 100 > 80) {
        $train_weight_progress.style.backgroundColor = "rgb(255, 165, 0)";
      } else {
        $train_weight_progress.style.backgroundColor = "rgb(75, 236, 75)";
      }
      $max_pull_progress.style.width =
        ((max_pull / max_pull) * 100).toFixed(0) + "%";
      $max_pull_progress.style.backgroundColor = "rgb(75, 236, 75)";
    } else if (net_effort < 0) {
      //Result Peoperties
      $resultList.childNodes[5].style.color = "red";
      $resultList.childNodes[7].style.color = "red";
      $resultList.childNodes[7].value = percentFormat.format(
        Number(total_train_weight / max_pull)
      );
      console.log(total_train_weight.toFixed(0) / max_pull.toFixed(0));

      // Message Properties
      $result_msg.style.visibility = "visible";
      $result_msg.value = "Your train can't pull! Please add more engines";
      $result_msg.style.color = "red";
      $result_heading_last.innerHTML = "Your train needs to pull more";

      // Progress Bar Properties
      $progress_div.style.visibility = "visible";
      $train_weight_progress.style.width =
        ((total_train_weight / total_train_weight) * 100).toFixed(0) + "%";
      $max_pull_progress.style.width =
        ((max_pull / total_train_weight) * 100).toFixed(0) + "%";
      $train_weight_progress.style.backgroundColor = "rgb(255, 0, 0)";
      $max_pull_progress.style.backgroundColor = "rgb(255, 165, 0)";
    }
  }
};

//Function to calculate total train weight
const total_trainwt = () => {
  //Total train Weight = cargo loaded weight

  let total_cargoWeight = 0;

  //getting values of Loaded cargo weight
  let collection_Loaded = document.getElementsByClassName("Loaded");
  for (let i = 1; i < collection_Loaded.length; i++) {
    // total_cargoWeight = total_cargoWeight + Number(collection_Loaded[i].value);
    if (collection_Loaded[i].value !== "") {
      total_cargoWeight =
        total_cargoWeight +
        Number(
          parseFloat(
            collection_Loaded[i].value
              .replace(/,/g, "")
              .replace(/kg/g, "")
              .replace(/lb/g, "")
          )
        );
    }
  }

  total_train_weight = total_cargoWeight;

  return total_train_weight;
};

const total_maxPull = () => {
  //max pull( Your engine can pull) = (sum of all tractive effort) / (grade * grade resistance + rolling resistance) - (All engine weight + tender weight)

  //variables for max pull
  let total_engandtenderWeight = 0;
  let total_tractiveEffort = 0;

  //Getting total to engine weight and tender weight
  let engine_items_list = JSON.parse(localStorage.getItem("engines"));
  if (engine_items_list) {
    engine_items_list.forEach(function (engine_item) {
      const enginefinder = engineList.find((engineData) => {
        return engineData.engine === engine_item;
      });
      if (current_weightUnit == "ton") {
        total_engandtenderWeight =
          total_engandtenderWeight +
          Number(enginefinder.engineWeight_full_kg) +
          Number(enginefinder.tenderWeight_full_kg);

        total_tractiveEffort =
          total_tractiveEffort + Number(enginefinder.teffort_lbs / 224.8089);
      } else {
        total_engandtenderWeight =
          total_engandtenderWeight +
          Number(enginefinder.engineWeight_full_lbs) +
          Number(enginefinder.tenderWeight_full_lbs);

        total_tractiveEffort =
          total_tractiveEffort + Number(enginefinder.teffort_lbs);
      }
    });
  }
  if (current_weightUnit === "ton") {
    max_pull =
      (total_tractiveEffort * 1000) /
        ($grade.value * grade_resistance_lbs + rolling_resistance_lbs) /
        gravity_kg -
      total_engandtenderWeight;
  } else {
    max_pull =
      total_tractiveEffort /
        ($grade.value * grade_resistance_lbs + rolling_resistance_lbs) /
        gravity_lbs -
      total_engandtenderWeight;
  }
  return max_pull;
};

//Functio to save Difficulty, Grade, Weight Unit, autosave
const save_diff_grade_unit = () => {
  let diff_grade_items = {};
  diff_grade_items["difficulty"] = $difficulty.value;
  diff_grade_items["grade"] = $grade.value;
  diff_grade_items["unit"] = current_weightUnit;
  diff_grade_items["autosave"] = autosave;
  localStorage.setItem("diff_grade", JSON.stringify(diff_grade_items));
};

//Functio to load Difficulty, Grade, Weight Unit, autosave
const load_diff_grade_unit = () => {
  let diff_grade_items = JSON.parse(localStorage.getItem("diff_grade"));
  if (diff_grade_items !== null) {
    $(".custom-select-wrapper.grade")
      .find("select")
      .val(diff_grade_items.grade);
    $("#sel_grade").text(diff_grade_items.grade);
    $(".custom-select-wrapper.difficulty")
      .find("select")
      .val(diff_grade_items.difficulty);
    $("#sel_difficulty").text(diff_grade_items.difficulty);
    document
      .getElementsByClassName("custom-options difficulty")[0]
      .childNodes.forEach((element) => {
        if ($(element).attr("data-value") == diff_grade_items.difficulty) {
          $("#sel_difficulty").text(element.innerHTML);
        }
      });
    if (diff_grade_items.unit === "ton") {
      $weight_toggle.checked = true;
      current_weightUnit = "lbs";
    }
    autosave = diff_grade_items.autosave;
  }
};
