//elements
const $addCargo = document.querySelector("#add__cargo");
const $cargoList = document.querySelector("#cargo__list");
const $difficulty = document.querySelector("#difficulty");
let countCargo = 0;
let cargo_totalwt = 0;

const addCargo = () => {
  countCargo++;
  if (countCargo === 1) {
    $clearWorkspace.style.display = "block";
  }

  //Cargo type
  //create label

  //create select for Cargo Type
  const cargoSelect = document.createElement("select");
  cargoSelect.classList.add("cargoType");
  //create options
  cargoList.forEach(({ cargoType }) => {
    const option = document.createElement("option");
    option.setAttribute("value", cargoType);
    option.textContent = cargoType;
    cargoSelect.append(option);
  });

  //Create Input box for Car Type

  const cargoinput2 = document.createElement("input");
  cargoinput2.value = "";
  cargoinput2.setAttribute("disabled", "disabled");
  cargoinput2.classList.add("carType");

  //Create Input box for QTY
  const cargoinput3 = document.createElement("input");
  cargoinput3.setAttribute("type", "number");
  cargoinput3.setAttribute("min", "0");
  cargoinput3.setAttribute("max", "6");
  cargoinput3.setAttribute("disabled", "disabled");
  cargoinput3.classList.add("QTY");

  //no of cars
  const cargoinput4 = document.createElement("input");
  cargoinput4.setAttribute("type", "number");
  cargoinput4.setAttribute("min", "1");
  cargoinput4.setAttribute("disabled", "disabled");
  cargoinput4.classList.add("Noofcars");

  //Create Input box for Loaded Weight

  const cargoinput5 = document.createElement("input");
  cargoinput5.setAttribute("disabled", "disabled");
  cargoinput5.classList.add("Loaded");

  //Create delete button

  const cargo_delete_icon = document.createElement("i");
  cargo_delete_icon.classList.add("fas");
  cargo_delete_icon.classList.add("fa-trash");
  cargo_delete_icon.classList.add("cargo_del");
  cargo_delete_icon.id = "cargo_delete";
  cargo_delete_icon.style.userSelect = "auto";
  cargo_delete_icon.style.cursor = "pointer";
  cargo_delete_icon.addEventListener("click", delete_cargo_function);

  //Append all the above elements in single div Container

  const cargoGroup = document.createElement("div");
  cargoGroup.append(cargoSelect);
  cargoGroup.append(cargoinput2);
  cargoGroup.append(cargoinput3);
  cargoGroup.append(cargoinput4);
  cargoGroup.append(cargoinput5);
  cargoGroup.append(cargo_delete_icon);
  cargoGroup.style.display = "flex";
  cargoGroup.classList.add("Container", "new-Container");
  $cargoList.append(cargoGroup);
};

const onCargoSelectStack = (e) => {
  onCargoSelect(e);
  save_cargoList();
  update_result();
};

const onCargoSelect = (e) => {
  //0 - cargoType
  //1 - cartype
  //2 - QTY
  //3 - Noofcars
  //4 - Loaded

  //Loaded Weight Formula
  //Loaded = Noofcars * (fright car weight +(QTY * difficulty * unit weight))

  let targetElement = e.target;

  //reference to cargoList array object
  let cargo = cargoList.find((cargo) => {
    return cargo.cargoType === targetElement.parentElement.childNodes[0].value;
  });

  //reference to frightList array object
  let carwt = frightList.find((carwt) => {
    return carwt.frightCar === cargo.frightCar;
  });

  if (targetElement.parentElement.childNodes[0].value !== "Select Cargo") {
    //set cartype
    targetElement.parentElement.childNodes[1].value = cargo.frightCar;

    //Set min/max for QTY
    targetElement.parentElement.childNodes[2].disabled = false;
    let cargoqtyDisplay = targetElement.parentElement.childNodes[2];
    cargoqtyDisplay.setAttribute("max", cargo.unitPercar);
    cargoqtyDisplay.setAttribute("min", 0);
    if (targetElement.classList.value == "cargoType") {
      cargoqtyDisplay.value = cargo.unitPercar;
    }

    //set default no of cars
    targetElement.parentElement.childNodes[3].disabled = false;
    if (targetElement.classList.value == "cargoType") {
      targetElement.parentElement.childNodes[3].value = 1;
    }

    //Set Loaded weight
    if (current_weightUnit === "ton") {
      targetElement.parentElement.childNodes[4].value = kgFormat.format(
        targetElement.parentElement.childNodes[3].value *
          (
            carwt.frightCarWeight_kg +
            targetElement.parentElement.childNodes[2].value *
              $difficulty.value *
              cargo.unitWeight_kg
          ).toFixed(0)
      );
    } else {
      targetElement.parentElement.childNodes[4].value = lbFormat.format(
        targetElement.parentElement.childNodes[3].value *
          (
            carwt.frightCarWeight_lbs +
            targetElement.parentElement.childNodes[2].value *
              $difficulty.value *
              cargo.unitWeight_lbs
          ).toFixed(0)
      );
    }
  } else {
    targetElement.parentElement.childNodes[1].value = "";
    targetElement.parentElement.childNodes[2].value = "";
    targetElement.parentElement.childNodes[2].disabled = true;
    targetElement.parentElement.childNodes[3].value = "";
    targetElement.parentElement.childNodes[3].disabled = true;
    targetElement.parentElement.childNodes[4].value = "";
  }

  save_cargoList();
};

//Delete Cargo
const delete_cargo_function = (e) => {
  to_delete = e.target.parentElement;
  to_delete.remove();
  save_cargoList();
  update_result();
};

const save_cargoList = () => {
  let collection_cargoType = document.getElementsByClassName("cargoType");
  let collection_QTY = document.getElementsByClassName("QTY");
  let collection_Noofcars = document.getElementsByClassName("Noofcars");
  let cargo_items_list = [];
  for (let i = 1; i < collection_cargoType.length; i++) {
    let cargo_items = {};
    cargo_items["cargoType"] = collection_cargoType[i].value;
    cargo_items["QTY"] = collection_QTY[i].value;
    cargo_items["Noofcars"] = collection_Noofcars[i].value;
    cargo_items_list.push(cargo_items);
  }
  localStorage.setItem("cargo", JSON.stringify(cargo_items_list));
};

const load_cargoList = () => {
  let cargo_items_list = JSON.parse(localStorage.getItem("cargo"));
  if (cargo_items_list !== null) {
    cargo_items_list.forEach(function (cargo, i) {
      addCargo();
      let collection_cargoType = document.getElementsByClassName("cargoType");
      let collection_QTY = document.getElementsByClassName("QTY");
      let collection_Noofcars = document.getElementsByClassName("Noofcars");

      collection_cargoType[i + 1].value = cargo.cargoType;
      onCargoSelect({ target: collection_cargoType[i + 1] });
      collection_QTY[i + 1].value = cargo.QTY;
      collection_Noofcars[i + 1].value = cargo.Noofcars;
      onCargoSelect({ target: collection_Noofcars[i + 1] });
    });
  }
};
