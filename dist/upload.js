"use strict";

window.addEventListener("load", function () {
  // IF DRAG-DROP UPLOAD SUPPORTED
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    /* [VISUAL - HIGHLIGHT DROP ZONE ON HOVER] */
    document.addEventListener("dragenter", function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.add('highlight');
    });
    document.addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.remove('highlight');
    });
    /* [UPLOAD MECHANICS] */
    // STOP THE DEFAULT BROWSER ACTION FROM OPENING THE FILE

    document.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
    }); // ADD OUR OWN UPLOAD ACTION

    document.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.remove('highlight');
      document.body.classList.add('loading'); // RUN THROUGH THE DROPPED FILES + AJAX UPLOAD

      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        var xhr = new XMLHttpRequest(),
            data = new FormData(),
            fileName = e.dataTransfer.files[i].name;
        data.append('uploadedfile', e.dataTransfer.files[i]);
        xhr.open('POST', 'uploader.php', true);

        xhr.onload = function (e) {
          document.body.classList.remove('loading');

          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // SERVER RESPONSE
              var response = JSON.parse(xhr.response);

              if (response.error) {
                alert(response.error);
                return;
              }

              window.XMLData = response;
              var evt = new CustomEvent('receiveData');
              window.dispatchEvent(evt);
              window.fileName = fileName;
            }
          }
        };

        xhr.onerror = function (e) {
          // ERROR
          // console.error(xhr.statusText);
          alert("Upload error!");
        };

        xhr.send(data);
      }
    });
  } else {
    alert('Your browser is outdate, please update');
  }
});