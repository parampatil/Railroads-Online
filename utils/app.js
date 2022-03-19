//elements
const $clearWorkspace = document.getElementById("clearWorkspace");
let current_weightUnit;
let current_openModal = "";
let autosave = true;

//********************************OnLoad*****************************//
const onLoad_fun = () => {
  $cargoList.innerHTML = "";
  $engines.innerHTML = "";
  $result_msg.setAttribute("disabled", "disabled");
  $result_msg.style.visibility = "hidden";
  $clearWorkspace.style.display = "none";
  current_weightUnit = "lbs";

  $kg.style.visibility = "hidden";
  if (JSON.parse(localStorage.getItem("diff_grade")) !== null) {
    if (JSON.parse(localStorage.getItem("diff_grade")).autosave == true) {
      load_diff_grade_unit();
      load_engineList();
      load_cargoList();
      update_weightUnit();
    } else if (
      JSON.parse(localStorage.getItem("diff_grade")).autosave == false
    ) {
      document.getElementById("toggle_checkbox").checked = false;
      autosave = false;
      save_diff_grade_unit();
    }
  } else {
    console.log("No local storage");
    welcome_modal_open();
    save_diff_grade_unit();
  }
};

//***************************************Weight Unit change***********************************//

const update_weightUnit = () => {
  //Checked is Ton
  //Unchecked is lbs

  if ($weight_toggle.checked === true && current_weightUnit === "lbs") {
    current_weightUnit = "ton";
    $kg.style.visibility = "visible";
    $pounds.style.visibility = "hidden";
  } else if ($weight_toggle.checked === false && current_weightUnit === "ton") {
    current_weightUnit = "lbs";
    $kg.style.visibility = "hidden";
    $pounds.style.visibility = "visible";
  }
  save_diff_grade_unit();
  save_engineList();
  save_cargoList();
  $engines.innerHTML = "";
  $cargoList.innerHTML = "";
  load_engineList();
  load_cargoList();
  update_result();
};

// *******************Modals*******************//
//Welcome Modal
const welcome_modal_close = () => {
  document.querySelector(".w-modal").classList.remove("open");
};

const welcome_modal_open = () => {
  document.querySelector(".w-modal").classList.add("open");
};

//Info Modal
const info_modal_close = () => {
  document.querySelector(".i-modal").classList.remove("open");
};

const info_modal_open = () => {
  document.querySelector(".i-modal").classList.add("open");
};

//Clear Workspace Modal
const cw_modal_close = () => {
  document.querySelector(".cw-modal").classList.remove("open");
};

const cw_modal_open = (header, msg, delObj) => {
  if (delObj === "engines") {
    if ($engines.childNodes.length <= 0) {
      return alert_modal_open("Sorry! No engines in the list");
    }
    current_openModal = "engines";
  } else if (delObj === "cargo") {
    if ($cargoList.childNodes.length <= 0) {
      return alert_modal_open("Sorry! No cargo in the list");
    }
    current_openModal = "cargo";
  } else if (delObj === "all") {
    current_openModal = "all";
  }

  document.querySelector(".cw-modal").classList.add("open");
  document.querySelector(".cw-modal-header").innerHTML = header;
  document.querySelector(".cw-modal-content").innerHTML = msg;
};

const cw_optionSelector = () => {
  if (current_openModal === "engines") {
    $engines.innerHTML = "";
    cw_modal_close();
    update_result();
    localStorage.removeItem("engines");
    current_openModal = "";
  } else if (current_openModal === "cargo") {
    $cargoList.innerHTML = "";
    cw_modal_close();
    update_result();
    localStorage.removeItem("cargo");
    current_openModal = "";
  } else if (current_openModal === "all") {
    $engines.innerHTML = "";
    $cargoList.innerHTML = "";
    $clearWorkspace.style.display = "none";
    cw_modal_close();
    update_result();
    localStorage.clear();
    current_openModal = "";
  }
};

//Alert Modal
const alert_modal_close = () => {
  document.querySelector(".alert-modal").classList.remove("open");
};

const alert_modal_open = (msg) => {
  document.querySelector(".alert-modal").classList.add("open");
  document.querySelector(".alert-modal-content").innerHTML = msg;
};

//**********************************Custom select Grade**************************//
$(".custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name"),
    all_classes = classes.split(" ");
  var template = '<div class="' + classes + '">';
  template +=
    '<span class="custom-select-trigger" id="sel_' +
    id +
    '" name="sel_' +
    name +
    '">';
  $(this)
    .find("option")
    .each(function () {
      if ($(this).attr("selected") === "selected") {
        template += $(this).html();
      }
    });
  template += "</span>";
  template += '<div class="custom-options ' + all_classes[1] + '">';
  $(this)
    .find("option")
    .each(function () {
      template +=
        '<span class="custom-option ' +
        all_classes[1] +
        '" data-value="' +
        $(this).attr("value") +
        '">' +
        $(this).html() +
        "</span>";
    });

  template += "</div></div>";

  $(this).wrap('<div class="custom-select-wrapper ' + id + '"></div>');
  $(this).hide();
  $(this).after(template);
});

$(".custom-option:first-of-type").hover(
  function () {
    $(this).parents(".custom-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  }
);
$(".custom-select-trigger").on("click", function () {
  $("html").one("click", function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});

$(".custom-option").on("click", function () {
  $(this)
    .parents(".custom-select-wrapper")
    .find("select")
    .val($(this).data("value"));
  $(this)
    .parents(".custom-options")
    .find(".custom-option")
    .removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this)
    .parents(".custom-select")
    .find(".custom-select-trigger")
    .text($(this).text());

  save_diff_grade_unit();
  $cargoList.innerHTML = "";
  load_cargoList();
  update_result();
});

//*************************Number Converter**************************** */

let kgFormat = Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "kilogram",
});

let lbFormat = Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "pound",
});

let percentFormat = Intl.NumberFormat("en-US", {
  style: "percent",
});

//*****************************Auto Save Function************************************//

const autosave_function = () => {
  //checked=True: autosave On
  //checked=False: autosave Off

  if (document.getElementById("toggle_checkbox").checked == true) {
    save_diff_grade_unit();
    save_engineList();
    save_cargoList();
    autosave = true;
    save_diff_grade_unit();
  } else {
    autosave = false;
    save_diff_grade_unit();
    save_engineList();
    save_cargoList();
  }
};

//****************************EVENT LISTENERS***************************************//
//eventlisteners - engines
$addEngine.addEventListener("click", addEngine);
$engines.addEventListener("change", onEngineSelectStack);

//eventlisteners - cargo
$addCargo.addEventListener("click", addCargo);
$cargoList.addEventListener("change", onCargoSelectStack);

//eventlisteners - lbs_ton toggle
$weight_toggle.addEventListener("change", update_weightUnit);
