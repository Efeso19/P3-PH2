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
		nav="<input type='checkbox' id='menu-trigger'><ul><li><label for='menu-trigger'><span>&equiv;</span></label></li><li><a href='index.html'><i class='fa fa-home'></i> <span>Inicio</span></a></li> <li><a href='login.html'><i class='fa fa-sign-in'></i> <span>Login</span></a></li> <li><a href='registro.html'><i class='fa fa-plus'></i> <span>Registrarse</span></a></li> </ul>";
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