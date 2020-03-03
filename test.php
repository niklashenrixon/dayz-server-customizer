<?PHP
include "lib/xmlValidator.php";

$validator = new DomValidator;
$validated = $validator->validateFeeds('types.xml');
if ($validated) {
  echo "XML file successfully validated";
} else {

    $arr = $validator->displayErrors();
    foreach ($arr as $error) {
        $errorLine = substr($error, strpos($error, '(Line:')+1);
        $errorLine = str_replace("):", " - ", $errorLine);
        $errorLine = explode(" - ", $errorLine);
        echo "<mark>".$errorLine[0]."</mark> - ".$errorLine[1]."<br />";
    }
    unset($value);
}

?>