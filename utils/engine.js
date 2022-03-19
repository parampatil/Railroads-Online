const $engine = document.querySelector("#engine");
const $tractiveEffort = document.querySelector("#tractive-effort");
const $engines = document.querySelector("#engine__list");
const $addEngine = document.querySelector("#add__engine");
const $engine_delete = document.querySelector("#enngine_delete");
let count = 0;
let engines__totalwt = 0;

const addEngine = () => {
  count++;
  if (count === 1) {
    $clearWorkspace.style.display = "block";
  }

  //Engine type
  //create select
  const select = document.createElement("select");

  //create options
  engineList.forEach(({ engine }) => {
    const option = document.createElement("option");
    option.setAttribute("value", engine);
    option.textContent = engine;
    select.append(option);
  });

  // select.classList.add('display__engine')
  select.classList.add("engine");

  /************************************ */
  //tractive effort
  //create input to display value
  const input2 = document.createElement("input");
  input2.setAttribute("disabled", "disabled");
  input2.classList.add("teffort");

  //Engine Weight
  const input3 = document.createElement("input");
  input3.setAttribute("disabled", "disabled");
  input3.classList.add("eweight");

  //Tender Weight
  const input4 = document.createElement("input");
  input4.setAttribute("disabled", "disabled");

  input4.classList.add("tweight");

  //Delete Button
  //create i tag to delete individual engine
  const delete_icon = document.createElement("i");
  delete_icon.classList.add("fas");
  delete_icon.classList.add("fa-trash");
  delete_icon.classList.add("engine_del");
  delete_icon.id = "engine_delete";
  delete_icon.style.userSelect = "auto";
  delete_icon.style.cursor = "pointer";
  delete_icon.addEventListener("click", delete_engine_function);

  const group = document.createElement("div");
  group.classList.add("Container", "new-Container");
  group.append(select);
  group.append(input2);
  group.append(input3);
  group.append(input4);
  group.append(delete_icon);
  group.style.display = "flex";
  group.style.justifyContent = "space-around";

  $engines.insertAdjacentElement("beforeend", group);
};

const onEngineSelectStack = (e) => {
  onEngineSelect(e);
  save_engineList();
  update_result();
};

const onEngineSelect = (e) => {
  const parentElement = e.target.parentElement;

  const engine = engineList.find((engineData) => {
    return engineData.engine === e.target.value;
  });

  engines__totalwt = engines__totalwt + engine.engineWeight;

  if (current_weightUnit == "ton") {
    parentElement.childNodes[1].value = kgFormat.format(
      Number(engine.teffort_kg)
    );
    parentElement.childNodes[2].value = kgFormat.format(
      Number(engine.engineWeight_emp_kg)
    );
    if (engine.tenderAvailable) {
      parentElement.childNodes[3].value = kgFormat.format(
        Number(engine.tenderWeight_emp_kg)
      );
    } else {
      parentElement.childNodes[3].value = "";
    }
  } else {
    parentElement.childNodes[1].value = lbFormat.format(
      Number(engine.teffort_lbs)
    );
    parentElement.childNodes[2].value = lbFormat.format(
      Number(engine.engineWeight_emp_lbs)
    );
    if (engine.tenderAvailable) {
      parentElement.childNodes[3].value = lbFormat.format(
        Number(engine.tenderWeight_emp_lbs)
      );
    } else {
      parentElement.childNodes[3].value = "";
    }
  }
};

//Delete Engine
const delete_engine_function = (e) => {
  to_delete = e.target.parentElement;
  to_delete.remove();
  save_engineList();
  update_result();
};

const save_engineList = () => {
  //getting values of engine name
  let collection_eweight = document.getElementsByClassName("engine");
  let engine_items_list = [];
  for (let i = 1; i < collection_eweight.length; i++) {
    engine_items_list.push(collection_eweight[i].value);
  }
  localStorage.setItem("engines", JSON.stringify(engine_items_list));
};

const load_engineList = () => {
  let engine_items_list = JSON.parse(localStorage.getItem("engines"));
  if (engine_items_list) {
    engine_items_list.forEach(function (engine, i) {
      addEngine();
      let engine_select = document.getElementsByClassName("engine");
      engine_select[i + 1].value = engine;
      onEngineSelect({ target: engine_select[i + 1] });
    });
  }
};
