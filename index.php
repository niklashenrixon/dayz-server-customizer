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
<?PHP include "header.html"; ?>

<div class="container-fluid">

	<!-- DROP ZONE -->
	<div id="uploader">Drop File Here</div>

	<!-- STATUS -->
	<div id="upstat"></div>

	<form class="uploadForm" action="upload.php" method="post" enctype="multipart/form-data">
		<br />
	    <input type="file" name="uploadedfile" id="uploadedfile" accept=".xml">
	    <input type="submit" value="Upload XML file" name="submit">
	</form>
</div>
</body>
</html>