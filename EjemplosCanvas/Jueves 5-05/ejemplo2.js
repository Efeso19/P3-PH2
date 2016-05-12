function empezar(){
	var r= document.getElementById('rect01');

	r.onmousedown = function(e){
		console.log('DOWN');
		var pos = {'x':e.offsetX, 'y':e.offsetY};
		r.setAttribute('data-btn-down', JSON.stringify(pos)); //Pasar de objeto a sttring
	};

	r.onmousemove = function(e){
		if(r.getAttribute('data-btn-down')){
			console.log("MOVE");

			var x_actual = parseInt(r.getAttribute('x'), 10),
				y_actual = parseInt(r.getAttribute('y'), 10),
				pos = JSON.parse(r.getAttribute('data-btn-down') ), 
				desplazamiento_x = parseInt(e.offsetX,10) - parseInt(pos.x, 10),
				desplazamiento_y = parseInt(e.offsetY,10) - parseInt(pos.y, 10),
				nueva_x  = x_actual + desplazamiento_x,
				nueva_y  = y_actual + desplazamiento_y;
			r.setAttribute('x', nueva_x);
			r.setAttribute('y', nueva_y);

			//nueva posicion anterior
			pos = {'x':e.offsetX, 'y':e.offsetY};
			r.setAttribute('data-btn-down', JSON.stringify(pos));
		}
	}

	r.onmouseup = function(e){
		console.log('UP');
		r.removeAttribute('data-btn-down');

	};

	r.onmouseout = function(e){
		console.log('OUT');
		r.removeAttribute('data-btn-down');
	};
}