function prepararDnD(){
	
	var cv = document.getElementById('cv01');
	var cv02 = document.getElementById('cv02');
	
	cv.ondragover = function(e){
		
		e.preventDefault();
	}
	
	cv.ondrop = function(e){
		
		e.preventDefault();
		
		var ficheros = e.dataTransfer.files,
		x = e.offsetX,
		y = e.offsetY;
		
			
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
				
				ctx.drawImage(img, x, y, cv.width, cv.height);
				
			};
			
			img.src = fr.result;
		};
		
		fr.readAsDataURL(ficheros[0]);
		
		 
		
		
		};
		
		cv.ondragstart = function(e){
			
			//var img = e.target.getImageData(0,0,cv.width, cv.height);
			//var img = cv.getImageData(0,0,cv.width, cv.height);
			e.dataTransfer.setDragImage(document.getElementById('img01'),50,50);
			
		};
		
		
		
	//CANVAS 02
	
	cv02.ondragover = function(e){
		ctx01 = cv.getContext('2d');
		console.log(ctx01.getImageData(0,0,cv.width,cv.height));
		e.preventDefault();
	}
	
	cv02.ondrop = function(e){
		
		e.preventDefault();
		var ctx02 = cv02.getContext('2d'),
			cv = document.getElementById('cv01'),
			ctx01 = cv.getContext('2d'),
			imgdata = ctx01.getImageData(0,0,cv.width,cv.height);
			
			ctx02.putImageData(imgdata,0,0);
			
	}
}
	
