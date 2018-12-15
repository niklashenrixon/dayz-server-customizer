<?PHP include "header.html"; ?>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>

<div id="root"></div>
<script type="text/babel" src="app.jsx"></script>


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

	echo "PREVIEW:";

	// Show save button or upload form
	echo '<a href="?save&amount='.$_GET['amount'].'">Save changes to file and download</a><br />';

	// Load XML
	$xmlSave = simplexml_load_file('uploads/'.$_COOKIE['cookiemonster'].'/'.$_GET['upload'].'_'.$_SESSION["hash"].'.xml') or die("Error");

	if($xmlSave->getName() == "types") { echo "The type is loot table"; }
	if($xmlSave->getName() == "economy") { echo "The type is economy"; }
	if($xmlSave->getName() == "events") { echo "The type is events"; }
	if($xmlSave->getName() == "variables") { echo "The type is variables"; }

	echo '<div class="container"><table class="shadow table table-hover table-sm table-dark rounded">
		<thead>
			<tr>
				<th>Item</th>
				<th>Amount (MAX)</th>
				<th>Amount (MIN)</th>
				<th>Restock timer</th>
				<th>Cost</th>
				<th>Category</th>
			</tr>
		</thead>';
	foreach($xmlSave->children() as $types) {
		echo "<tr><td>" . $types[name] . "</td>";
	    if(isset($types->nominal)) {
			echo "<td>".$types->nominal . "</td>";
			echo "<td>".$types->min . "</td>";
			echo "<td>".$types->restock . "</td>";
			echo "<td>".$types->cost . "</td>";
			echo "<td>".$types->category[name] . "</td></tr>";

	    } else {
	    	echo "<td> - </td>";
	    	echo "<td> - </td>";
			echo "<td> - </td>";
			echo "<td> - </td>";
			echo "<td> - </td></tr>";
	    }
	}
	echo '</table></div>';
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



<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>