var turno;
var fichaSel;
var posX;
var posY;
var fichasJuego = new Array(6);
var cv;
var context;


function init(){
	if(typeof(Storage)!=="undefined") 
	{ 
		if(window.sessionStorage != "undefined"){
			jugador1 = sessionStorage.getItem("jugador1");
			jugador2 = sessionStorage.getItem("jugador2");

			if( jugador1 != undefined){ 
				
				var frm = document.getElementById("formLogin");
				frm.style.display = "none";

				var logueado = document.getElementById("logueado");
				logueado.style.display = "block";
				logueado.children[0].innerHTML = jugador1;

			}
			if(jugador2 != undefined){ 
				
				var frm = document.getElementById("formLogin2");
				frm.style.display = "none";

				var logueado = document.getElementById("logueado2");
				logueado.style.display = "block";
				logueado.children[0].innerHTML = jugador2;

			}

		}
	}
	else
	{
		alert("Tu navegador no soporta Web Storage")
	}
}
/*  ---------- LOGIN -------------------- */
function loguear1(){


	if(typeof(Storage)!=="undefined")
	{ 
		if(window.sessionStorage != "undefined"){
			var usu = document.getElementById("jugador1").value;
			console.log(usu);
			sessionStorage.setItem("jugador1", usu);		
		}

		var frm = document.getElementById("formLogin");
		frm.style.display = "none";

		var logueado = document.getElementById("logueado");
		logueado.style.display = "block";
		logueado.children[0].innerHTML = usu;



	}else{
		alert("Tu navegador no soporta Web Storage")
	}

	comprobarUsuarios(1);

}

function loguear2(){


	if(typeof(Storage)!=="undefined")
	{ 
		if(window.sessionStorage != "undefined"){
			var usu = document.getElementById("jugador2").value;
			console.log(usu);
			sessionStorage.setItem("jugador2", usu);		
		}

		var frm = document.getElementById("formLogin2");
		frm.style.display = "none";

		var logueado = document.getElementById("logueado2");
		logueado.style.display = "block";
		logueado.children[0].innerHTML = usu;



	}else{
		alert("Tu navegador no soporta Web Storage")
	}

	comprobarUsuarios(1);

}

function comprobarUsuarios(num){
	if(typeof(Storage)!=="undefined") 
	{ 
		if(window.sessionStorage != "undefined"){
			jugador1 = sessionStorage.getItem("jugador1");
			jugador2 = sessionStorage.getItem("jugador2");

			if(num == 1 && ( jugador1 != undefined && jugador2 != undefined)){ 
				
				window.location = "juego.html";

			}

			if(num == 2 && (jugador1 == undefined || jugador2 == undefined)){
				window.location = "index.html";
				init();
			}
		}
	}
	else
	{
		alert("Tu navegador no soporta Web Storage")
	}
}

function finalizarPartida(){
	if(typeof(Storage)!=="undefined") 
	{ 
		if(window.sessionStorage != "undefined"){
			jugador1 = sessionStorage.getItem("jugador1");
			jugador2 = sessionStorage.getItem("jugador2");

			if( jugador1 != undefined){ 
				sessionStorage.removeItem("jugador1");


			}
			if(jugador2 != undefined){ 
				
				sessionStorage.removeItem("jugador2");

			}

			window.location = "index.html";

		}
	}
	else
	{
		alert("Tu navegador no soporta Web Storage")
	}
}

function iniciarJuego(){

	cv = document.getElementById("rejilla");
	context = cv.getContext('2d');

	limpiarCanvas(context);

	dibujarCuadricula();

	var fichas1 = document.getElementById("fichas1");
	fichas1.innerHTML = "<h4></h4>";
	var nombre1 = fichas1.children[0];
	var fichas2 = document.getElementById("fichas2");
	fichas2.innerHTML = "<h4></h4>";
	var nombre2 = fichas2.children[0];


	if(typeof(Storage)!=="undefined") 
	{ 
		if(window.sessionStorage != "undefined"){
			jugador1 = sessionStorage.getItem("jugador1");
			jugador2 = sessionStorage.getItem("jugador2");

			nombre1.innerHTML = "Jugador 1: " + jugador1;
			nombre2.innerHTML = "Jugador 2: " + jugador2;
		}
	}
	else
	{
		alert("Tu navegador no soporta Web Storage")
	}

	for(var i=0; i<21; i++){
		var img = document.createElement("img");
		img.setAttribute("src", "ficha_roja.svg");
		img.setAttribute("alt", "Ficha roja");
		img.setAttribute("class", "ficha");
		img.setAttribute("onclick", "seleccionarFicha(this)");
		fichas1.appendChild(img);
	}

	for(var i=0; i<21; i++){
		var img = document.createElement("img");
		img.setAttribute("src", "ficha_verde.svg");
		img.setAttribute("alt", "Ficha verde");
		img.setAttribute("class", "ficha");
		img.setAttribute("onclick", "seleccionarFicha(this)");
		fichas2.appendChild(img);
	}

	turno = 1;

	//evento coger click canvas
	cv.addEventListener("mousedown", getPosition, false);

	for(var i=0; i<6; i++){
		for(var j=0; j<7; j++){
			fichasJuego[i] = new Array(7);
			
		}
	}

	for(var i=0; i<6; i++){
		for(var j=0; j<7; j++){
			fichasJuego[i][j] = -1;
		}
	}
	

	fichas1.style.border = "2px solid #484848";


}

function limpiarCanvas(ctx){
	ctx.clearRect(0,0,280,240);

}



function dibujarCuadricula(){

	context.strokeStyle = "#000000"; 
	context.lineWidth = "1px"; // grosor de la línea

  for(i=0; i<49; i++){
      //estan en un array, calcular las posiciones X,Y
      y = Math.floor(i/7);
      x = i-y*7;

      context.strokeRect(x*40,y*40,40,40); //pintar todas de nuevo
  }
}

function seleccionarFicha(ficha){
	var fichas1 = document.getElementById("fichas1");
	var fichas2 = document.getElementById("fichas2");

	if(turno == 1 && ficha.parentNode==fichas1){
		
		for(var i=1; i<22; i++){
			fichas1.children[i].style.border = "none";
		}
		ficha.style.border = "2px solid #000000";
		fichaSel = ficha;

	}else if(turno == 2 && ficha.parentNode==fichas2){
		
		for(var i=1; i<22; i++){
			fichas2.children[i].style.border = "none";
		}

		ficha.style.border = "1px solid #000000";
		fichaSel = ficha;
	}	
}


function getPosition(event){

    if(event.pageX != undefined && event.pageY != undefined){
      posX = event.pageX;
      posY = event.pageY;
    }
    else {// Firefox method to get the position
      posX = event.clientX + document.body.scrollLeft +
          document.documentElement.scrollLeft;
      posY = event.clientY + document.body.scrollTop +
          document.documentElement.scrollTop;
    }
    posX = posX - cv.offsetLeft;
    posY = posY - cv.offsetTop;

    //convertir de pixel a celda
    posX = Math.floor(posX/40);
    posY = Math.floor(posY/40);

    if(fichaSel != undefined){
        colocarFicha();
    }  
    
 }

 function colocarFicha(){
 	console.log(posX);
 	var lleno = true;


 	for(var i=5; i>-1 && lleno; i--){
 		if(fichasJuego[i][posX] == -1){
 			fichasJuego[i][posX] = fichaSel;
 			lleno = false;
 			var imagenActual = new Image();
			imagenActual.src = fichaSel.src;

			context.drawImage(imagenActual,posX*40,i*40, 40,40);

			cambiarTurno();
			
 		}
 	}

 	if(lleno){
 		mostrarMensaje("Columna llena", "El movimiento no se puede hacer");
 	}
 }

 function cambiarTurno(){
 	var fichas1 = document.getElementById("fichas1");
	var fichas2 = document.getElementById("fichas2");

	for(var i=1; i<fichas1.children.length; i++){
		fichas1.children[i].style.border = "none";
		fichas2.children[i].style.border = "none";
	}


 	if(turno == 1){
 		fichas2.style.border = "2px solid #484848";
 		fichas1.style.border = "none";
 		fichas1.removeChild(fichaSel);
		turno = 2;
	}else{
		fichas1.style.border = "2px solid #484848";
		fichas2.style.border = "none";
		fichas2.removeChild(fichaSel);
		turno = 1;
	}

	fichaSel = undefined;

 }


 function mostrarMensaje(sTitulo, sMensaje){

      var caja = document.createElement("div");
      caja.setAttribute("class", "caja");
      caja.setAttribute("id", "mostrarMensaje");

      var titulo = document.createElement("p");
      titulo.setAttribute("class", "titulo");

      var mensaje = document.createElement("p");
      mensaje.setAttribute("class", "mensaje");

      var bodyPagina = document.getElementsByTagName("body")[0];
      caja.appendChild(titulo);
      caja.appendChild(mensaje);
      bodyPagina.appendChild(caja);


      //poner valores
      titulo.innerHTML = sTitulo;
      mensaje.innerHTML = sMensaje;
    }

