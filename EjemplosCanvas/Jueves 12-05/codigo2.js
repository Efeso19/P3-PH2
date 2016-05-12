function prepararDnD(){
	
	var cv = document.getElementById('cv01');

	
	cv.ondragover = function(e){
		
		e.preventDefault();
	}
	
	cv.ondrop = function(e){
		
		e.preventDefault();
		var ficheros = e.dataTransfer.files;
		
		for(var i=0;i<ficheros.length;i++){
				
				var e = ficheros[i];
				
				console.log(i + ': ' + e.name + ' - ' + e.size);
			
			}
		
		
		//PINTAR lA IMAGEN EN EL CANVS
		
		var fr = new FileReader();
		
		fr.onload = function(){
			
			var img = new Image();
			
			img.onload = function(){
				
				var ctx = cv.getContext('2d');
				
				ctx.drawImage(img, 0, 0, cv.width, cv.height);
				
			};
			
			img.src = fr.result;
		};
		
		fr.readAsDataURL(ficheros[0]);
		
		 
		
		
		};
		

	
}

function rojo(){
	
	descomponer('r');
	
}

function verde(){
	
	descomponer('g');
	
}

function azul(){
	
	descomponer('b');
	
}

function descomponer(color){
	
	var worker = new Worker('worker.js');
	var cv 		= document.getElementById('cv01'),
		ctx 	= cv.getContext('2d'),
		imgdata = ctx.getImageData(0,0,cv.width,cv.height),
		datos;
		
	worker.onmessage = function(e){
		
		var datos = e.data;
		ctx.putImageData(datos.imgdata, 0,0);
		
	};
	
	datos = {'imgdata': imgdata, 'color': color}
	
	worker.postMessage(datos);
	
}
	
