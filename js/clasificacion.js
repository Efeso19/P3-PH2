window.onload = clasificacion();
var mostrar="";

function clasificacion(){
		
	var xmlhttp = new XMLHttpRequest();		

	xmlhttp.onreadystatechange = procesarCambio;
	xmlhttp.open('GET', 'rest/clasificacion/?u=10', true);	
	xmlhttp.send();		

	function procesarCambio(){
		/*el objeto tiene 5 estados y .readyState devuelve el valor del estado. Estos son sus estados:
			0: request not initialized 
			1: server connection established
			2: request received 
			3: processing request 
			4: request finished and response is ready
		el emtodo .status devuelve dos valores:
			200: "OK"
			404: Page not found
		*/	
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				var res = JSON.parse(xmlhttp.responseText);
				console.log(res);
				/*Los atributos de la respuesta que forman parte del array
					GANADAS
					JUGADAS
					LOGIN
				*/
				var i=0;
				mostrar="<table><tr><th>Usuario</th><th>Ganadas</th><th>Jugadas</th><th>Ratio de victorias</th></tr>";
				for(i=0; i<res.FILAS.length;i++){
					var ratio= parseInt(res.FILAS[i].GANADAS)/ parseInt(res.FILAS[i].JUGADAS);
					ratio = Math.round(ratio * 100) / 100
					//ratio=ratio*100;
					mostrar+="<tr> <td>"+res.FILAS[i].LOGIN+"</td> <td>"+res.FILAS[i].GANADAS+"</td> <td>"+res.FILAS[i].JUGADAS+"</td> <td>"+ratio+"%</td> </tr>";
				}
				mostrar+="</table>"
				document.getElementById("centrarultimos5viajes").innerHTML=mostrar;
			}
			else{

				//alert("Hubo un problema con los datos devueltos");
				
			}
		}
	}
	
	return false;

}