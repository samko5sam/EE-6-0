//資料
//https://cyfangnotepad.blogspot.com/2013/09/javascripthtml.html
//https://www.codegrepper.com/code-examples/c/javascript+page+is+loaded

// let
//Config 方法 myWord fo(frame open) cdic(custom dic) to mode
var config = {
  myWord: "" ,
  cdic: "" ,
  fo: "" ,
  to: "" ,
  mode: ""
};
let dictionaryConfigPanelTextInput_Html = `
<div class="input-group p-3">
<input type="text" autocomplete="off" placeholder="Dictionary Name" class="form-control form-control-lg dictionary-config-panel-name-input">
<input type="text" autocomplete="off" placeholder="search url" class="form-control form-control-lg dictionary-config-panel-text-input">
<button type="button" class="remove-field-button btn btn-outline-secondary"><i class="bi bi-x-circle"></i></button>
</div>
`;
let dictionaryNumber;
let dictionaryLimit = 15;
let myhistory;
let keylist = ["config","dictionaryList","dictionaryListName"];

let dictionaryConfigPanel = document.querySelector(".dictionary-config-panel");
let checkLocalstorageButton = document.querySelector(".check-localstorage-button");
let addFieldButton = document.querySelector(".add-field-button");
let saveDictionaryButton = document.querySelector(".save-dictionary");
let dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
let dictionaryConfigPanelNameInput = document.querySelectorAll(".dictionary-config-panel-name-input");
let toastBody = document.querySelector(".toast-body");
let checkLocalStorageDialogModalHtml = document.querySelector(".check-local-storage-dialog-modal-html");
let importDictionaryConfigButton = document.querySelector(".import-dictionary-config-button");
let importDictionaryButton = document.querySelector(".import-dictionary-button");
let importDictionaryConfigTextarea = document.querySelector(".import-dictionary-config-textarea");
let exportDictionaryConfigTextarea = document.querySelector(".export-dictionary-config-textarea");
let importDictionaryConfigSelect = document.querySelector(".import-dictionary-config-select");

let dictionaryConfigPanelModal = new bootstrap.Modal(document.getElementById('dictionary-config-panel-modal'), {keyboard: false});
let checkLocalStorageDialogModal = new bootstrap.Modal(document.getElementById('check-local-storage-dialog-modal'));
let importDictionaryConfigDialogModal = new bootstrap.Modal(document.getElementById('import-dictionary-config-dialog-modal'));
let mytoast = new bootstrap.Toast(document.querySelector(".toast"));

// addEventListener
document.addEventListener("DOMContentLoaded",domcontentloaded);
checkLocalstorageButton.addEventListener("click",clickButton);
dictionaryConfigPanel.addEventListener("click",clickButton);
addFieldButton.addEventListener("click",clickButton);
saveDictionaryButton.addEventListener("click",clickButton);
importDictionaryConfigButton.addEventListener("click",clickButton);
importDictionaryButton.addEventListener("click",clickButton)

//流程
function domcontentloaded() {
  createDictionaryConfigPanel();
}
// localStorage
function checkLocalStorage(key) {
  let x = key;
  // check
  if (localStorage.getItem(x) === null) {
    x = [];
  }else {
    x = JSON.parse(localStorage.getItem(x));
  }
  return x;
}
function checkAllLocalStorage() {
  let htmlcontent = "";
  let x;
  exportDictionaryConfigTextarea.value = "";
  for (var i = 0; i < keylist.length; i++) {
    x = checkLocalStorage(keylist[i]);
    htmlcontent += keylist[i]+" : <br>";
    if (x.length !== 0 && x[0] !== "") {
      if (exportDictionaryConfigTextarea.value === "" || exportDictionaryConfigTextarea.value === undefined) {
        exportDictionaryConfigTextarea.value += "undefined";
      }
      exportDictionaryConfigTextarea.value += "|";
      exportDictionaryConfigTextarea.value += x.toString();
      htmlcontent += x.toString();
    } else {
      htmlcontent += "未設定";
    }
    htmlcontent += "<hr>";
  }
  checkLocalStorageDialogModalHtml.innerHTML = htmlcontent;
  checkLocalStorageDialogModal.show();
}
function saveLocalStorage(key,additem) {
  if (additem) {
    let x = checkLocalStorage(key);
    x.push(additem);
    localStorage.setItem(key,JSON.stringify(x));
  }
}
function removeLocalItem(key,removeitem) {
  if (removeitem) {
    let x = checkLocalStorage(key);
    x.splice(x.indexOf(removeitem),1);
    localStorage.setItem(key,JSON.stringify(x));
  } else {
    localStorage.clear();
  }
}
function getLocalItem(key) {
  if (key) {
    let x = checkLocalStorage(key);
  }
}
// function
function addDictionaryConfigField() {
  myhistory = dictionaryInput();
  mynamehistory = dictionaryNameInput();
  if (dictionaryNumber < dictionaryLimit && dictionaryNumber >= 0) {
    dictionaryConfigPanel.innerHTML += dictionaryConfigPanelTextInput_Html;
    dictionaryNumber += 1;
    if (dictionaryNumber >= dictionaryLimit) {
      addFieldButton.classList.add("disabled");
    }
  }
  dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
  dictionaryConfigPanelNameInput = document.querySelectorAll(".dictionary-config-panel-name-input");
  for (var i = 0; i < myhistory.length; i++) {
    if (myhistory[i] !== "" && myhistory[i] !== undefined) {
      dictionaryConfigPanelInput[i].value = myhistory[i];
    }
    if (mynamehistory[i] !== "" && mynamehistory[i] !== undefined) {
      dictionaryConfigPanelNameInput[i].value = mynamehistory[i];
    }
  }
}
function removeDictionaryConfigField(e) {
  let item = e.target;
  let inputDiv = item.parentElement;
  if (dictionaryNumber > 1) {
    inputDiv.remove();
    dictionaryNumber = dictionaryNumber -1 ;
    if (dictionaryNumber < dictionaryLimit) {
      addFieldButton.classList.remove("disabled");
    }
  }
  dictionaryInput();
}
function clickButton(e) {
  let x = e.target;
  let buttonclass = x.classList[0];
  if (buttonclass === "check-localstorage-button") {
    checkAllLocalStorage();
  } else if (buttonclass === "add-field-button") {
    addDictionaryConfigField();
  } else if (buttonclass === "remove-field-button") {
    removeDictionaryConfigField(e);
  } else if (buttonclass === "save-dictionary") {
    let x = dictionaryInput();
    let y = dictionaryNameInput();
    saveDictionaryAction(x,y);
  } else if (buttonclass === "import-dictionary-config-button") {
    importDictionaryConfig();
  } else if (buttonclass === "import-dictionary-button") {
    handleImportText(importDictionaryConfigTextarea.value,importDictionaryConfigSelect.value);
  }
}
function dictionaryInput() {
  let dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
  let inputvalues = [];
  for (var i = 0; i < dictionaryConfigPanelInput.length; i++) {
    inputvalues.push(dictionaryConfigPanelInput[i].value);
  }
  return inputvalues;
}
function dictionaryNameInput() {
  let dictionaryConfigPanelNameInput = document.querySelectorAll(".dictionary-config-panel-name-input");
  let inputvalues = [];
  for (var i = 0; i < dictionaryConfigPanelNameInput.length; i++) {
    inputvalues.push(dictionaryConfigPanelNameInput[i].value);
  }
  return inputvalues;
}
function saveDictionaryAction(dictionary,dictionaryname) {
  let x = dictionary;
  let y = dictionaryname;
  localStorage.setItem("dictionaryList",JSON.stringify(x));
  localStorage.setItem("dictionaryListName",JSON.stringify(y));
  showBootstrapToastAlert("已儲存");
  dictionaryConfigPanelModal.hide();
}
function createDictionaryConfigPanel() {
  let x = checkLocalStorage("dictionaryList");
  let y = checkLocalStorage("dictionaryListName");
  dictionaryConfigPanel.innerHTML = "";
  if (x.length !== 0 && x[0] !== "") {
    for (var i = 0; i < x.length; i++) {
      dictionaryConfigPanel.innerHTML += dictionaryConfigPanelTextInput_Html;
    }
    dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
    dictionaryConfigPanelNameInput = document.querySelectorAll(".dictionary-config-panel-name-input");
    for (var i = 0; i < y.length; i++) {
      dictionaryConfigPanelNameInput[i].value = y[i];
    }
    for (var i = 0; i < x.length; i++) {
      dictionaryConfigPanelInput[i].value = x[i];
    }
    dictionaryNumber = x.length;
  } else {
    dictionaryConfigPanel.innerHTML = dictionaryConfigPanelTextInput_Html;
    dictionaryNumber = 1;
  }
}
function showBootstrapToastAlert(message) {
  if (message) {
    toastBody.innerText = message;
  }
  mytoast.show();
}
function importDictionaryConfig() {
  let x = "";
  x += '<option value="allConfig" selected>ALL</option>';
  for (var i = 0; i < keylist.length; i++) {
    x += '<option value="'+keylist[i]+'">'+keylist[i]+'</option>';
  }
  importDictionaryConfigDialogModal.show();
  importDictionaryConfigSelect.innerHTML = x;
}
function handleImportText(texttohandle,type) {
  if (type === "" || type === undefined) {
    type = "allConfig";
  }
  x = texttohandle.split("|");
  for (var i = 0; i < x.length; i++) {
    x[i] = x[i].split(",");
  }
  let indexofconfig = keylist.indexOf("config");
  let indexofdictionarylist = keylist.indexOf("dictionaryList");
  let indexofdictionarylistname = keylist.indexOf("dictionaryListName");
  if (type === "allConfig") {
    localStorage.setItem("config",JSON.stringify(x[indexofconfig]));
    localStorage.setItem("dictionaryList",JSON.stringify(x[indexofdictionarylist]));
    localStorage.setItem("dictionaryListName",JSON.stringify(x[indexofdictionarylistname]));
  }
  importDictionaryConfigDialogModal.hide();
  importDictionaryConfigTextarea.value = "";
  showBootstrapToastAlert("已匯入");
  createDictionaryConfigPanel();
}
