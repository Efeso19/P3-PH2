
function comprobar(){
	if(sessionStorage.getItem('logged')){
		//he accedido desde perfil

	}else{
		//vengo de login

	}

}



function crearObjAjax(){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}



function registrarse(frm){
	var fd = new FormData();
	alert("oderrrr");
		fd = new FormData(frm);
		var l = document.getElementById('usu').value;
		var n = document.getElementById('nombre').value;
		var e = document.getElementById('email').value;
		var p = document.getElementById('pwd').value;
	
	var xmlhttp = crearObjAjax();
	var url="rest/usuario/";

	xmlhttp.onload = function(){
		alert(xmlhttp	.readyState+" "+xmlhttp.status);
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200 ){
				//var usuario = validarUsuario(document.getElementById("usu").value);
				var res = JSON.parse(xmlhttp.responseText);
				console.log(xmlhttp.responseText);
				//machaacar la F

				/*
				sessionStorage.setItem('logged', 'true');	//SE ESTABLECEN TODOS PARES
				sessionStorage.setItem('clave', res.CLAVE);
				*/
				sessionStorage.setItem('logged', 'true');
				sessionStorage.setItem('login', l);	
				sessionStorage.setItem('nombre', n);	
				sessionStorage.setItem('email', e);
				sessionStorage.setItem('pwd', p);
				document.getElementById("usu").disabled=true;
				document.getElementById("pwd").disabled=true;
				document.getElementById("pwd2").disabled=true;
				document.getElementById("nombre").disabled=true;
				document.getElementById("email").disabled=true;
				alert("aqui llego");
				document.getElementById("eliminar").disabled=true;
				document.getElementById("regristrarsebutton").disabled=true;
				document.getElementById("transparencia").style.display="initial";

			
				document.getElementById("loginmsg").style.display = "initial";


				document.getElementById("msgpwd").style.display="none";
								document.getElementById("transparencia").style.display="initial";
				//document.getElementById("loginmsg").innerHTML="Bienvenido "+res.LOGIN+". Tu última conexión fue el "+parts2[0]+"/"+parts2[1]+"/"+parts2[2]+" a las "+parts3[0]+":"+parts3[1]+"<br><input type='button' value='Cerrar' onclick='ToInicio();'/>";
				document.getElementById("loginmsg").innerHTML = "Registrado";
				document.getElementById("loginmsg").style.display = "initial";
				//document.getElementById("loginmsg").innerHTML="Usted se ha registrado correctamente. Redirigiendo al juego.<br><input type='button' value='Cerrar' onclick='ToGame();'/><br>";
				//document.getElementById("regisok").style.display="block";

				
			}else if(xmlhttp.status == 400){
				//alert(document.getElementById("pwd").value+" "+document.getElementById("pwd2").value+" estoy comparando las cotnraseñas");
				validarPassword(document.getElementById("pwd").value, document.getElementById("pwd2").value);
				//alert("Hubo algun problema, tu lo crees?");

			}
		}

		return false;

	};
	xmlhttp.open("POST", url, true);
	var resul = 0;
	
	/*
	if(document.getElementById("foto")!=null){
		//compruebo la foto
		inp = document.getElementById("foto");
		if(inp.files[0]!=null){
			var peso=inp.files[0];
			resul=peso.size;
		}
	}
	if(resul<=500*1024){
		console.log(fd);
		//si es menor de 500kb mmando la foto
		xmlhttp.send(fd);
	}else{
		document.getElementById("foto").value="";
		document.getElementById("fotomsg").style.display="initial";
	}
	*/
	return false;
}
/*
function validarUsuario(user){
	//wtf como pido el usuario?
	xmlhttp=new crearObjAjax();
	var url="";
	xmlhttp.onreadystatechange = procesarUsuario;
	xmlhttp.open("GET", )
}*/

function validarPassword(pwd1, pwd2){
	if(pwd1.localeCompare(pwd2)!=0){
		//mensaje de error
		
		document.getElementById("msgpwd").style.display="initial";
		document.getElementById("pwd").value="";
		document.getElementById("pwd2").value="";
		document.getElementById("pwd").focus();
		//document.getElementById("msgpwd").style.color="#F00";
		return pwd1.localeCompare(pwd2);
	}
	return pwd1.localeCompare(pwd2);
}

function ToGame(){

	window.location.replace("juego.html");

}

function ToPerfil(){

	window.location.replace("registro.html");

}

function validarUsu(){
	//document.getElementById("msglogin").style.display="none";
	//document.getElementById("logindisponible").style.display="none";
	//alert(document.getElementById("usu").value);
	var fd = new FormData();
	var xmlhttp = new XMLHttpRequest();
	var url="rest/login/"+document.getElementById("usu").value;


	xmlhttp.onreadystatechange = procesarCambioVal;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(fd);	
	document.getElementById("msglogin").style.display="none";
	document.getElementById("logindisponible").style.display="none";
	function procesarCambioVal(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200 ){
				var res = JSON.parse(xmlhttp.responseText);
				console.clear();
				console.log(res.DISPONIBLE);
				if(!res.DISPONIBLE){
					document.getElementById("logindisponible").style.display="none";
					document.getElementById("msglogin").style.display="block";
					//alert("pero qe pasa k ase"+res.DISPONIBLE);
				}
				if(res.DISPONIBLE){

					document.getElementById("msglogin").style.display="none";
					document.getElementById("logindisponible").style.display="block";
					//alert("pero qe pasa");
				}

			}else{

			}
		}
	}

	return false;

}