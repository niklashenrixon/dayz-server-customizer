<?PHP
session_start();
header('Content-Type: application/json');

function throwError($msg) {
	$message = '{"error":"'.$msg.'"}';
	exit($message);
}

$uploadOk = 1;
$filetype = strtolower(pathinfo($_FILES["uploadedfile"]["name"], PATHINFO_EXTENSION));
$uploadDir = 'uploads/' . $_COOKIE['cookiemonster'] . '/';

// Check file size
if ($_FILES["uploadedfile"]["size"] > 10000000) {
	throwError("Sorry, your file is too large. It cannot exceed 1 mb in size");
	$uploadOk = 0;
}

// Allow certain file formats
if($filetype != "xml") {
	throwError("only XML files allowed");
	$uploadOk = 0;
}

$approvedFile = FALSE;
$tmpxml = simplexml_load_file($_FILES["uploadedfile"]["tmp_name"]) or throwError("Upload one of these files: economy.xml , events.xml , globals.xml , types.xml. Or your XML file is corrupt or containing errors");

switch ($tmpxml->getName()) {
	case "types": $filename = 'types'; break;
	case "economy": $filename = 'economy'; break;
	case "events": $filename = 'events'; break;
	case "variables": $filename = 'globals'; break;
	default:
		throwError("Upload one of these files: economy.xml , events.xml , globals.xml , types.xml. Or your XML file is corrupt or containing errors");
}

// if everything is ok, try to upload file
$target_file = $uploadDir . basename($_FILES["uploadedfile"]) . $filename . '_' . $_SESSION["hash"].'.'.$filetype;

if($uploadOk) {
	if (!file_exists($uploadDir)) {
		mkdir($uploadDir, 0777, true);
		chmod($uploadDir, 0777);
	}

	if (move_uploaded_file($_FILES["uploadedfile"]["tmp_name"], $target_file)) {
		chmod($target_file, 0777);
		$xmlSave = simplexml_load_file('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'_'.$_SESSION["hash"].'.xml') or throwError("Internal error");
		foreach($xmlSave->children() as $item) {
			$obj = get_object_vars($item);
			$category = (string)$item->category[name];
			if ($category === "") {
				$category = null;
			}
			// DUDE WTF IS THIS PIECE OF SHIT
			$itemName = $item[name];
			$data->{$itemName}->nominal = $obj['nominal'];
			$data->{$itemName}->min = $obj['min'];
			$data->{$itemName}->restock = $obj['restock'];
			$data->{$itemName}->cost = $obj['cost'];
			$data->{$itemName}->category = $category;
			$data->{$itemName}->lifetime = $obj['lifetime'];
		}
		$response->data = $data;
		$response->fileType = $filename;
		$janne = json_encode($response, JSON_PRETTY_PRINT);
		print_r($janne);
	} else {
		echo json_encode("{ error: 'FUCK YOU'}");
 	}
}


?>
