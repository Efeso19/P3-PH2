

function crearObjAjax(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}


function envio(form){
	var fd=new FormData(form);
	var objajax =  new crearObjAjax();
	var url="rest/login/";
	


	objajax.onreadystatechange = procesarCambio;
	objajax.open("POST", url, true);

	//objajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objajax.send(fd);


	function procesarCambio(){
		if(objajax.readyState == 4){
			if(objajax.status == 200){
				var res = JSON.parse(objajax.responseText);				
				console.log(res);
				sessionStorage.setItem('logged', 'true');	//SE ESTABLECEN TODOS PARES
				sessionStorage.setItem('clave', res.CLAVE);
				sessionStorage.setItem('login', res.LOGIN);
				sessionStorage.setItem('email', res.EMAIL);
				sessionStorage.setItem('nombre', res.NOMBRE);
				sessionStorage.setItem('foto', res.FOTO);

				sessionStorage.setItem('pwd', document.getElementById("pwd").value);

				var aux=res.ULTIMO_ACCESO;
				var parts = aux.split(' ');
				var parts2= parts[0].split('-');
				var parts3 = parts[1].split(':');
				document.getElementById("transparencia").style.display="initial";
				document.getElementById("loginmsg").innerHTML="Bienvenido "+res.LOGIN+". Tu última conexión fue el "+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+" a las "+parts3[0]+":"+parts3[1]+"<br><input type='button' value='Cerrar' onclick='ToInicio();'/>";
				document.getElementById("loginmsg").style.display = "initial";
				document.getElementById("loguearse").disabled=true;
				//alert("jummm");
				//location.replace("index.html");
			}else if(objajax.status == 401){
				bloquear();
				document.getElementById("transparencia").style.display="initial";
				document.getElementById("loginmsg").innerHTML="Los datos no son corectos.<button onclick='ocultar(form);'>Cerrar</button><br>";
				document.getElementById("loginmsg").style.display="initial";
				

			}else{
				/*alert("hubo algun problemita, k ase");*/
			}
		}

	}

	return false;

}

function ocultar(form){
	document.getElementById("transparencia").style.display="none";
	document.getElementById("loginmsg").style.display="none";
	document.getElementById("login").disabled=false;
	form.reset();
	document.getElementById("login").focus();
	return false;
}

function bloquear(){
	var aux=true;
	//document.getElementById("pwd").disabled=aux;//no se deja actualizar el valor, a veces me pasa
	document.getElementById("login").disabled=true;
	//document.getElementById("regristrar").disabled=true;


}

function ToInicio(){

	window.location.replace("index.html");

}
