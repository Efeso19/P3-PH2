function prepararCanvas(){
	var cv = document.getElementById("cv01");
	/*
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
		//TODO falta por implementar
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
	*/
	cv.onmousedown = function(e){
		console.log("MouseDown");
		cv.setAttribute('data-btndown', 'true');
		cv.classList.toggle('pintando');
		var ctx= cv.getContext('2d');
		ctx.moveTo(e.offsetX, e.offsetY);
		ctx.beginPath();
		ctx.strokeStyle = document.getElementById("color").value;
		ctx.lineWidth = document.getElementById("grosor").value;
	}

	cv.onmouseup = function(e){
		console.log("MouseUp");
		cv.removeAttribute('data-btndown');
		cv.classList.toggle('pintando');
	}
	/*
	cv.onmouseout = function(e){
		console.log("MouseOut");
		if(cv.getAttribute('data-btndown')){
			cv.removeAttribute('data-btndown');
			cv.classList.toggle('pintando');
		}
		
	}*/

	cv.onmousemove = function(e){
		//para capturar el movimiento del raton
		console.log("Movemos");

		if(cv.getAttribute('data-btndown')){
			var ctx= cv.getContext('2d');
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
		}


	};

}