let htmlContent_notification_content = "馬上開始使用alsonow吧！";
let htmlContent_modal_content = `
<h1>Hello</h1>
你好，這是您第一次使用此瀏覽器進入alsonow
<blockquote>用ALSONOW幫你一次搜尋多網站吧！只需輸入一次關鍵字，就可以一次搜尋多個網站。</blockquote>
<hr>
`;
let htmlContent_howToUse = `
<h1>How To Use</h1>
使用滑鼠操控<br>
<img src="https://alsonow.neocities.org/img/alsonow_icon.png" width="100%">
`;
let htmlContent_modalHtml_dictionaryConfig = `
<!-- 字典設定modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dictionary-config-panel-modal"><i class="bi bi-toggles"></i>字典設定</button>
<div class="modal fade" id="dictionary-config-panel-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-toggles"></i>字典設定</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="dictionary-config-panel"></div>
        <div class="d-grid gap-2">
          <button type="button" class="add-field-button p-3 btn btn-outline-secondary"><i class="bi bi-plus-square"></i>新增欄位</button>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="import-dictionary-config-button btn btn-outline-secondary"><i class="bi bi-file-text"></i>匯入設定</button>
        <button type="button" class="save-dictionary btn btn-primary"><i class="bi bi-save"></i>儲存</button>
      </div>
    </div>
  </div>
</div>
`;
let htmlContent_modalHtml_checkLocalStorage = `
<!-- checkLocalStorage modal -->
<button type="button" class="check-localstorage-button btn btn-info"><i class="bi bi-save"></i>檢查及匯出本機資料</button>
<div class="modal fade" id="check-local-storage-dialog-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-save"></i>檢查及匯出本機資料</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="check-local-storage-dialog-modal-html modal-body">
  
      </div>
      <div class="check-local-storage-dialog-export-dictionary-config">
        <p><i class="bi bi-code-square"></i>匯出設定</p><br>
        <textarea class="export-dictionary-config-textarea form-control-plaintext" rows="5"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
      </div>
    </div>
  </div>
</div>
`;
let htmlContent_modalHtml_importConfig = `
<!-- import dictionary config modal -->
<div class="modal fade" id="import-dictionary-config-dialog-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><i class="bi bi-toggles"></i>匯入設定（這將直接改動localStorage內容）</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="import-dictionary-config-dialog-modal-html modal-body mb-3">
        <select class="import-dictionary-config-select form-select" aria-label="Default select example">
        </select>
        <textarea class="import-dictionary-config-textarea form-control" rows="10"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="import-dictionary-button btn btn-secondary"><i class="bi bi-file-text"></i>匯入</button>
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>
`;
let htmlContent_navHtml_beforeStickyNav = `
<div class="p-4 bg-secondary text-white">
  <a href="https://alsonow.neocities.org/" target="_blank" class="text-white btn btn-outline-dark border-0">
    <img src="https://alsonow.neocities.org/img/alsonow_icon.png" alt="alsonow" width="30" height="24" class="d-inline-block align-text-top">
    alsonow
  </a>
</div>
`;
let htmlContent_navHtml_stickyNav = `
<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="form-floating">
      <input type="text" class="form-control form-control-lg" id="floatingInput" placeholder="alsonow">
      <label for="floatingInput">alsonow</label>
    </div>
  </div>
</nav>
`