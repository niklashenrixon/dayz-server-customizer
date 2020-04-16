 <?PHP
function ifNull($element) {
    if(is_null($element)) {
        return NULL;
    } else {
        return $element;
    }
}
?>