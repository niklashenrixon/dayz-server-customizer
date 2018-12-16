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
	
	<div id="uploadWrapper">
		<div id="uploader">Drop config file here</div>
	</div>
	<div id="video">VIDEO</div>
	<div id="root"></div>
</div>
<script type="text/babel" src="app.jsx" rel="preload"></script>
</body>
</html>