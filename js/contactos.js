var Contacto = Backbone.Model.extend({
    urlRoot: 'http://163.172.218.124/pwf/rest/agenda',
    defaults: {
      "nombre": "",
      "apellido": "",
      "alias" : "",
      "telefono" : "",
      "email" : "",
      "direccion" : ""
      
      
    },
    //Se llama automáticamente al hacer save()
    //Si no hay errores de validación no debe devolver nada
    //Qué devolver exactamente si hay errores corre de cuenta de la aplicación
    validate: function(attrs) {
        //En nuestro ejemplo devolvemos un array de mensajes de error
        var errores = [];
        if(!attrs.nombre)
            errores.push("Falta nombre");
        if (!attrs.apellidos)
            errores.push("Faltan apellidos");
        if (errores.length>0)
            return errores;
    },
    guardar: function() {
      //Ejemplo de uso de save con callbacks
      //En el primer parámetro se pueden poner los campos a guardar (null = todos)
      //El segundo es un hash con los callbacks de éxito y error
      return this.save(null, {
        success: function(model, response, opts) {
           console.log("Guardado OK, respuesta: " + response);
           alert("Contacto guardado correctamente");
        },
        error: function(model, xhr, opts) {
           console.log("Error al guardar, status: " + xhr.status +
                        " response: " + xhr.responseText);
           alert("Error al guardar contacto: " + xhr.responseText);
        }
    });
}
});






var Agenda = Backbone.Collection.extend({
    url: 'http://163.172.218.124/pwf/rest/agenda',
    model: Contacto,
    //Ejemplo de uso de la función "filter"
    //por ejemplo filtrar_por_nombre("Pep") nos devolvería
    //todos los contactos cuyo nombre contuviera esa cadena
    parse: function(data) {
        return data.lista;
    },
    filtrar_por_nombre: function(cadena) {
        return this.filter(function(modelo) {
            return modelo.get('nombre').indexOf(cadena)>=0;
        });
    },
    comparator: function(cliente){
        // ordenamos por el atributo nombre
        return cliente.get('nombre');
    }
});


