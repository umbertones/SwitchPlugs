function sh_init() //ipsh ist ein JSON-Array mit den Shelley-IP-Adressen und der css-ID des Feldes
{
  let respo={txt:""};
	//Basiswerte holen
  var	inis = new getvals();
    
  for (let i=0;i<inis.anzahl;i++)
	{  	
		// Setzt die CSS-Buttons entsprechend dem Status des Shelly
		this.shsetbuttonstate(inis.baseURL,inis.ipsh.ipad[i],inis.ipsh.buttonid[i],i);
 	}
 
}

function shsetbuttonstate(baseURL,ipsh_act,buttid,idx)
{
	var req = new XMLHttpRequest();
  
 	req.onreadystatechange = function()
  {
  	if (this.readyState == 4 && this.status == 200)
  	{
		  var checkBox = document.getElementById(buttid);
		//console.log(JSON.stringify(req.response));
  		const retjs=JSON.parse(req.response);

			if (retjs.ison == true )
			{
				checkBox.checked=true;
				var s_idx=idx+1;
				window.sw_sh1(s_idx.toString());
			}
			else
				checkBox.checked=false;
  	}
  };
  req.open('GET', baseURL+"ipshl="+ipsh_act+"&cmd=relay&gen=1");
 	req.send(null);
}

function shlink(num)
{
	  var	inis = new getvals();
    arind=Number(num)-1;
    url2op="http://"+inis.ipsh.ipad[arind];
	  window.open(url2op,'_blank');
}

// Hier wird das Script auf das verwendete Netz angepasst
function getvals()
{
	//Hier liegt die Website mit dem php-Skript (weil die Shellys kein https können, kann man sie nicht direkt aufrufen (Sicherheitsthema bei Chrome und Firefox))
  this.baseURL="https://SERVER/PATH/sh.php?";
  //Anzahl der Shelleys im Netz - noch nicht im Einsatz
  this.anzahl=3;
  //cssid sind die IDs der DIV im index.html, ipad sind die URL-Endungen, die sich im Netz unterscheiden - ich habe zwei Netze 10.xx und 100.xx
  // Wenn man die ganze URL hier eingeben will, muss man im sh.php die stdURL anpassen!
  ipdata='{"ipad":["192.168.23.99","192.168.23.100","192.168.23.105"],"genAPI":["1","1","2"], "buttonid":["Sh1","Sh2","Sh3"], "cssid":["stat1","stat2","stat3"], "cssid2":["temp1","temp2","temp3"]}';
  this.ipsh=JSON.parse(ipdata);
}

function sw_sh1(num)     
{
  const MAX_REPEAT=300; // Maximal 10 min die Seite automatisch refreshen
  let counter={val:0};
  let respo={txt:""};
  var quiet=0; // wenn 0 gibt ivstat den String in respo zurück, wenn 1 setzt sie das innerHTML selber
  var arind=-1; // Array Index fürs ipsh array
  
	//Basiswerte holen
	inis = new getvals();
  // Get the checkbox
  // Use Num to get the arrayindex
  arind=Number(num)-1;
  	
	ipsh_act=inis.ipsh.ipad[arind];
	css_act=inis.ipsh.cssid[arind];
	css2_act=inis.ipsh.cssid2[arind];
	gen=inis.ipsh.genAPI[arind];

  var checkBox = document.getElementById(inis.ipsh.buttonid[arind]);

  // Automatischer Aufruf ist nicht quiet
  var iv_func = setInterval(ivstat,2000,inis.baseURL,gen,ipsh_act,css_act,css2_act,1,respo,counter);
  	
  var req = new XMLHttpRequest();
  
  if (checkBox.checked == true)
  {
	  this.ivstat(inis.baseURL,gen,ipsh_act,css_act,css2_act,1,respo,counter);
    req.open('GET', inis.baseURL+"ipshl="+ipsh_act+"&cmd=on");
		//Gleichmal aufrufen und Werte eintragen
	}
  else 
    req.open('GET', inis.baseURL+"ipshl="+ipsh_act+"&cmd=off");
 	
 	req.send(null);
 	
 	if (counter.val > MAX_REPEAT)
 		clearInterval(ivfunc);
 		
};

function ivstat(baseURL,gen,ipsh,csssh,csssh2,quiet,respo,counter)
{
    var req2 = new XMLHttpRequest();
    req2.onreadystatechange = function()
    {
    	if (this.readyState == 4 && this.status == 200)
    	{
    		const retjs=JSON.parse(req2.response);
    		if (gen == "1") 
    		{
		  		outp1=JSON.stringify(retjs.meters);
		      tmpr=JSON.parse(retjs.temperature);
		  		outp2=outp1.slice(1,-1);
				  const retjs2=JSON.parse(outp2);
		  		pwr=retjs2.power;
		  	}
		  	else // Gen2
		  	{
    			pwr=JSON.parse(retjs.apower);
		  		tmpr1=JSON.stringify(retjs.temperature);
		  		//outp2=tmpr1.slice(1,-1);
		  		//console.log(outp2);
		  		const retjs2=JSON.parse(tmpr1);
		  		tmpr=retjs2.tC;
		  	}
				// Prepare Data
				outp="Power: "+pwr.toString()+" W";
				outp2="Temperatur: "+tmpr.toString()+" grd C";
				if (quiet==1) // Normaler Arbeitsbetrieb
				{
					document.getElementById(csssh).innerHTML = outp;
					document.getElementById(csssh2).innerHTML = outp2;
					counter.val+=1;
				}
				else
					respo.txt="{"+outp+","+outp2+"}";
    	}
    };
    
 	  var calluri=baseURL+"ipshl="+ipsh+"&cmd=status&gen="+gen;
  	req2.open('GET',calluri);
  	req2.send(null);
};

