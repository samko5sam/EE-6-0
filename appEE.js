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
<input type="text" autocomplete="off" class="form-control form-control-lg dictionary-config-panel-text-input" aria-label="enter dictionary search url">
<button type="button" class="remove-field-button btn btn-outline-secondary"><i class="bi bi-x-circle"></i></button>
</div>
`;
let dictionaryNumber;
let dictionaryLimit = 15;
let myhistory;
let keylist = ["config","dictionaryList"];

let dictionaryConfigPanel = document.querySelector(".dictionary-config-panel");
let checkLocalstorageButton = document.querySelector(".check-localstorage-button");
let addFieldButton = document.querySelector(".add-field-button");
let saveDictionaryButton = document.querySelector(".save-dictionary");
let dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
let toastBody = document.querySelector(".toast-body");
let checkLocalStorageDialogModalHtml = document.querySelector(".check-local-storage-dialog-modal-html");
let exportDictionaryConfigButton = document.querySelector(".export-dictionary-config-button");
let importDictionaryConfigButton = document.querySelector(".import-dictionary-config-button");

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
exportDictionaryConfigButton.addEventListener("click",clickButton);
importDictionaryConfigButton.addEventListener("click",clickButton);

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
  for (var i = 0; i < keylist.length; i++) {
    x = checkLocalStorage(keylist[i]);
    htmlcontent += keylist[i]+" : ";
    if (x.length !== 0) {
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
  if (dictionaryNumber < dictionaryLimit && dictionaryNumber >= 0) {
    dictionaryConfigPanel.innerHTML += dictionaryConfigPanelTextInput_Html;
    dictionaryNumber += 1;
    if (dictionaryNumber >= dictionaryLimit) {
      addFieldButton.classList.add("disabled");
    }
  }
  dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
  for (var i = 0; i < myhistory.length; i++) {
    if (myhistory[i] !== "" && myhistory[i] !== undefined) {
      dictionaryConfigPanelInput[i].value = myhistory[i];
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
    saveDictionaryAction(x);
  } else if (buttonclass === "import-dictionary-config-button") {
    importDictionaryConfig();
  } else if (buttonclass === "export-dictionary-config-button") {
    exportDictionaryConfig();
  }
}
function dictionaryInput() {
  let dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
  let inputvalues = [];
  for (var i = 0; i < dictionaryConfigPanelInput.length; i++) {
    inputvalues.push(dictionaryConfigPanelInput[i].value)
  }
  return inputvalues;
}
function saveDictionaryAction(myjson) {
  let x = myjson;
  localStorage.setItem("dictionaryList",JSON.stringify(x));
  showBootstrapToastAlert("已儲存");
  dictionaryConfigPanelModal.hide();
}
function createDictionaryConfigPanel() {
  let x = checkLocalStorage("dictionaryList");
  if (x.length !== 0) {
    for (var i = 0; i < x.length; i++) {
      dictionaryConfigPanel.innerHTML += dictionaryConfigPanelTextInput_Html;
    }
    dictionaryConfigPanelInput = document.querySelectorAll(".dictionary-config-panel-text-input");
    for (var i = 0; i < x.length; i++) {
      dictionaryConfigPanelInput[i].value = x[i];
    }
    dictionaryNumber = x.length;
  } else {
    dictionaryConfigPanel.innerHTML += dictionaryConfigPanelTextInput_Html;
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
  importDictionaryConfigDialogModal.show();
}
function exportDictionaryConfig() {

}
