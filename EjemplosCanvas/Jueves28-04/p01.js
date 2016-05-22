function prepararCanvas(){
	var cv = document.getElementById("cv01");
	cv.onmousemove = function(e){
		//para capturar el movimiento del raton
		console.log("Movemos");
		var pos_x = e.offsetX,
				pos_y = e.offsetY;

			document.getElementById("posX").innerHTML= pos_x;
			document.getElementById("posY").innerHTML= pos_y;
	};

	cv.oncontextmenu = function (e){
		//para cancelar el cuadro de dialogo del boton derecho
		e.preventDefault();
		
	}	


	cv.onclick = function(e){


		console.log("Click");
		var pos_x = e.offsetX,
				pos_y = e.offsetY,
				boton;

		switch(e.button){
			case 0: //Podemos
				boton="Izquierdo";
				break;
			case 1: //Discoteca del pueblo de Rucri (Almoradí)
				boton="Central";
				break;
			case 2: //PP
				boton= "Derecho";
				break;
		}
		document.getElementById("posX").innerHTML= pos_x;
		document.getElementById("posY").innerHTML= pos_y;
		document.getElementById("boton").innerHTML= boton;
	};


}