

function prepararDnD(){
	//Parte del drag
	var ps = document.querySelectorAll('#origen>p');
	
	for(var i=0; i<ps.length; i++){
		ps[i].setAttribute('draggable', 'true');
		ps[i].ondragstart = function(e){
			e.dataTransfer.setData('text/plain', e.target.id);
			

		};

	}

		//parte del drop
	var destino = document.getElementById("destino");
	destino.ondragover = function(e){
		e.preventDefault();


	}

	destino.ondrop = function(e){
		e.preventDefault();
		var id=e.dataTransfer.getData('text/plain');
		console.log('ID:' + id)
		if(parseInt(id.substr(1)) % 2 == 1){
			e.target.appendChild(document.getElementById(id));

		}

	}
}
