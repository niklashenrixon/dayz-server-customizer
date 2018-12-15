<?PHP
session_start();

if(!isSet($_SESSION["hash"])) {
	$_SESSION["hash"] = time().rand();
}

if(!isset($_COOKIE['cookiemonster'])) {
	$cookie_value = time().rand();
	setcookie('cookiemonster', $cookie_value, time()+60*60*24*365, "/"); // 365 dayz
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
</head>
<body>
<section class="header">
	<?PHP include "header.html"; ?>
</section>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Upload your "types.xml" file here:<br >
    <input type="file" name="uploadedfile" id="uploadedfile">
    <input type="submit" value="Upload XML file" name="submit">
</form>
<p>the types.xml file is located "C:\Program Files (x86)\Steam\steamapps\common\DayZServer\mpmissions\dayzOffline.chernarusplus\db\" HERE</p>

</body>
</html>