let endpointu = "http://localhost:8080/api/usuarios";

document.getElementById("guardarRegistro").addEventListener("click", function(e){
	e.preventDefault();
	let nombre = document.getElementById("nombre").value; 
	let mailp = document.getElementById("mailP").value; 
	let pass =  document.getElementById("pass").value;
	let rpass =  document.getElementById("pass2").value;
	let cumple =  document.getElementById("cumple").value;
	if(pass == rpass){
		let arregloDatos = {"nombre": nombre, "mailp": mailp, "pass": pass, "cumple": cumple};
		saveUser(arregloDatos);
	}
	else alert("las contraseñas no coinciden");
	
	
});

saveUser = function(data) {
	console.log(data);
	return fetch(endpointu, {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{ 'Content-Type': 'application/json' }
	});
	alert("Se ha registrado el usuario")
}