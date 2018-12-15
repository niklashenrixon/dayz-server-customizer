<?PHP
session_start();
if(!isSet($_SESSION['hash'])) {
	$_SESSION["hash"] = time().rand();
};
?>
<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<style>
	body {
		font-family: 'Open Sans', sans-serif;
	}

	table {
	    border-collapse: collapse;
	}

	td, th {
	    border: 1px solid #dddddd;
	    text-align: left;
	    padding: 8px;
	}

	tr:nth-child(even) {
	    background-color: #dddddd;
	}
	</style>
</head>
<body>

<h1>DayZ Standalone Server Loot table modifier</h1>
<h3>Script by NIXON | 2018</h3>
<h3>n i x o n ( a t ) s k y n 1 . s e</h3>
<hr>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Upload your "types.xml" file here:<br >
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload XML file" name="submit">
</form>
<p>the types.xml file is located "C:\Program Files (x86)\Steam\steamapps\common\DayZServer\mpmissions\dayzOffline.chernarusplus\db\" HERE</p>

</body>
</html>