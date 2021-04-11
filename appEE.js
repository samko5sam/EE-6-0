'use strict';

class toastAlert{
  constructor(toastname,message,position){
    this.name = toastname.toString();
    this.message = message.toString();
    if (position === "top") {
      this.position = "top";
    } else {
      this.position = "bottom";
    }
    this.htmlContent = `
    <div id="${this.name}" data-role-toast class="toast align-items-center text-white bg-primary border-0 position-absolute p-1 ${this.position}-0 end-0" role="status" aria-live="polite" aria-atomic="true">
      <div class="d-flex">
        <div data-role-toast-body class="toast-body">${this.message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    `;
  }
}
class textModal{
  constructor(toastname,title,message){
    this.name = toastname.toString();
    this.title = title.toString();
    this.message = message.toString();
    this.htmlContent = `
<div class="modal fade" id="${this.name}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${this.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="check-local-storage-dialog-modal-html modal-body">
        ${this.message}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
      </div>
    </div>
  </div>
</div>
    `;
  }
}

const bodyContainer = document.querySelector('[data-role-container]');
let buttons = document.querySelectorAll('.btn');

document.addEventListener("DOMContentLoaded",loadPage);

function loadPage(){
  generatePage();
  buttons.forEach(addButtonClickEventListener);
}
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
function generatePage(){
  if (htmlContent_notification_content !== "" && checkLocalStorage("firstTime").toString() !== "no") {
    showTemporaryTextModal("Hello",htmlContent_modal_content+htmlContent_howToUse);
    showTemporaryToastAlert(htmlContent_notification_content,false,"bottom");
    localStorage.setItem("firstTime",JSON.stringify(["no"]));
  }
}
function addButtonClickEventListener(item) {
  let x = item.dataset.button;
  if (x !== undefined && x !== "") {
    item.addEventListener("click",myclickButton);
  }
}
function myclickButton(e) {
  let item = e.target;
  let mydata = item.dataset.button;
  if (mydata === "remove-first-time") {
    localStorage.removeItem("firstTime");
    showTemporaryToastAlert("removed",true,"top")
  } else if (mydata === "reload-page"){
    location.reload();
  }
}

function showTemporaryToastAlert(message,toautohide,position){
  const mytoastAlert_notification = new toastAlert("mytoastAlert_notification",message,position);
  bodyContainer.innerHTML += mytoastAlert_notification.htmlContent;
  const mytoastname = mytoastAlert_notification.name;
  let toast = document.querySelector(`#${mytoastname}`);
  if (toautohide === "") {
    toautohide = ture;
  }
  let bootstraptoastAlert_notification = new bootstrap.Toast(toast,{autohide:toautohide});
  toast.addEventListener('hidden.bs.toast', function () {
    toast.removeEventListener;
    buttons = document.querySelectorAll('.btn');
    buttons.forEach(addButtonClickEventListener);
    toast.remove();
  })
  bootstraptoastAlert_notification.show();
}
function showTemporaryTextModal(title,message){
  const myTextModal_notification = new textModal("myTextModal_notification",title,message);
  bodyContainer.innerHTML += myTextModal_notification.htmlContent;
  const myModalname = myTextModal_notification.name;
  let modal = document.querySelector(`#${myModalname}`);
  let bootstrapTextModal_notification = new bootstrap.Modal(modal,{keyboard: false});
  modal.addEventListener('hidden.bs.modal', function () {
    modal.removeEventListener;
    buttons = document.querySelectorAll('.btn');
    buttons.forEach(addButtonClickEventListener);
    modal.remove();
  })
  bootstrapTextModal_notification.show();
}