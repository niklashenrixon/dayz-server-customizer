<?PHP
include "header.php";

session_start();

$data = json_decode($_POST['data'], true);
$filename = $data['fileType'];

$xmlSave = simplexml_load_file('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'_'.$_SESSION["hash"].'.xml') or die("Could not load file");

$arrayIndex = 0;

foreach($xmlSave->children() as $types) { 
	if(isset($types->nominal)) {
		$types->nominal  = $data['data'][$arrayIndex]['nominal'];
		$types->min      = $data['data'][$arrayIndex]['min'];
		$types->restock  = $data['data'][$arrayIndex]['restock'];
		$types->cost     = $data['data'][$arrayIndex]['cost'];
		$types->lifetime = $data['data'][$arrayIndex]['lifetime'];
	} else {
		$types->lifetime = $data['data'][$arrayIndex]['lifetime'];
	}
	$arrayIndex = $arrayIndex + 1;
}

// Save xml file from memory to harddrive
$xmlSave->asXml('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'_'.$_SESSION["hash"].'.xml');

// Change file permissions to we can overwrite the file nexttime
chmod('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'_'.$_SESSION["hash"].'.xml', 0777);

if (!copy('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'_'.$_SESSION["hash"].'.xml', 'uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'.xml')) {
    echo "failed to create file";
}

chmod('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'.xml', 0777);

// Set new session hash if user wants to generate new file in same session
$_SESSION["hash"] = time().rand().rand().rand();

?>

<div class="container">
	<div class="download">
		<?PHP echo '<p>Here you go my fellow survivor, I present to you, a file: <a href="uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'.xml" download>'.$filename.'.xml</a></p>'; ?>
	</div>
	
	<div class="PrevFiles">
		<p class="pftitle">Previously generated files</p>
		<?PHP
			$dir    = 'uploads/'.$_COOKIE['cookiemonster'];
			$files1 = scandir($dir,1);
			echo '<div class="prevfilecont">';

			foreach ($files1 as $k => $v) {

				if(1 === preg_match('~[0-9]~', $v)) {
					$arr = explode("_", $v, 2);
					$neme = $arr[0];
					echo '<p>';
					echo '<a title="'.date("H:m:s", filemtime($dir.'/'.$v)).'" href="'.$dir.'/'.$v.'" download>'.$neme.'.xml</a><br />'.date("Y-m-d", filemtime($dir.'/'.$v));
					echo '</p>';
				}
			}
			echo '</div>';
		?>
	</div>

</div>

</body>
</html>