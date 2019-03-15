
let endpoint = "http://localhost:8080/api/contactos";

document.getElementById("guardarContacto").addEventListener("click", function(e){
	e.preventDefault();
	let nombre = document.getElementById("nombre").value;
	let tpersonal = document.getElementById("celular").value; 
	let toficina = document.getElementById("oficina").value; 
	let mailp = document.getElementById("mailP").value; 
	let moficina =  document.getElementById("mailO").value;
	let cumple =  document.getElementById("cumple").value;
	let arregloDatos = {"nombre": nombre, "tpersonal": tpersonal, "toficina": toficina, "mailp": mailp, "moficina": moficina, "cumple": cumple};
	savePersona(arregloDatos);
	
});


savePersona = function(data) {
	return fetch(endpoint, {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{ 'Content-Type': 'application/json' }
	});
	alert("Se ha registrado el contacto")
}

