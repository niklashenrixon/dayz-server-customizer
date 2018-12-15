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
<?PHP
session_start();

$form = '
	Choose how the loot will be modified and press apply to see the change:<br/>
	<form action="">
	  <select name="amount">
	    <option value="2">Loot x2</option>
	    <option value="3">Loot x3</option>
	    <option value="4">Loot x4</option>
	    <option value="5">Loot x5</option>
	    <option value="6">Loot x6</option>
	    <option value="7">Loot x7</option>
	    <option value="8">Loot x8</option>
	    <option value="9">Loot x9</option>
	    <option value="10">Loot x10</option>
	  </select>
	  <br />
	  <input type="hidden" name="apply">
	  <input type="submit" value="Apply change">
	</form><br />';

// Show file after upload
if(isset($_GET['upload'])) {

	echo $form;

	echo "<h2>PREVIEW: </h2>";

	// Show save button or upload form
	echo '<h3><a href="?save&amount='.$_GET['amount'].'">Save changes to file and download</a></h3><br />';

	// Load XML
	$xmlSave = simplexml_load_file('uploads/types_'.$_SESSION["hash"].'.xml') or die("Error");

	echo '
	<table>
		<tr>
			<th><h3>Item</h3></th>
			<th><h3>Amount</h3></th>
		</tr>';

	foreach($xmlSave->children() as $types) {
		echo "<tr><td><strong>" . $types[name] . "</strong></td>";
	    if(isset($types->nominal)) {
			echo "<td>".$types->nominal . "</td></tr>";
	    } else {
	    	echo "<td>No value</td></tr>";
	    }
	}
	echo '</table>';
}

// Apply changes
if(isset($_GET['apply'])) {

	echo $form;

	$amount = $_GET['amount'];

	echo "<h2>PREVIEW: LOOT x".$_GET['amount']."</h2>";

	echo '<h3><a href="?save&amount='.$_GET['amount'].'">Save changes to file and download</a></h3><br />';

	// Load XML
	$xmlSave = simplexml_load_file('uploads/types_'.$_SESSION["hash"].'.xml') or die("Error");
	
	echo '
	<table>
		<tr>
			<th><h3>Item</h3></th>
			<th><h3>Amount (before)</h3></th>
			<th><h3>Amount (after)</h3></th>
		</tr>';

	foreach($xmlSave->children() as $types) {
		echo "<tr><td><strong>" . $types[name] . "</strong></td>";
	    if(isset($types->nominal)) {
			echo "<td>".$types->nominal . "</td>";
			echo "<td>".$types->nominal*$amount . "</td></tr>";
	    } else {
	    	echo "<td>No value</td><td>No value</td></tr>";
	    }
	}
	echo '</table>';
}

// Save and download file
if(isset($_GET['save'])) {

	// Load XML
	$xmlSave = simplexml_load_file('uploads/types_'.$_SESSION["hash"].'.xml') or die("Error");

	foreach($xmlSave->children() as $types) { 
	    if(isset($types->nominal)) {
	    	$types->nominal = $types->nominal*$_GET['amount'];
	    }
	}

	$xmlSave->asXml("generated/types_".$_SESSION["hash"].".xml");
	unlink('uploads/types_'.$_SESSION["hash"].'.xml');
	session_destroy();
	echo "<h3>";
	echo "File has been modified and saved<br/>";
	echo "Download it here: <a href='generated/types_".$_SESSION["hash"].".xml' download='types.xml'>types.xml</a>";
	echo "</h3>";
}
?>

</body>
</html>