window.onload = prepararCanvas();
var posicionoBarcoEnX = 0; //para saber la posicion en X donde suelto el barco
var posicionoBarcoEnY = 0; //para saber la posicion en Y donde suelto el barco
var barco; //aqui almaceno la varaible del barco 
var gameBoard = [
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0]
				];
var barcosPuestos = [false, false, false, false, false, false, false, false, false, false];
var barcosPintado = [false, false, false, false, false, false, false, false, false, false];
var comprobado = false; //para saber si una posicion ha sido comprobada
var barcoSeleccionado = -1;
document.getElementById("btnJugar").disabled = true;
document.getElementById("btnRotar").disabled = true;
var puedoPonerBarco; //para saber si puedo poner un barco en una casilla


function prepararCanvas(){
	var cv = document.getElementById("posicionarBarcos");
	var cv2 = document.getElementById("arrastrar");

	setTimeout(function(){ 

		dibujarDivisiones("posicionarBarcos");
		escribirLabels();
		dibujarBarcos();



	}, 300);


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

	function dibujarBarcos(){
		var ctx = cv.getContext("2d");
		for(var i=1; i<11; i++){
			for(var j=1; j<11; j++){
				if(gameBoard[i][j] != 0){
					for(var y=0; y< barcosPuestos.length; y++){
						if(barcosPuestos[y]){
							if(gameBoard[i][j] == (y+1)){
								pintar(i, j, y, ctx);
							}
						}
					}
				}
			}
		}
	}

	function pintar(i, j, y, ctx){
		var barquito = document.getElementById("barco1");
		var img = new Image();
		img.src = barquito.src;
		ctx.drawImage(img, i*28, j*28, 28, 28);
		barcosPintado[y+1] = true;
	}



	function prepararDnD(){
		//selecciono los hijos
		var ps = document.querySelectorAll('#arrastrar>img');

		//los recorro y des pongo el atributo draggable
		for(var i=0; i<ps.length; i++){
			ps[i].setAttribute('draggable', 'true');
			ps[i].ondragstart = function(e){
				e.dataTransfer.setData('text', e.target.id);
				barco = document.getElementById(e.target.id);
			};
		}

		//parte del drop
		var destino = document.getElementById("posicionarBarcos");
		
		destino.ondragover = function(e){

			var ctx = cv.getContext("2d");
			posicionoBarcoEnX = e.offsetX;
			posicionoBarcoEnY = e.offsetY;
			var truncadoX = Math.trunc(posicionoBarcoEnX/28);
			var truncadoY = Math.trunc(posicionoBarcoEnY/28);	

			puedoPonerBarco = comprobarCasillas(barco, truncadoX, truncadoY);

			if(puedoPonerBarco){
				//verde
				var rectangulo = document.getElementById("ok28");
			}else{
				//rojo
				var rectangulo = document.getElementById("cancelar28");

			}
			rectangulo.setAttribute('puesto', barco.id);
			
			var lista = document.querySelectorAll('#posicionarBarcos>img');
			//console.log(lista.length);
			rectangulo.style.display = "initial";

			cv.appendChild(rectangulo);
			var img = new Image();
			img.onload = function(){
				ctx.drawImage(img, truncadoX*28, truncadoY*28, barco.width, barco.height);
			};
			img.src = rectangulo.src;

			//ctx.clearRect(truncadoX*28, truncadoY*28,28,barco.height)

			dibujarDivisiones("posicionarBarcos");
			escribirLabels();
			dibujarBarcos();




			/*
			var ctx = cv.getContext("2d");
			console.log("Moviendome");
			posicionoBarcoEnX = 0;
			posicionoBarcoEnY = 0;
			posicionoBarcoEnX = e.offsetX;
			posicionoBarcoEnY = e.offsetY;
			var truncadoX = Math.trunc(posicionoBarcoEnX/28);
			var truncadoY = Math.trunc(posicionoBarcoEnY/28);				
			var colocoEnX = 28*truncadoX;
			var colocoEnY = 28*truncadoY;

			ctx.beginPath();
			ctx.stokeStyle = "green";
			ctx.rect(colocoEnX,colocoEnY,barco.width,28);
			ctx.stroke();


			setTimeout(function(){ 
				dibujarDivisiones("posicionarBarcos");
				escribirLabels();
			}, 400);

			*/

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

										var str = barco.id.slice(5, 7);

										gameBoard[truncadoX][truncadoY] = str;

										str = parseInt(str)-1;
										barcosPuestos[str] = true;
									}else if(barco.width == 56){

										var str = barco.id.slice(5, 7);

										gameBoard[truncadoX][truncadoY] = str;
										gameBoard[truncadoX+1][truncadoY] = str;	

										str = parseInt(str)-1;
										barcosPuestos[str] = true;									
										//console.log("Valor dela matriz " + gameBoard[truncadoX][truncadoY]);
										//console.log("Valor dela matriz " + gameBoard[truncadoX+1][truncadoY]);
									}else if(barco.width == 84){
										var str = barco.id.slice(5, 7);

										gameBoard[truncadoX][truncadoY] = str;
										gameBoard[truncadoX+1][truncadoY] = str;
										gameBoard[truncadoX+2][truncadoY] = str;

										str = parseInt(str)-1;
										barcosPuestos[str] = true;

									}else{
										var str = barco.id.slice(5, 7);

										gameBoard[truncadoX][truncadoY] = str;
										gameBoard[truncadoX+1][truncadoY] = str;
										gameBoard[truncadoX+2][truncadoY] = str;
										gameBoard[truncadoX+3][truncadoY] = str;

										str = parseInt(str)-1;
										barcosPuestos[str] = true;

									}
									
									//console.log("Valor dela matriz " + gameBoard[truncadoX][truncadoY]);
									comprobarBarcos();
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



		var todasCasillasVacias = true;

		if(objBarco.width == 56 ){
			//barco de dos casillas
			if((trunX+1) >= 11){
				//Compruebo que no se salga del rango de la matriz por la derecha
				//console.log(objBarco.width);
				//console.log("No puedo poner el barco de 56 porque se sale del rango"+gameBoard.length);
				return false;
			}else{
				if(gameBoard[trunX+1][trunY] != 0 ){
					//la posicion de la derecha esta ocupada
					return false;
				}else{
					//lo puedo poner
					for(var i = -1; i<3; i++){
						for(var j = -1; j<2; j++){
							if( trunY+j<=11 && trunX+i <=11 && trunX != 0 && trunY != 0 ){
								if(gameBoard[trunX+i][trunY+j] != 0){
									todasCasillasVacias=false;
								}
							}else{
								todasCasillasVacias=false;
							}
							//console.log("estoy en:" + (trunX+i) + " " + (trunY+j));
						}
					}
					if(todasCasillasVacias){
						return true;	
					}else{
						return false;
					}
				}
			}
		}else if(objBarco.width == 84){
			if((trunX+2) == 11){
				return false;
			}else if((trunX+1) == 11 && (trunX+2) > 11){
				return false;
			}else{
				if(gameBoard[trunX+1][trunY] != 0 || gameBoard[trunX+2][trunY] != 0){
					//la posicion de la derecha y la siguiente estan ocuipadas
					return false;
				}else{
					//comprobacion horizontal
					for(var i = -1; i<4; i++){
						for(var j = -1; j<2; j++){
							if(trunX+i <=11 && trunX+i >= 0  && trunX != 0 && trunY != 0){
								if(gameBoard[trunX+i][trunY+j] != 0){
									todasCasillasVacias=false;
								}
							}else{
								todasCasillasVacias=false;
							}
							//console.log("estoy en:" + (trunX+i) + " " + (trunY+j));
						}
					}
					if(todasCasillasVacias){
						return true;	
					}else{
						return false;
					}
				}
			}
		}else if(objBarco.width == 28){
			//compruebo que a su alrededor haya agua
			for(var i=-1; i<2;i++){
				for(var j=-1; j<2; j++){		
					if( trunY+j<=12 && trunX+i <=12 && trunX != 0 && trunY != 0 ){
						if(gameBoard[trunX + i][trunY + j] != 0){
							todasCasillasVacias = false;
						}
						//console.log((trunY+j)+ "bbbbbbbbbb" + (trunX+i)+todasCasillasVacias);
					}else{
						todasCasillasVacias = false;
					}
				}
			}
			if(todasCasillasVacias){
				return true;
			}else{
				return false;
			}
		}else if(objBarco.width == 112){
			if((trunX+3) == 11){
				//lo coloco en la tercera casilla por la derecha
				return false;
			}else if((trunX+2) == 11 && (trunX+3) > 11){
				//lo coloco en la segunda casilla por la derecha
				return false;
			}else if((trunX+1) == 11 && (trunX+2) > 11){
				//lo coloco en la ultima casilla
				return false;
			}
			else{
				if(gameBoard[trunX+1][trunY] != 0 || gameBoard[trunX+2][trunY] != 0 || gameBoard[trunX+3][trunY] != 0){
					return false;
				}else{
					for(var i = -1; i<5; i++){
						for(var j = -1; j<2; j++){
							if(trunX+i <=11 && trunX+i >= 0  && trunX != 0 && trunY != 0){
								if(gameBoard[trunX+i][trunY+j]){
									todasCasillasVacias=false;
								}
							}else{
								todasCasillasVacias = false;
							}
							//console.log("estoy en:" + (trunX+i) + " " + (trunY+j));
						}
					}
					if(todasCasillasVacias){
						return true;	
					}else{
						return false;
					}
				}
			}
		}

		else{
			//alert("iiiii");
		}

	
	}


	function comprobarBarcos(){


		if(barcosPuestos[0] && barcosPuestos[1] && barcosPuestos[2] && barcosPuestos[3] && barcosPuestos[4] && 
			barcosPuestos[5] && barcosPuestos[6] && barcosPuestos[7] && barcosPuestos[8] && barcosPuestos[9]){
			document.getElementById("btnJugar").disabled = false;
		}

	}



/*
	document.addEventListener('click', function(e) {
    var id=e.srcElement;
    var ps = document.querySelectorAll('canvas>img');
    console.log(ps[0]);
	}, false);

*/

	function colocarBarco(e){
		//para colocar el barco seleccionandolo previamente

			//cv.onclick = function(e){
				//console.log("golaaa");
				if(barcoSeleccionado != -1){
					posicionoBarcoEnX = e.offsetX;
					posicionoBarcoEnY = e.offsetY;
					var truncadoX = Math.trunc(posicionoBarcoEnX/28);
					var truncadoY = Math.trunc(posicionoBarcoEnY/28);				

					//alert(posicionoBarcoEnX+" "+posicionoBarcoEnY);
					//comprobarCasillas(barcoParam, colocoEnX, colocoEnY);
					var puesto = false;
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
										//console.log("he puesto un barco");
										barcoSeleccionado = -1;
										if(barco.width == 28){
											var str = barco.id.slice(5, 7);

											gameBoard[truncadoX][truncadoY] = str;

											str = parseInt(str)-1;
											barcosPuestos[str] = true;
										}else if(barco.width == 56){

											var str = barco.id.slice(5, 7);

											gameBoard[truncadoX][truncadoY] = str;
											gameBoard[truncadoX+1][truncadoY] = str;			

											str = parseInt(str)-1;
											barcosPuestos[str] = true;							
											//console.log("Valor dela matriz " + gameBoard[truncadoX][truncadoY]);
											//console.log("Valor dela matriz " + gameBoard[truncadoX+1][truncadoY]);
										}else if(barco.width == 84){
											var str = barco.id.slice(5, 7);

											gameBoard[truncadoX][truncadoY] = str;
											gameBoard[truncadoX+1][truncadoY] = str;
											gameBoard[truncadoX+2][truncadoY] = str;

											str = parseInt(str)-1;
											barcosPuestos[str] = true;
										}else{

											var str = barco.id.slice(5, 7);

											gameBoard[truncadoX][truncadoY] = str;
											gameBoard[truncadoX+1][truncadoY] = str;
											gameBoard[truncadoX+2][truncadoY] = str;
											gameBoard[truncadoX+3][truncadoY] = str;

											str = parseInt(str)-1;
											barcosPuestos[str] = true;
										}
										
										//console.log("Valor dela matriz " + gameBoard[truncadoX][truncadoY]);
										comprobarBarcos();
										barcoSeleccionado = -1;
										truncadoX = 0;
										truncadoY = 0;
										posicionoBarcoEnX = 0;
										posicionoBarcoEnY = 0;
										puesto = true;
									}
									else{
										puesto = true;
										console.log("paro la ejecucion2");
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
			//}
	}

	cv.onmousedown = function(e){
		var ctx = cv.getContext("2d");
		if(parseInt(barco.id.slice(5,7)) == barcoSeleccionado){

				
			/*posicionoBarcoEnX = e.offsetX;
			posicionoBarcoEnY = e.offsetY;
			var truncadoX = Math.trunc(posicionoBarcoEnX/28);
			var truncadoY = Math.trunc(posicionoBarcoEnY/28);	
			console.log("aaaa"+truncadoX+" "+truncadoY);
			puedoPonerBarco = comprobarCasillas(barco, truncadoX, truncadoY);

			if(puedoPonerBarco){
				//verde
				var rectangulo = document.getElementById("ok28");
			}else{
				//rojo
				var rectangulo = document.getElementById("cancelar28");

			}
			rectangulo.setAttribute('puesto', barco.id);			
			var lista = document.querySelectorAll('#posicionarBarcos>img');
			//console.log(lista.length);
			rectangulo.style.display = "initial";

			cv.appendChild(rectangulo);
			var img = new Image();
			img.onload = function(){
				ctx.drawImage(img, truncadoX*28, truncadoY*28, barco.width, barco.height);
			};
			img.src = rectangulo.src;
*/
			
				colocarBarco(e);
			

		}





	}

	/*
	cv.onmousedown = function(e){
		//funcion para seleccionar barcos
		var ctx = cv.getContext('2d');
		if(parseInt(barco.id.slice(5,7)) == barcoSeleccionado){
			colocarBarco(e);
		}

		//setTimeout(function(){ 
			console.log("Tengo seleccionado" + barcoSeleccionado);
			if(barcoSeleccionado == -1){
				console.log("Down");
				posicionoBarcoEnX = e.offsetX;
				posicionoBarcoEnY = e.offsetY;
				
				var truncadoX = Math.trunc(posicionoBarcoEnX/28);
				var truncadoY = Math.trunc(posicionoBarcoEnY/28);	

				if(gameBoard[truncadoX][truncadoY] != 0){
					barcoSeleccionado = gameBoard[truncadoX][truncadoY];
					console.log(barcoSeleccionado);
					document.getElementById("btnRotar").disabled = false;

					var ps = document.querySelectorAll('#posicionarBarcos>img');
					//alert(ps.length);
					for(var i=0; i<ps.length; i++){
						if(gameBoard[truncadoX][truncadoY] == parseInt(ps[i].id.slice(5,7))){
							console.log("imprimo el id: "+ps[i].id);

							//ps[i].style.borderWidth = "thick";
							//console.log(ps[i].style.borderWidth);
							var rectangulo = document.getElementById("seleccionado28");
							rectangulo.style.display = "initial";
							cv.appendChild(rectangulo);
							var img = new Image();
							img.onload = function(){
								ctx.drawImage(img, truncadoX*28, truncadoY*28, barco.width, barco.height);
							};
							img.src = rectangulo.src;
						}


						//console.log(ps[i].id);
					}






					barcoSeleccionado=-1;
				}

			}else{
				posicionoBarcoEnX = e.offsetX;
				posicionoBarcoEnY = e.offsetY;
				
				var truncadoX = Math.trunc(posicionoBarcoEnX/28);
				var truncadoY = Math.trunc(posicionoBarcoEnY/28);	
				if(gameBoard[truncadoX][truncadoY] == 0 && barcoSeleccionado != -1){
					barcoSeleccionado = -1;
				}else{
					barcoSeleccionado = gameBoard[truncadoX][truncadoY];
				}
				
			}
		//}, 300);
		console.log(barcoSeleccionado);
		
	};
	*/
	cv.onmousemove = function(e){


		if(parseInt(barco.id.slice(5,7)) == barcoSeleccionado){
			var ctx = cv.getContext("2d");
			posicionoBarcoEnX = e.offsetX;
			posicionoBarcoEnY = e.offsetY;
			var truncadoX = Math.trunc(posicionoBarcoEnX/28);
			var truncadoY = Math.trunc(posicionoBarcoEnY/28);	
			console.log("aaaa"+truncadoX+" "+truncadoY);
			puedoPonerBarco = comprobarCasillas(barco, truncadoX, truncadoY);

			if(puedoPonerBarco){
				//verde
				var rectangulo = document.getElementById("ok28");
			}else{
				//rojo
				var rectangulo = document.getElementById("cancelar28");

			}
			rectangulo.setAttribute('puesto', barco.id);			
			var lista = document.querySelectorAll('#posicionarBarcos>img');
			//console.log(lista.length);
			rectangulo.style.display = "initial";

			cv.appendChild(rectangulo);
			var img = new Image();
			img.onload = function(){
				ctx.drawImage(img, truncadoX*28, truncadoY*28, barco.width, barco.height);
			};
			img.src = rectangulo.src;
			dibujarDivisiones("posicionarBarcos");
			escribirLabels();
			dibujarBarcos();

		}

	};







	//ultima parte del codigo
	var ps = document.querySelectorAll('#arrastrar>img');

	//los recorro y des pongo el atributo draggable
	for(var i=0; i<ps.length; i++){
		ps[i].setAttribute('draggable', 'true');
		ps[i].onclick = function(e){
			for(var j=1; j<11; j++){
				//para borrar los bordes de los barcos
				barco = document.getElementById("barco"+j);
				barco.style.border = "none";
			}

			barcoSeleccionado = parseInt(e.srcElement.id.slice(5,7))
			barco = document.getElementById(e.srcElement.id);
			barco.style.border = "solid";

			console.log("he seleccionado un barcop" + barcoSeleccionado);
			//colocarBarco(barco);
		};
	}



}


