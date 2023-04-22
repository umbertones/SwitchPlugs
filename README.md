# SwitchPlugs
Einfach Website, um Shelly Plugs (Gen 1 und 2) zu schalten und Leistung und Temperatur anzuzeigen

# Beschreibung
Einfaches Switchboard zum Steuern von Shelly Plug S Steckdosen (Gen 1 und 2 API) mit Anzeige der Leistung und der Temperatur des Sensors. 
Beim Laden der Seite werden die aktuellen Werte ausgelesen und angezeigt.

Ein Click auf den Slider schaltet den Shelly ein und es werden periodisch die Werte für Leistung und Temperatur upgedatet. Nach einiger Zeit schaltet sich die Updatefunktion ab, um das Netz zu entlasten. Ein einfacher Reload läßt die Aktualisierung fortsetzen.
Ein weiterer Click auf den Slider schaltet den Shelly wieder aus.

Ein Click auf den blauen Bereich, wo die Leistung ausgegeben wird, öffnet die Homepage des Shellys direkt in einem neuen Fenster.

# Installation
Die 3 Dateien mit sh.* und die index.html müssen einfach zusammen in ein Verzeichnis eines Web-Servers kopiert werden (getestet mit Apache2).

In der sh.js gibt es eine Funktion getvals, dort wird die vollständige Web-Adresse (URL) der Datei sh.php eingestellt (this.baseURL). Dort wird auch die Anzahl der Shellys auf der Website eingestellt (this.anzahl).

Für jeden Shelly muss im Feld ipdata für den ipad eine IP-Adresse oder eine URL gesetzt werden. Zusätzlich muss im Feld genAPI die API-Generation angegeben werden. Shelly Plus Plugs (mit Bluetooth) sind Gen2 und bekommen eine 2, Shelly Plugs (ohne Bluetooth) Gen1 und bekommeneine 1.

Hinweis: ich betreibe die Steckdosen zusammen mit dem Server bei mir im Heimnetz. Deswegen habe ich für die Shelleys die lokalen IP-Adressen im Einsatz. Ob es mit externen Adressen auch funktioniert, habe ich nicht getestet.

# Erweiterung um zusätzliche Shellys
Für weitere Shellys müssen 3 Dateien angefasst werden.

index.html: 

Jeder h3-Block muss kopiert werden und beim Inputtype müssen die Werte für id und der Parameter bei onclick hochgezählt werden sowie die ids und der onclick-Parameter bei stat und temp am Ende des großen div-Blocks

sh.js: 

In der Funktion getvals muss beim ipdata-Block für ipad jeweils die URL des Shellys angegeben werden und im Feld genAPI 1 oder 2 je nach Typ des Shellys (siehe oben bei Installation). Die weiteren Felder in ipdata zählt man einfach hoch - also z.B. stat3, stat4, Sh3, Sh4 und temp3, temp4.
Die anzahl-Variable muss noch von Hand hochgezählt werden, damit beim Laden der Seite der aktuelle Status der Shellys richtig ausgelesen wird. Das muss noch komfortabler werden

sh.css: 

Hier muss am Ende der Datei die beiden Blöcke erweitert werden, also z.B. an #stat1, #stat2 muss komma-getrennt #stat3 und #stat4 ergänzt werden. Und beim temp-Block genauso.

# Ausblick
- Wenn der Shelly ein Update braucht, wird das angezeigt
- Energieauswertungen, Leistungskurven usw.
