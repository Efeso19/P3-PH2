window.onload = prepararCanvas();




function prepararCanvas(){
	var cv = document.getElementById("posicionarBarcos");

	dibujarDivisiones();
	escribirLabels()
	




	function dibujarDivisiones(){
		var cv = document.getElementById("posicionarBarcos"),
				ctx = cv.getContext('2d');
				tamanyo = cv.width/11;
				cv.width = cv.width;
				ctx.beginPath();
				ctx.lineWitdh = 1;
				ctx.stokeStyle = "#234";
		for(var i=0; i< 11; i++){
			//vertical
			ctx.moveTo(tamanyo * (i+1), 0);
			ctx.lineTo(tamanyo * (i+1), cv.height);
			//horizontal
			ctx.moveTo(0, tamanyo * (i+1));
			ctx.lineTo(cv.width, tamanyo * (i+1));



		}

		ctx.stroke();


	}

	function escribirLabels(){
		var cv = document.getElementById("posicionarBarcos");
		var ctx = cv.getContext("2d");

		ctx.font = "20px Georgia";
		var y = 50;
		ctx.fillText("A", 7, y);
		y+=28;
		ctx.fillText("B", 7, y);
		y+=28;
		ctx.fillText("C", 7, y);
		y+=28;
		ctx.fillText("D", 7, y);
		y+=28;
		ctx.fillText("E", 7, y);
		y+=28;
		ctx.fillText("F", 7, y);
		y+=28;
		ctx.fillText("G", 7, y);
		y+=28;
		ctx.fillText("H", 7, y);
		y+=28;
		ctx.fillText("I", 7, y);
		y+=28;
		ctx.fillText("J", 7, y);
		for(var i = 0; i<11; i++){
			ctx.fillText(i+1, 10+((i+1)*27.5), 20);
		}

	}

}