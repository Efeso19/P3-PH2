window.onload = prepararCanvas();
var posicionoBarcoEnX = 0; //para saber la posicion en X donde suelto el barco
var posicionoBarcoEnY = 0; //para saber la posicion en Y donde suelto el barco
var barco; //aqui almaceno la varaible del barco 
var gameBoard = [
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0]
				];
var comprobado = false; //para saber si una posicion ha sido comprobada

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
			posicionoBarcoEnX = 0;
			posicionoBarcoEnY = 0;
			//console.log("(1)El puntero está en " + (posicionoBarcoEnX) + " " + (posicionoBarcoEnY));
			e.preventDefault();
			var id=e.dataTransfer.getData('text');
			console.log('ID:' + id)
			//almaceno el objeto en una variable para acceder a sus atributos
			barco = document.getElementById(id);
			var puesto = false;

			cv.onmousemove = function(e){
				//console.log("Moviendome");
				posicionoBarcoEnX = 0;
				posicionoBarcoEnY = 0;
				posicionoBarcoEnX = e.offsetX;
				posicionoBarcoEnY = e.offsetY;
				
				//console.log("El puntero está en " + (posicionoBarcoEnX) + " " + (posicionoBarcoEnY));
				
				if(!puesto){
					//lo muestro por pantalla
					var ctx = cv.getContext('2d');
					var img = new Image();
					img.onload = function(){




						var truncadoX = Math.trunc(posicionoBarcoEnX/28);
						var truncadoY = Math.trunc(posicionoBarcoEnY/28);
						//console.log("Posiciono el barco en " + Math.trunc(posicionoBarcoEnX/28) + " " + Math.trunc(posicionoBarcoEnY/28));
						if(truncadoX != 0 && truncadoY != 0){
							if(gameBoard[truncadoX][truncadoY] == 0){
								var puedoPonerBarco = comprobarCasillas(barco, truncadoX, truncadoY);

								if(puedoPonerBarco){
									comprobado = false;
									e.target.appendChild(barco);

									var colocoEnX = 28*truncadoX;
									var colocoEnY = 28*truncadoY;
									ctx.drawImage(img, colocoEnX, colocoEnY, barco.width, barco.height);
									if(barco.width == 28){
										gameBoard[truncadoX][truncadoY] = 1;
									}else if(barco.width == 56){
										gameBoard[truncadoX][truncadoY] = 1;
										gameBoard[truncadoX+1][truncadoY] = 1;
										//console.log("Valor dela matriz " + gameBoard[truncadoX][truncadoY]);
										//console.log("Valor dela matriz " + gameBoard[truncadoX+1][truncadoY]);
									}else if(barco.width == 84){
										gameBoard[truncadoX][truncadoY] = 1;
										gameBoard[truncadoX+1][truncadoY] = 1;
										gameBoard[truncadoX+2][truncadoY] = 1;
									}else{
										gameBoard[truncadoX][truncadoY] = 1;
										gameBoard[truncadoX+1][truncadoY] = 1;
										gameBoard[truncadoX+2][truncadoY] = 1;
										gameBoard[truncadoX+3][truncadoY] = 1;
									}
									
									//console.log("Valor dela matriz " + gameBoard[truncadoX][truncadoY]);
									truncadoX = 0;
									truncadoY = 0;
									posicionoBarcoEnX = 0;
									posicionoBarcoEnY = 0;
									puesto = true;
								}
								else{
									puesto = true;
									console.log("paro la ejecucion");
									//alert("Ha devuelto false");
								}
							}else{
								//alert("no lo puedo poner");
								puesto = true;

							}
						}else{
							puesto = true;
						}
					};
					img.src = barco.src;
				}



			}

		}
		
	

	}


	function comprobarCasillas(objBarco, trunX, trunY){
		/*var aux = "";
		for(var i = 0; i<gameBoard.length; i++){
			for(var j = 0; j < gameBoard[0].length; j++){
				
				//console.log(gameBoard[i][j]);
			}
			
		}*/





		if(objBarco.width == 56 ){
			//barco de dos casillas
			if((trunX+1) >= gameBoard.length){
				//Compruebo que no se salga del rango de la matriz por la derecha
				console.log(objBarco.width);
				console.log("No puedo poner el barco de 56 porque se sale del rango");
				//alert("no lo pongoooooooooooo");
				return false;
			}else{
				if(gameBoard[trunX+1][trunY] == 1){
					//la posicion de la derecha esta ocupada
					return false;
				}else{
					//lo puedo poner
					return true;
				}
			}
		}else if(objBarco.width == 84){
			if((trunX+2) == gameBoard.length){
				return false;
			}else if((trunX+1) == gameBoard.length && (trunX+2) > gameBoard.length){
				return false;
			}else{
				if(gameBoard[trunX+1][trunY] == 1 || gameBoard[trunX+2][trunY] == 1){
					//la posicion de la derecha y la siguiente estan ocuipadas
					return false;
				}else{
					return true;	
				}
				
			}
		
		}else if(objBarco.width == 28){
			return true;
		}else if(objBarco.width == 112){
			if((trunX+3) == gameBoard.length){
				//lo coloco en la tercera casilla por la derecha
				return false;
			}else if((trunX+2) == gameBoard.length && (trunX+3) > gameBoard.length){
				//lo coloco en la segunda casilla por la derecha
				return false;
			}else if((trunX+1) == gameBoard.length && (trunX+2) > gameBoard.length){
				//lo coloco en la ultima casilla
				return false;
			}
			else{
				if(gameBoard[trunX+1][trunY] == 1 || gameBoard[trunX+2][trunY] == 1 || gameBoard[trunX+3][trunY] == 1){
					return false;
				}else{
					return true;
				}
			}

			
		}




		else{
			//alert("iiiii");
		}

	
	}
}