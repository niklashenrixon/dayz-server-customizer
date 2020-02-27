<!DOCTYPE html>
<html>
<head>
	<title>DSSC - Dayz standalone server customizer TEST</title>
	<meta charset="utf-8" />
	<link rel="icon" type="image/png" href="favicon.png" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" async defer>
	<link rel="stylesheet" type="text/css" href="css/dssc.css" async defer>
	<script src="dist/upload.js"></script>

</head>
<body>
<?PHP
	function scan_dir($path){
	    $ite=new RecursiveDirectoryIterator($path);

	    $bytestotal=0;
	    $nbfiles=0;
	    foreach (new RecursiveIteratorIterator($ite) as $filename=>$cur) {
	        $filesize=$cur->getSize();
	        $bytestotal+=$filesize;
	        $nbfiles++;
	        $files[] = $filename;
	    }

	    $bytestotal=number_format($bytestotal);

	    return array('total_files'=>$nbfiles,'total_size'=>$bytestotal,'files'=>$files);
	}

	$files = scan_dir('uploads/');

	$users = count(glob("uploads/*", GLOB_ONLYDIR));
	$filecount = $files['total_files'] - $users;
?>	
<section class="header">
	<div class="container">
		<p class="h1 text-center">Dayz Standalone Server Customizer</p>
		<p class="text-center"><?PHP echo '<mark>' . $users . '</mark> users have generated <mark>'. $filecount . '</mark> files with this tool.'; ?><br/>
			Made by <strong><a target="_blank" href="https://www.reddit.com/u/nixonhenrixon">/u/nixonhenrixon</a></strong> & <strong><a target="_blank" href="https://github.com/iJigg">git/iJigg</a></strong><br>
			<style>.bmc-button img{height: 34px !important;width: 35px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{padding: 7px 10px 7px 10px !important;line-height: 35px !important;height:51px !important;min-width:217px !important;text-decoration: none !important;display:inline-flex !important;color:#ffffff !important;background-color:#FF5F5F !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 10px 7px 10px !important;font-size: 20px !important;letter-spacing:-0.08px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Lato', sans-serif !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#ffffff !important;}</style><link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/tHoAcuy"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy us a coffee"><span style="margin-left:15px;font-size:19px !important;">Buy us a coffee</span></a>
			
			<img src="img/discord_logo.jpg" height="50px" /><br />
		
		</p>
	</div>
</section>

<section class="footer">
		<p><code><a href="https://github.com/niklashenrixon/dayz-server-customizer/releases" target="_blank">Build version 1.1.0</a></code> <span class="cookies"> ~ This site uses cookies to count how many files has been created and users have used the tool</span></p>
		<p><code><a href="https://www.reddit.com/r/dayz/comments/a7fsvt/dayz_standalone_server_customizer_httpsdayzskyn1se/" target="_blank">Tell us about your suggestions or problems</a></code></p>
</section>