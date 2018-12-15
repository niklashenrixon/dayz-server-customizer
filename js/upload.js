window.addEventListener("load", function () {
  // IF DRAG-DROP UPLOAD SUPPORTED
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    /* [THE ELEMENTS] */
    var uploader = document.getElementById('uploader'),
        upstat = document.getElementById('upstat');

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

      // RUN THROUGH THE DROPPED FILES + AJAX UPLOAD
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        var xhr = new XMLHttpRequest(),
            data = new FormData();
        data.append('uploadedfile', e.dataTransfer.files[i]);
        xhr.open('POST', 'upload.php', true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              // SERVER RESPONSE
              var fstat = document.createElement('div');
              fstat.innerHTML = xhr.responseText;
              upstat.appendChild(fstat);
            } else {
              // ERROR
              var fstat = document.createElement('div');
              fstat.innerHTML = xhr.statusText;
              upstat.appendChild(fstat);
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