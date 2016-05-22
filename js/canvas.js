window.onload = prepararCanvas();
var posicionoBarcoEnX; //para saber la posicion en X donde suelto el barco
var posicionoBarcoEnY; //para saber la posicion en Y donde suelto el barco
var barco; //aqui almaceno la varaible del barco 


function prepararCanvas(){
	var cv = document.getElementById("posicionarBarcos");
	var cv2 = document.getElementById("arrastrar");
	dibujarDivisiones("posicionarBarcos");
	//dibujarDivisiones("arrastrar");
	//barcosParaArrastrar("arrastrar");
	escribirLabels()
	var i = 1;
	/*
	for(i = 1; i<11; i++){
		dibujarBarcosArrastre(i);
	}
	*/

	prepararDnD();





	function dibujarDivisiones(nombreCanvas){
		var cv = document.getElementById(nombreCanvas),
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
		//para crear el cuadrado
		ctx.strokeRect(28,28, 279, 279);

	}

	function barcosParaArrastrar(nombreCanvas){
		var barcos = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
		var cv = document.getElementById(nombreCanvas);
		var ctx = cv.getContext('2d'); 

		//ctx.strokeRect(28, 28, );



	}

	function dibujarBarcosArrastre(i){

		//PINTAR lA IMAGEN EN EL CANVS
		var ctx2 = cv2.getContext('2d');
		var img = new Image();
		
		if(i >= 0 && i< 5){
			img.onload = function(){

				ctx2.drawImage(img, 28*i, 0, 28, 28);
			};
			img.src = "Imagenes/barco28.png";
		}else if(i == 5){
			img.onload = function(){
				ctx2.drawImage(img, 28, 28, 56, 28);
			};
			img.src = "Imagenes/barco56.png";
		}else if(i == 6){
			img.onload = function(){
				ctx2.drawImage(img, 140, 28, 56, 28);
			};
			img.src = "Imagenes/barco56.png";
		}else if(i == 7){
			img.onload = function(){
				ctx2.drawImage(img, 84, 28, 56, 28);
			};
			img.src = "Imagenes/barco56.png";
		}else if(i == 8){
			img.onload = function(){
				ctx2.drawImage(img, 140, 0, 84, 28);
			};
			img.src = "Imagenes/barco84.png";
		}else if(i == 9){
			img.onload = function(){
				ctx2.drawImage(img, 224, 0, 84, 28);
			};
			img.src = "Imagenes/barco84.png";
		}else{
			img.onload = function(){
				ctx2.drawImage(img, 196, 28, 112, 28);
			};
			img.src = "Imagenes/barco112.png";
		}
		
		
	}


	function prepararDnD(){
		//selecciono los hijos
		var ps = document.querySelectorAll('#arrastrar>img');

		//los recorro y des pongo el atributo draggable
		for(var i=0; i<ps.length; i++){
			ps[i].setAttribute('draggable', 'true');
			ps[i].ondragstart = function(e){
				e.dataTransfer.setData('text', e.target.id);
			};
		}

		//parte del drop
		var destino = document.getElementById("posicionarBarcos");
		destino.ondragover = function(e){
			e.preventDefault();
		}

		//aqui los meto dentro del canvas
		destino.ondrop = function(e){
			e.preventDefault();
			var id=e.dataTransfer.getData('text');
			console.log('ID:' + id)
			//almaceno el objeto en una variable para acceder a sus atributos
			barco = document.getElementById(id);

			e.target.appendChild(barco);
			


		}

		cv.ondragend = function(e){
			cv.onmousemove = function(e){
				console.log("Moviendome");
				posicionoBarcoEnX = e.offsetX;
				posicionoBarcoEnY = e.offsetY;
			}
			
			

			//lo muestro por pantalla
			var ctx = cv.getContext('2d');
			var img = new Image();
			img.onload = function(){
				ctx.drawImage(img, posicionoBarcoEnX, posicionoBarcoEnY, barco.width, barco.height);
			};

			img.src = barco.src;


		}


	}





}