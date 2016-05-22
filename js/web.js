//ESTE FICHERO COMPRUEBA SI ESTAS LOGUEADO




/*

		<nav>
			<input type="checkbox" id="menu-trigger">
			<ul>
				<li><label for="menu-trigger"><span>&equiv;</span></label></li>
				<li><a href="index.html"><i class="fa fa-home"></i> <span>Inicio</span></a></li> 
				<li><a href="login.html"><i class="fa fa-sign-in"></i> <span>Login</span></a></li> 
				<li><a href="registro.html"><i class="fa fa-plus"></i> <span>Registrarse</span></a></li> 
				<li><a href=""><i class="fa fa-user"></i> <span>Perfil</span></a></li> 
				<li><a href=""><i class="fa fa-sign-out"></i> <span>Logout</span></a></li> 
				<li><a href="buscar_viajes.html"><i class="fa fa-search"></i> <span>Buscar viajes</span></a></li> 
				<li><a href="crear_viaje.html"><i class="fa fa-plane"></i> <span>Crear viaje</span></a></li>
			</ul>
			
		</nav>


*/

if(window.localStorage){
	var nav="";
	if(sessionStorage.getItem('logged')){
		//menu para cuando estemos logeados
		nav="<input type='checkbox' id='menu-trigger'><ul><li><label for='menu-trigger'><span>&equiv;</span></label></li><li><a href='index.html'><i class='fa fa-home'></i> <span>Inicio</span></a></li> <li><a href='javascript:logout()'><i class='fa fa-sign-out'></i> <span>Logout</span></a></li> <li><a href='juego.html'><i class='fa fa-gamepad' aria-hidden='true'></i> <span>Juego</span></a></li> <li id='loginnav'>Hola, <b>"+sessionStorage.getItem('login')+"</b></li> </ul>";
	}else{
		//menu para cuando no estamos logeados
		nav="<input type='checkbox' id='menu-trigger'><ul><li><label for='menu-trigger'><span>&equiv;</span></label></li><li><a href='index.html'><i class='fa fa-home'></i> <span>Inicio</span></a></li> <li><a href='javascript:loginHTML()'><i class='fa fa-sign-in'></i> <span>Login</span></a></li> <li><a href='javascript:registroHTML()' ><i class='fa fa-plus'></i> <span>Registrarse</span></a></li> </ul>";
		//<li><a href='registro.html'><i class='fa fa-plus'></i> <span>Registrarse</span></a></li>
		//
	}
	//imprimimos el CONTENIDO de la etiqueta nav ya que ésta lleva el id
	document.getElementById("navegacion").innerHTML=nav;
}else{
	//alert("Tu navegador no soporta Web Storage");
}

function logout(){

	sessionStorage.clear();
	//location.replace("index.html");
	location.reload(); 

}

function loginHTML(){

	document.getElementById("transparencia").style.display="initial";

	var mostrar='<h2>Login</h2>';
	mostrar+='<form name="formlogin" id="formlogin" onsubmit="return envio(this)">';
	mostrar+='<p id="loginmsg"></p>';
	mostrar+='<label for="login">Usuario</label>';
	mostrar+='<input type="text" id="login" name="login" placeholder="Usuario" required autofocus pattern="[a-zA-Z][a-zA-Z0-9]{0,15}"><br>';
	mostrar+='<label for="pwd">Contrase&ntilde;a</label>';
	mostrar+='<input type="password" id="pwd" name="pwd" placeholder="*******" required><br>';
	mostrar+='<input type="submit" id ="loguearse" value="Iniciar sesión">';
	mostrar+='</form>';
	document.getElementById("paraRegistro").style.display = "none";
	document.getElementById("paraLogin").style.display = "block";
	document.getElementById("paraLogin").innerHTML=mostrar;
	

}

function registroHTML(){

	document.getElementById("transparencia").style.display="initial";

	var mostrar='<h2>Registrarse</h2>';
	mostrar+='<form name="regisform" id="regisform" onsubmit="return registrarse(this);" >';
	mostrar+='<p id="loginmsg"></p>';
	mostrar+='<label for="usu">Nombre de usuario:</label><br>';
	mostrar+='<input type="text" id="usu" name="login" placeholder="Usuario" required autofocus pattern="[a-zA-Z0-9]{5,20}" maxlength="20" ><br>';
	mostrar+='<div id="msglogin"><br>No est&aacute; disponible<br></div>';
	mostrar+='<div id="logindisponible"><br>Est&aacute; disponible<br></div>';
	mostrar+='<label for="pwd">Contrase&ntilde;a:</label><br>';
	mostrar+='<input type="password" id="pwd" name="pwd" placeholder="*******" required pattern="[a-zA-Z][a-zA-Z0-9_-]{5,20}" maxlength="20">';
	mostrar+='<div id="msgpwd"><br>Las contrase&ntilde;as no coindicen<br></div><br>';
	mostrar+='<label for="pwd2">Repetir contrase&ntilde;a:</label><br>';
	mostrar+='<input type="password" id="pwd2" name="pwd2" placeholder="*******" required pattern="[a-zA-Z][a-zA-Z0-9_-]{5,20}" maxlength="20"><br>';
	mostrar+='<label for="nombre">Nombre completo:</label><br>';
	mostrar+='<input type="text" id="nombre" name="nombre" placeholder="Nombre completo" required><br>';
	mostrar+='<label for="email">Email:</label><br>';
	mostrar+='<input type="email" id="email" name="email" placeholder="Email" required><br>';
	mostrar+='<input type="submit" id ="regristrarsebutton" value="Enviar" >';

	document.getElementById("paraLogin").style.display = "none";
	document.getElementById("paraRegistro").style.display = "block";
	document.getElementById("paraRegistro").innerHTML=mostrar;




}