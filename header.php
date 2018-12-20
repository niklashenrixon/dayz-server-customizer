<!DOCTYPE html>
<html>
<head>
	<title>DSSC - Dayz standalone server customizer</title>
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
		<span class="cookies">This site uses cookies to store some useless values</span>
		</p>
	</div>
</section>

<section class="footer">
		<p><code><a href="https://github.com/niklashenrixon/dayz-server-customizer/releases" target="_blank">[release 1.0.2]</a> ~ <a href="https://www.reddit.com/r/dayz/comments/a7fsvt/dayz_standalone_server_customizer_httpsdayzskyn1se/" target="_blank">Report suggestions or problems here plis 🐒🐒🐒🐒</a></code></p>
		<p><code><a href="http://buymeacoff.ee/tHoAcuy" target="_blank">Buy us a coffee 🍺</a></code></p>
</section>