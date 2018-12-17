<?PHP
session_start();
if(!isSet($_SESSION["hash"])) {
    $_SESSION["hash"] = time().rand().rand().rand();
}
if(!isset($_COOKIE['cookiemonster'])) {
    $cookie_value = time().rand().rand().rand();
    setcookie('cookiemonster', $cookie_value, time()+606024*365, "/"); // 365 dayz
}
?>
<?PHP include "header.php"; ?>

<div style="max-width: 1400px; margin: 0 auto;">

	<div style="width: 100%; padding: 10px 0; text-align: center; font-family: monospace;">Only types.xml format supported at the moment</div>
	<div id="root">
		<h1 style="text-align: center;">Drag & Drop config file to get started</h1>
	</div>
</div>
	<script type="text/javascript">
	  try {
	    new Function("(a = 0) => a");
	  } catch (err) {
	    alert('Your browser is outdate, please update');
	  }
	</script>
	<script type="text/babel" src="js/app/constants.jsx"></script>
	<script type="text/babel" src="js/app/style.jsx"></script>
	<script type="text/babel" src="js/app/utilities.jsx"></script>
	<script type="text/babel" src="js/app/index.jsx"></script>

	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-50877463-3"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'UA-50877463-3');
	</script>
</body>
</html>