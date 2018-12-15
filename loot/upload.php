<?PHP
session_start();

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"])."types_".$_SESSION["hash"].".xml";
$uploadOk = 1;
$uploadedFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check file size
if ($_FILES["fileToUpload"]["size"] > 5000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($uploadedFileType != "xml") {
    echo "Sorry, only XML files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo $_FILES["fileToUpload"]["tmp_name"];
        header('Location: xml.php?upload');
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>