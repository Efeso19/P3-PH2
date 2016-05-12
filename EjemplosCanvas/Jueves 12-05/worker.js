self.onmessage = function(e){
	
	var datos 	= e.data,
		imgdata = datos.imgdata,
		color 	= datos.color;
		
	imgdata = descomponer(imgdata, color);
	self.postMessage({'imgdata': imgdata});
}

function descomponer(imgdata, color){
	
	var pixel, rojo, verde, azul, alfa,
		ancho = imgdata.width,
		alto  = imgdata.height;
		
	for(var x = 0;x<ancho;x++){
		for(var y = 0;y<alto;y++){
			
			pixel = (y * ancho + x)*4;
			
			rojo = imgdata.data[pixel+0];
			verde = imgdata.data[pixel+1];
			azul = imgdata.data[pixel+2];
			alfa = imgdata.data[pixel+3];
			
			switch(color){
				
				case 'r': verde = azul = 0;
					break;
				case 'g': rojo = azul = 0;
					break;
				case 'b': rojo = verde = 0;
					break;
			
			}
			
			imgdata.data[pixel+0] = rojo;
			imgdata.data[pixel+1] = verde;
			imgdata.data[pixel+2] = azul;
			
			
		}
	}

	return imgdata;
	
}