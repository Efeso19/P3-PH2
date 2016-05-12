function empezar(){
	//Esto no es drag and drop
	var r = document.getElementById("rect01");

	r.onmousedown = function(e){
		//al hacer click dale el Down
		console.log('Down');
		var pos = {'x': e.offsetX, 
							'y': e.offsetY}

		r.setAttribute('data-btn-down', JSON.stringify(pos));
	};

	r.onmousemove = function(e){
		//si hacemos click y nos movemos y esta el atributo imprimimos el move porque nos estamos moviendo
		if(r.getAttribute('data-btn-down')){
			console.log('Move');
			var nueva_x = parseInt(r.getAttribute(x), 10) + parseInt(e.offsetX, 10) -  parseInt(JSON.parse(r.getAttribute('data-btn-down').x)),
					nueva_y = parseInt(r.getAttribute(y), 10) + parseInt(e.offsetY, 10) -  parseInt(JSON.parse(r.getAttribute('data-btn-down')).y);
			r.setAttribute('x',nueva_x);
			r.setAttribute('y',nueva_y);
		
			pos={'x':e.offsetX, 'y':e.offsetY};
			r.setAttribute('data-btn-down', pos)

		}


	};

	r.onmouseup = function(e){
		//al dejar de hacer click impimimos UP
		console.log('UP');
		r.removeAttribute('data-btn-down');
	};

	r.onmouseout = function(e){
		console.log('OUT');
		r.removeAttribute
	}



}