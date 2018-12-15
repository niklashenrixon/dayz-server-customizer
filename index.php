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

<div class="container">

	<!-- DROP ZONE -->
	<center><div id="uploader">Drop File Here<br><br>OR<br><br>use the buttons below</div></center>

	<!-- STATUS -->
	<div id="upstat"></div>

	<form class="uploadForm" action="upload.php" method="post" enctype="multipart/form-data">
		<br />
	    <input type="file" name="uploadedfile" id="uploadedfile" accept=".xml"><input type="submit" value="Upload XML file" name="submit">
	</form>
</div>
</body>
</html>