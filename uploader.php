<?PHP
session_start();
include "lib/functions.php";

header('Content-Type: application/json');

$jsonRespons = array("definitions"=>array(), "data"=>array(), "fileType"=>"types");

array_push($jsonRespons['definitions'],
		array(
			"name" => "name",
			"label" => "Name",
			"type" => "readonly",
			"visible" => true,
		),
		array(
			"name" => "min",
			"label" => "Minimum",
			"type" => "number",
			"min" => 0,
			"visible" => true,
		),
		array(
			"name" => "max",
			"label" => "Maximum",
			"type" => "number",
			"min" => 0,
			"visible" => true,
		),
		array(
			"name" => "quantMin",
			"label" => "Quantity Minimum",
			"type" => "number",
			"min" => 0,
			"max" => 100,
			"visible" => true,
		),
		array(
			"name" => "quantMax",
			"label" => "Quantity Maximum",
			"type" => "number",
			"min" => 0,
			"max" => 100,
			"visible" => true,
		),
		array(
			"name" => "priority",
			"label" => "Priotity",
			"symbol" => "%",
			"type" => "number",
			"min" => 0,
			"max" => 100,
			"visible" => true,
		),
		array(
			"name" => "restock",
			"label" => "Restock Timer",
			"symbol" => "s",
			"type" => "number",
			"min" => 0,
			"max" => 100000,
			"visible" => true,
		),
		array(
			"name" => "lifetime",
			"label" => "Lifetime Timer",
			"symbol" => "s",
			"type" => "number",
			"min" => 0,
			"max" => 100000,
			"visible" => true,
		),

		array(
			"name" => "category",
			"label" => "Category",
			"symbol" => "",
			"type" => "readonly",
			"visible" => true,
		),

		array(
			"name" => "flags",
			"label" => "Flags",
			"type" => "multiselect",
			"options"=>array(
				"count_in_cargo",
				"count_in_hoarder",
				"count_in_map",
				"count_in_player",
				"crafted",
				"deloot"
			),
			"visible" => false,
		),

		array(
			"name" => "tags",
			"label" => "Tags",
			"type" => "multiselect",
			"options"=>array(
				"floor",
				"shelves",
				"ground"
			),
			"visible" => false,
		),

		array(
			"name" => "tiers",
			"label" => "Tiers",
			"type" => "multiselect",
			"options"=>array(
				"Tier1",
				"Tier2",
				"Tier3",
				"Tier4"
			),
			"visible" => false,
		),
	
		array(
			"name" => "usage",
			"label" => "Usage",
			"type" => "multiselect",
			"options"=>array(
				"Military",
				"Police",
				"Medic",
				"Firefighter",
				"Industrial",
				"Farm",
				"Coast",
				"Town",
				"Village",
				"Hunting",
				"Office",
				"School",
				"Prison"
			),
			"visible" => false,
		)
);

function throwError($msg) {
	$message = '{"error":"'.$msg.'"}';
	exit($message);
}

$uploadOk = 1;
$filetype = strtolower(pathinfo($_FILES["uploadedfile"]["name"], PATHINFO_EXTENSION));
$uploadDir = 'uploads/' . $_COOKIE['cookiemonster'] . '/';

// Check file size
if ($_FILES["uploadedfile"]["size"] > 10000000) {
	throwError("Sorry, your file is too large. It cannot exceed 1 mb in size");
	$uploadOk = 0;
}

// Allow certain file formats
if($filetype != "xml") {
	throwError("only XML files allowed");
	$uploadOk = 0;
}

$approvedFile = FALSE;
$tmpxml = simplexml_load_file($_FILES["uploadedfile"]["tmp_name"]) or throwError("Upload one of these files: economy.xml , events.xml , globals.xml , types.xml. Or your XML file is corrupt or containing errors");

switch ($tmpxml->getName()) {
	case "types": $filename = 'types'; break;
	case "economy": $filename = 'economy'; break;
	case "events": $filename = 'events'; break;
	case "variables": $filename = 'globals'; break;
	default:
		throwError("Upload one of these files: economy.xml , events.xml , globals.xml , types.xml. Or your XML file is corrupt or containing errors");
}

// if everything is ok, try to upload file
$target_file = $uploadDir . basename($_FILES["uploadedfile"]) . $filename . '_' . $_SESSION["hash"].'.'.$filetype;

if($uploadOk) {
	if (!file_exists($uploadDir)) {
		mkdir($uploadDir, 0777, true);
		chmod($uploadDir, 0777);
	}

	if (move_uploaded_file($_FILES["uploadedfile"]["tmp_name"], $target_file)) {
		chmod($target_file, 0777);
		$xmlSave = simplexml_load_file('uploads/'.$_COOKIE['cookiemonster'].'/'.$filename.'_'.$_SESSION["hash"].'.xml') or throwError("Internal error");

		$x = 0;

		foreach($xmlSave->children() as $types) {

			$jsonID = (int)$x;

			// Non array types
			$jsonName     = (string)ifNull($types[$x]['name']);
			$jsonNominal  = (float)ifNull($types->nominal); 
			$jsonLifetime = (float)ifNull($types->lifetime);
			$jsonRestock  = (float)ifNull($types->restock);
			$jsonMin      = (float)ifNull($types->min);
			$jsonQuantMin = (float)ifNull($types->quantmin);
			$jsonQuantMax = (float)ifNull($types->quantmax);
			$jsonCost     = (float)ifNull($types->cost);
			$jsonCategory = (string)ifNull($types->category['name']);

			// Count in
			$jsonCargo    = (int)ifNull($types->flags['count_in_cargo']);
			$jsonHoarder  = (int)ifNull($types->flags['count_in_hoarder']);
			$jsonMap      = (int)ifNull($types->flags['count_in_map']);
			$jsonPlayer   = (int)ifNull($types->flags['count_in_player']);
			$jsonCrafted  = (int)ifNull($types->flags['crafted']);
			$jsonDeloot   = (int)ifNull($types->flags['deloot']);
			
			$jsonTags     = array();
			$jsonUsage    = array();
			$jsonTiers    = array();

			// TAG
			if(is_null($types->tag['name'])) {
				$jsonTags[] = NULL;
			} else {
				$v = 0;
				foreach($types->tag as $z) {
					$jsonTags[] = (string)$z[$v]['name'];
					$v = $v+1;
				}
			}

			// USAGE
			if(is_null($types->usage['name'])) {
				$jsonUsage[] = NULL;
			} else {
				$v = 0;
				foreach($types->usage as $z) {
					$jsonUsage[] = (string)$z[$v]['name'];
					$v = $v+1;
				}
			}

			// TIER
			if(is_null($types->value['name'])) {
				$jsonTiers[] = NULL;
			} else {
				$v = 0;
				foreach($types->value as $z) {
					$jsonTiers[] = (string)$z[$v]['name'];
					$v = $v+1;
				}
			}

			array_push($jsonRespons['data'], array("id" => $jsonID,
					"name" => $jsonName,
					"min" => $jsonMin,
					"max" => $jsonNominal,
					"quantMin" => $jsonQuantMin,
					"quantMax" => $jsonQuantMax,
					"lifetime" => $jsonLifetime,
					"restock" => $jsonRestock,
					"priority" => $jsonCost,
					"flags" => array(
						"count_in_cargo" => $jsonCargo,
						"count_in_hoarder" => $jsonHoarder,
						"count_in_map" => $jsonMap,
						"count_in_player" => $jsonPlayer,
						"crafted" => $jsonCrafted,
						"deloot" => $jsonDeloot
					),
					"tags" => $jsonTags,
					"usage" => $jsonUsage,
					"tiers" =>$jsonTiers,
					"category" => $jsonCategory
			));

			$x = $x+1;
		}

		$janne = json_encode($jsonRespons, JSON_PRETTY_PRINT);
		print_r($janne);

	} else {
		echo json_encode("{ error: 'FUCK YOU'}");
 	}
}


?>
