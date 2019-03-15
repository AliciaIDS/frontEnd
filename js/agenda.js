window.onload = function(){
	let endpoint1 = "http://localhost:8080/api";

	document.getElementById("agregar").addEventListener("click", function(e){
		e.preventDefault();
		setTimeout("location.href='file:///Users/idscomercial1/Desktop/html/AGENDA/registroContactos.html'", 1000);
	});


	document.getElementById("consultaAll").addEventListener("click", function(e){
		let consultaTodos = "consultaTodos";
		let otroValor=""
		consultaBD(consultaTodos, otroValor);
	});

	document.getElementById("modificar").addEventListener("click", function(e){
		e.preventDefault();
		let nombreActualizar = document.getElementById("anombre").value;
		let actualizar = "actualizar";
		consultaBD(actualizar, nombreActualizar);
	});

	document.getElementById("consultaNombre").addEventListener("click", function(e){
		let nombreConsulta = document.getElementById("cnombre").value.toUpperCase();
		let consultaUno = "consultaUno";
		consultaBD(consultaUno, nombreConsulta);
	});

	document.getElementById("eliminar").addEventListener("click", function(e){
		e.preventDefault();
		let nombreEliminar = document.getElementById("enombre").value.toUpperCase();
		let eliminar = "eliminar";
		consultaBD(eliminar, nombreEliminar);
	});

	document.getElementById("cerrarAll").addEventListener("click", function(e){
		e.preventDefault();
		cerrar();
	});

	function consultaBD(accion, nombre){ 
		fetch(endpoint1+'/contactos')
		.then(resp => {
			if (resp.ok) {
				return resp.json();
			}
			alert ("No se pudieron obtener los datos");
		})
		.then(data =>{
			if(accion == "consultaTodos"){
				muestra_oculta();
				crea_tabla(data);
			}
			else{
				crea_tabla(data);
				buscar(nombre, accion);
				cerrar();
			}
			
		})
	}

	function muestra_oculta(id){
		if (document.getElementById("contenedorTabla").className = "hide"){ 
			let el = document.getElementById("contenedorTabla");
			el.className = el.className.replace( /(?:^|\s)hide(?!\S)/g , '' );
			el.className += "nohide";
		}
	}

	function cerrar(){
		let cn = document.getElementById("datos");
		let el = document.getElementById("Tabla"); 
		if (document.getElementById("contenedorTabla").className == "nohide"){ 
			let ct = document.getElementById("contenedorTabla");
			ct.className = ct.className.replace( /(?:^|\s)nohide(?!\S)/g , '' );
			ct.className += "hide";
		}
		cn.removeChild(el);
	}

	function crea_tabla(data){
		var contenedor = document.getElementById("datos");
		var tabla   = document.createElement("table");
		tabla.setAttribute("id", "Tabla");
	  	var tblBody = document.createElement("tbody");
		Object.keys(data).forEach(function(k){
			console.log(data[k]);
			var columna = document.createElement("tr");
			for(key in k){
				var row = document.createElement("td");
				var textRow = document.createTextNode(data[k].nombre.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    row.setAttribute("id", data[k].id);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data[k].cumple.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data[k].tpersonal.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data[k].toficina.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data[k].mailp.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data[k].moficina.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			}
			
		    tblBody.appendChild(columna);
		    
		});
		tabla.appendChild(tblBody);
		contenedor.appendChild(tabla);

	}

	function buscar(nombre, accion){
		let id =  document.getElementById("Tabla")
	    let rows = document.querySelectorAll('tr');
	        for(let i = 0; i < rows.length; i++){
	            let showRow = false;
	            let row = rows[i];
	            row.style.display = 'none';
	            for(let x = 0; x < row.childElementCount; x++){
	                if(row.children[x].textContent.toUpperCase() === nombre){	
	            		var atributo = row.children[x].getAttribute("id");
		                    showRow = true;
		                    break;
	                }
	            }
	            if(showRow){
	            	consultaPorId(atributo, accion);
	            }
	        }
	}

	function consultaPorId(atributo, accion){
		fetch(endpoint1+'/contactos'+'/'+atributo)
		.then(resp => {
			if (resp.ok) {
				return resp.json();
			}
			alert ("No se pudieron obtener los datos");
		})
		.then(data =>{
			console.log(data);
			muestra_oculta();
			crea_tablita(data);
			if (accion == "eliminar"){
				crearBotonEliminar();
			}
			else if (accion == "actualizar"){
				crearBotonActualizar();
			}
		})
	}

	function crea_tablita(data){
		var contenedor = document.getElementById("datos");
		var tabla   = document.createElement("table");
		tabla.setAttribute("id", "Tabla");
	  	var tblBody = document.createElement("tbody");
	  	var k = Object.keys(data);
			console.log(data);
			for(key in k){
				var columna = document.createElement("tr");
				var row = document.createElement("td");
				var textRow = document.createTextNode(data.nombre.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    row.setAttribute("id", data.id);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data.cumple.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data.tpersonal.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data.toficina.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data.mailp.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			    var row = document.createElement("td");
				var textRow = document.createTextNode(data.moficina.toUpperCase());
				row.appendChild(textRow);
			    columna.appendChild(row);
			}
			
		tblBody.appendChild(columna);
		tabla.appendChild(tblBody);
		contenedor.appendChild(tabla);

	}


	function crearBotonEliminar(){
		var contenedorb = document.getElementById("botones");
		const botonEliminar = document.createElement('button', {is: 'Eliminar'});
		botonEliminar.textContent = 'Eliminar';
		contenedorb.appendChild(botonEliminar);

	}

	/*function crearBotonActualizar(){
		var contenedorb = document.getElementById("botones");
		const botonActualizar = document.createElement('button', {is: 'Actualizar'});
		botonActualizar.textContent = 'Actualizar';
		tabla.setAttribute("id", "Actualizar");
		contenedorb.appendChild(botonActualizar);
	}

	document.getElementById("agregar").addEventListener("click", function(e){
		e.preventDefault();
	});*/

}













