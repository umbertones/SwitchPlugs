<?php
//

$cmdo = filter_input(INPUT_GET,'cmd',FILTER_SANITIZE_STRING);
$ipad = filter_input(INPUT_GET,'ipshl',FILTER_SANITIZE_STRING);
$gen = filter_input(INPUT_GET,'gen',FILTER_SANITIZE_STRING);

//$cmdo=$_GET['cmd'];
//$ipad=$_GET['ipshl'];

//echo $cmdo;

switch ($cmdo)
{
	case 'on':
     $url="http://".$ipad."/relay/0?turn=on";
     break;
	case 'off':
     $url="http://".$ipad."/relay/0?turn=off";
     break;
	case 'status':
	   if ($gen == "1")
	     $url="http://".$ipad."/status";
	   else
     	 $url="http://".$ipad."/rpc/Switch.GetStatus?id=0";
     break;
	case 'relay':
     $url="http://".$ipad."/relay/0";
     break;
	
	default:
     $url="no idea";

}

//echo $url;

// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);
?>

