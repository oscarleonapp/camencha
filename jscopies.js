//Leer los datos de la Hoja de Calculo
function readUsers() {
    const dataUsuarios = sheetUsuarios.getDataRange().getDisplayValue();
    // dataUsuarios.shift();
    //Remover los encabezados
    
  
    //Evaluar si hay registros disponibles
    if(dataUsuarios.length === 0){
      return "No hay registros en la Base de Datos para mostrar"
    }
  
    console.log(dataUsuarios);
  
  
    //Si existen datos los mostrara
    return dataUsuarios;
  }