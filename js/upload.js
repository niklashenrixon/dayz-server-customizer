  window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
  },false);
  

window.addEventListener("load", function () {
  // IF DRAG-DROP UPLOAD SUPPORTED
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const processingText = '<span class="spinner">⚙️</span> Processing'
    const idleText = 'Drop config file here'
    /* [THE ELEMENTS] */
    var uploader = document.getElementById('uploader')
    if (!uploader) {
      return
    }
    /* [VISUAL - HIGHLIGHT DROP ZONE ON HOVER] */
    uploader.addEventListener("dragenter", function (e) {
      e.preventDefault();
      e.stopPropagation();
      uploader.classList.add('highlight');
    });
    uploader.addEventListener("dragleave", function (e) {
      e.preventDefault();
      e.stopPropagation();
      uploader.classList.remove('highlight');
    });

    /* [UPLOAD MECHANICS] */
    // STOP THE DEFAULT BROWSER ACTION FROM OPENING THE FILE
    uploader.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    // ADD OUR OWN UPLOAD ACTION

    uploader.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      uploader.classList.remove('highlight');
      uploader.innerHTML = processingText
      // RUN THROUGH THE DROPPED FILES + AJAX UPLOAD
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        var xhr = new XMLHttpRequest(),
            data = new FormData(),
            fileName = e.dataTransfer.files[i].name

        data.append('uploadedfile', e.dataTransfer.files[i]);
        xhr.open('POST', 'uploader.php', true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // SERVER RESPONSE
              const response = JSON.parse(xhr.response)
              if (response.error) {
                uploader.innerHTML = idleText
                alert(response.error)
                return 
              }

              window.XMLData = response
              const evt = new CustomEvent('receiveData');
              window.dispatchEvent(evt)
              uploader.innerHTML = "Edit " + fileName + " or drop another one"
              window.fileName = fileName
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
  }
  // FALLBACK - HIDE DROP ZONE IF DRAG-DROP UPLOAD NOT SUPPORTED
  else {
    document.getElementById('uploader').style.display = "none";
  }
});

