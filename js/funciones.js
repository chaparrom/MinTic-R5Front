/**************************************************************************************** */
/**
 * Rutinas para acceder información Clientes
 */
function consultarCliente(){
    
    $("#resultadoCliente").empty();
    $("#listClient").empty();
    $("#listClient1").empty();

    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
    $("#password").val("");
    
    $.ajax({
        url:'http://132.226.250.48:8085/api/Client/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){

            let tablaCliente="<table border='1'>";
            tablaCliente+="<tr>";
            tablaCliente+="<th> Nombre </th>";
            tablaCliente+="<th> Correo Electrónico </th>";
            tablaCliente+="<th> Edad </th>";
            tablaCliente+="<th colspan='2'> Acciones </th> </tr>";
            tablaCliente+="</tr>";

            for(i=0;i<respuesta.length;i++){
                console.log(respuesta);
                tablaCliente+="<tr>";
                tablaCliente+="<td style='width: 210px'>" + respuesta[i].name + "</td>";
                tablaCliente+="<td style='width: 210px'>" + respuesta[i].email + "</td>";
                tablaCliente+="<td align='center' style='width: 40px'>" + respuesta[i].age + "</td>";
                tablaCliente+="<td> <button onclick='validarCliente("+respuesta[i].idClient+")'>Borrar</button>";
                tablaCliente+="<td> <button onclick='actualizarCliente("+respuesta[i].idClient+")'>Actualizar</button>";
                tablaCliente+="</tr>";
            }
            tablaCliente+="</table>";
            $("#resultadoCliente").append(tablaCliente);

            $("#listClient").append('<option value=0>-- Cliente --</option>');
            $.each(respuesta, function (id, client) {
                $("#listClient").append('<option value='+client.idClient+'>'+ client.name+'</option>');
            });

            $("#listClient1").append('<option value=0>-- Cliente --</option>');
            $.each(respuesta, function (id, client) {
                $("#listClient1").append('<option value='+client.idClient+'>'+ client.name+'</option>');
            });

        }
    });
}

function validarCliente(idCliente){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Client/"+idCliente,
        type:"GET",
        success:function(respuesta){
            if (respuesta.messages[0] === undefined && respuesta.reservations[0] === undefined) {
                borrarCliente(idCliente);
            }
            else {
                alert("Imposible eliminar el Cliente!!!!\nExisten registros de Mensajes o Reservaciones")
            }
        }
    });
}

function borrarCliente(idCliente){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Client/"+idCliente,
        type:"DELETE",
        success:function(respuesta){
            consultarCliente();
            alert("Cliente eliminado satisfactoriamente")
        }
    });
}

function adicionarCliente(){
    if ($("#name").val() != "" && $("#email").val() != "" && $("#age").val() != "" && $("#password").val() != "") {
        let dataJSON = {
            name:$("#name").val(),
            email:$("#email").val(),
            age:$("#age").val(),
            password:$("#password").val()
        };

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Client/save",
            contentType: "application/json; charset=utf-8",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                consultarCliente();
                alert("Cliente adicionado satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Adicionar");

}

function actualizarCliente(idCliente1){
    if ($("#name").val() != "" && $("#email").val() != "" && $("#age").val() != "") {

        let dataJSON = {
            idClient:idCliente1,
            name:$("#name").val(),
            email:$("#email").val(),
            age:$("#age").val(),
        }

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Client/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                consultarCliente();
                window.alert("Cliente modificado satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Actualizar");
}

/**************************************************************************************** */
/**
 * Rutinas para acceder información Cabañas
 * 
 * */
 function consultarCabaña(){
    $("#resultadoCabaña").empty();
    $("#listCabin").empty();
    $("#listCabin1").empty();
    $("#brand").val("");
    $("#rooms").val("");
    $("#description").val("");
    $("#name1").val("");
    $("#listCategory").val("0");    
    $.ajax({
        url:'http://132.226.250.48:8085/api/Cabin/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){
            let tablaCabaña="<table border='1'>";
            tablaCabaña+="<tr>";
            tablaCabaña+="<th> Nombre </th>";
            tablaCabaña+="<th> Tipo </th>";
            tablaCabaña+="<th> Habitaciones </th>";
            tablaCabaña+="<th> Descripcion </th>";
            tablaCabaña+="<th> Categoría </th>";
            tablaCabaña+="<th colspan='2'> Acciones </th> </tr>";
            tablaCabaña+="</tr>";

            for(i=0;i<respuesta.length;i++){
                console.log(respuesta);
                tablaCabaña+="<tr>";
                tablaCabaña+="<td style='width: 200px'>" + respuesta[i].name + "</td>";
                tablaCabaña+="<td style='width: 210px'>" + respuesta[i].brand + "</td>";
                tablaCabaña+="<td align='center' style='width: 80px'>" + respuesta[i].rooms + "</td>";
                tablaCabaña+="<td style='width: 200px'>" + respuesta[i].description + "</td>";
                tablaCabaña+="<td style='width: 200px'>" + respuesta[i].category.name + "</td>";
                tablaCabaña+="<td> <button onclick='validarCabaña("+respuesta[i].id+")'>Borrar</button>";
                tablaCabaña+="<td> <button onclick='actualizarCabaña("+respuesta[i].id+")'>Actualizar</button>";
                tablaCabaña+="</tr>";
            }
            tablaCabaña+="</table>";
            $("#resultadoCabaña").append(tablaCabaña);

            $("#listCabin").append('<option value=0>-- Cabaña --</option>');
            $.each(respuesta, function (id, cabin) {
                $("#listCabin").append('<option value='+cabin.id+'>'+ cabin.name+'</option>');
            });
            $("#listCabin1").append('<option value=0>-- Cabaña --</option>');
            $.each(respuesta, function (id, cabin) {
                $("#listCabin1").append('<option value='+cabin.id+'>'+ cabin.name+'</option>');
            });            
        }
    });
}
  
function validarCabaña(idCabaña){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Cabin/"+idCabaña,
        type:"GET",
        success:function(respuesta){
            if (respuesta.messages[0] === undefined && respuesta.reservations[0] === undefined) {
                borrarCabaña(idCabaña);
            }
            else {
                alert("Imposible eliminar Cabaña!!!!\nExisten registros de Mensajes o Reservaciones")
            }
        }
    });
}

function borrarCabaña(idCabaña){
    $.ajax({
        url:"http://132.226.250.48:8085/api/Cabin/"+idCabaña,
        type:"DELETE",
        success:function(respuesta){
            consultarCabaña();
            alert("La cabaña se eliminó satisfactoriamente")
        }
    });
}

function adicionarCabaña(){
    if ($("#brand").val() != "" && $("#rooms").val() != "" && $("#description").val() != "" && $("#name1").val() != "" && $("#listCategory").val() != "0") {

        let dataJSON = {
            brand:$("#brand").val(),
            rooms:$("#rooms").val(),
            description:$("#description").val(),
            name:$("#name1").val(),
            category: {id:+$("#listCategory").val()}
        };

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Cabin/save",
            contentType: "application/json; charset=utf-8",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                consultarCabaña();
                alert("La cabaña se adicionó satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Adicionar");
}

function actualizarCabaña(idCabaña){
    if ($("#brand").val() != "" && $("#rooms").val() != "" && $("#description").val() != "" && $("#name1").val() != "" && $("#listCategory").val() != "0") {

        let dataJSON = {
            id:idCabaña,
            name:$("#name1").val(),
            brand:$("#brand").val(),
            rooms:$("#rooms").val(),
            description:$("#description").val(),
            category: {id:+$("#listCategory").val()}
        }

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Cabin/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                consultarCabaña();
                window.alert("Cabaña modificada satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Actualizar");
}

/**************************************************************************************** */
/**
 * Rutinas para acceder información Categoría
 */

 function consultarCategoria(){
    $("#resultadoCategoria").empty();
    $("#listCategory").empty();
    $("#idCategoria").val("");
    $("#name2").val("");
    $("#description2").val("");
    $.ajax({
        url:'http://132.226.250.48:8085/api/Category/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){
            console.log(respuesta);
            let tablaCategoria="<table border='1'>";
            tablaCategoria+="<tr>";
            tablaCategoria+="<th> Nombre </th>";
            tablaCategoria+="<th> Descripción </th>";
            tablaCategoria+="<th colspan='2'> Acciones </th> </tr>";


            for(i=0;i<respuesta.length;i++){
                tablaCategoria+="<tr>";
                tablaCategoria+="<td style='width: 100px'>" + respuesta[i].name + "</td>";
                tablaCategoria+="<td style='width: 205px'>" + respuesta[i].description + "</td>";
                tablaCategoria+="<td> <button onclick='validarCategoria("+respuesta[i].id+")'>Borrar</button>";
                tablaCategoria+="<td> <button onclick='actualizarCategoria("+respuesta[i].id+")'>Actualizar</button>";
                tablaCategoria+="</tr>";
            }
            tablaCategoria+="</table>";
            $("#resultadoCategoria").append(tablaCategoria);

            $("#listCategory").append('<option value=0>-- Categoría --</option>');
            $.each(respuesta, function (id, cat) {
                $("#listCategory").append('<option value='+cat.id+'>'+ cat.name+'</option>');
            });
        }
    });
}

function validarCategoria(idCategoria){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Category/"+idCategoria,
        type:"GET",
        success:function(respuesta){
            if (respuesta.cabins[0] === undefined) {
                borrarCategoria(idCategoria);
            }
            else {
                alert("Imposible eliminar la categoría!!!!\nExisten registros de Cabañas asociados")
            }
        }
    });
}

function borrarCategoria(idCategoria){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Category/"+idCategoria,
        type:"DELETE",
        success:function(respuesta){
            consultarCategoria();
            alert("La categoría se eliminó satisfactoriamente")
        }
    });
}

function adicionarCategoria(){
    if ($("#name2").val() != "" && $("#description2").val() != "") {
        let dataJSON = {
            name:$("#name2").val(),
            description:$("#description2").val(),
        };

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:'http://132.226.250.48:8085/api/Category/save',
            contentType: "application/json; charset=utf-8",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                consultarCategoria();
                alert("Se adicionó la categoría satisfactoriamente");
            }
        });
    } else alert("Digite información válida para Adicionar");
}


function actualizarCategoria(idCategoria){
    if ($("#name2").val() != "" && $("#description2").val() != "") {
        let dataJSON = {
            id:idCategoria,
            name:$("#name2").val(),
            description:$("#description2").val(),
        };

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:'http://132.226.250.48:8085/api/Category/update',
            contentType: "application/json; charset=utf-8",
            type:"PUT",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                consultarCategoria();
                alert("La categoría se actualizó satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Actualizar");
}


/**************************************************************************************** */
/**
 * Rutinas para acceder información Mensajes
 */

 function consultarMensaje(){
    $("#resultadoMensaje").empty();
    $("#messagetext").val("");
    $("#listCabin").val("0");    
    $("#listClient").val("0");
    $()
    $.ajax({
        url:'http://132.226.250.48:8085/api/Message/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){
            console.log(respuesta);
            let tablaMensaje="<table border='1'>";
            tablaMensaje+="<tr>";
            tablaMensaje+="<th> Cabaña </th>";
            tablaMensaje+="<th> Cliente </th>";
            tablaMensaje+="<th> Mensaje </th>";
            tablaMensaje+="<th colspan='2'> Acciones </th> </tr>";


            for(i=0;i<respuesta.length;i++){
                tablaMensaje+="<tr>";
                tablaMensaje+="<td style='width: 150px'>" + respuesta[i].cabin.name + "</td>";
                tablaMensaje+="<td style='width: 150px'>" + respuesta[i].client.name + "</td>";
                tablaMensaje+="<td style='width: 500px'>" + respuesta[i].messageText + "</td>";
                tablaMensaje+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
                tablaMensaje+="<td> <button onclick='actualizarMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
                tablaMensaje+="</tr>";
            }
            tablaMensaje+="</table>";
            $("#resultadoMensaje").append(tablaMensaje);
        }
    });
}

function borrarMensaje(idMensaje){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Message/" + idMensaje,
        type:"DELETE",
        success:function(respuesta){
            consultarMensaje();
            alert("Se eliminó la categoría satisfactoriamente")
        }
    });
}

function adicionarMensaje(){
    if ($("#messagetext").val() != "" && $("#listCabin").val() != "0" && $("#listClient").val() != "0") {

        console.log($("#listClient").val())

        let dataJSON = {
            messageText:$("#messagetext").val(),
            cabin: {id:+$("#listCabin").val()},
            client: {idClient:+$("#listClient").val()},
        };
        console.log(dataJSON)
        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Message/save",
            contentType: "application/json; charset=utf-8",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                consultarMensaje();
                alert("El mensaje se adicionó satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Adicionar");

}

function actualizarMensaje(idMensaje1){
    if ($("#messagetext").val() != "" && $("#listCabin").val() != "0" && $("#listClient").val() != "0") {

        let dataJSON = {
            idMessage:idMensaje1,
            messageText:$("#messagetext").val(),
            cabin: {id:+$("#listCabin").val()},
            client: {idClient:+$("#listClient").val()},
        }
console.log(dataJSON)
        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                consultarMensaje();
                window.alert("El mensaje se modificó satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Adicionar");
}

/**************************************************************************************** */
/**
 * Rutinas para acceder información Reservacion
 */

function consultarReservacion(){
    $("#resultadoReservacion").empty();
    $("#idReservacion").val("");
    $("#startDate").val("");
    $("#endDate").val("");
    $("#status").val("");
    $("#score").val("");
    $("#listCabin1").val("0");    
    $("#listClient1").val("0");    
    $.ajax({
        url:'http://132.226.250.48:8085/api/Reservation/all',
        type:'GET',
        datatype:'JSON',
        success:function(respuesta){
            console.log(respuesta);
            let tablaReservacion="<table border='1'>";
            tablaReservacion+="<tr>";
            tablaReservacion+="<th> Reserva </th>";
            tablaReservacion+="<th> Cliente </th>";
            tablaReservacion+="<th> Cabaña </th>";
            tablaReservacion+="<th> Fecha Inicio </th>";
            tablaReservacion+="<th> Fecha Devolucion </th>";
            tablaReservacion+="<th> Estado </th>";
            tablaReservacion+="<th> Calificación </th>";
            tablaReservacion+="<th colspan='2'> Acciones </th> </tr>";


            for(i=0;i<respuesta.length;i++){
                var start = new Date(respuesta[i].startDate);
                var sY = start.getFullYear();
                var sM = start.getMonth() + 1;
                var sD = start.getDate() + 1;
                var st = sY + "-" + sM + "-" + sD;
                var end = new Date(respuesta[i].devolutionDate);
                var eY = end.getFullYear();
                var eM = end.getMonth() + 1;
                var eD = end.getDate() + 1;
                var en = eY + "-" + eM + "-" + eD;

                tablaReservacion+="<tr>";
                tablaReservacion+="<td align='center' style='width: 45px'>" + respuesta[i].idReservation + "</td>";
                tablaReservacion+="<td style='width: 150px'>" + respuesta[i].client.name + "</td>";
                tablaReservacion+="<td style='width: 150px'>" + respuesta[i].cabin.name + "</td>";
                tablaReservacion+="<td align='center' style='width: 100px'>" + st + "</td>";
                tablaReservacion+="<td align='center' style='width: 140px'>" + en + "</td>";
                tablaReservacion+="<td style='width: 100px'>" + respuesta[i].status + "</td>";
                tablaReservacion+="<td style='width: 80px'>" + respuesta[i].score + "</td>";
                tablaReservacion+="<td> <button onclick='borrarReservacion("+respuesta[i].idReservation+")'>Borrar</button>";
                tablaReservacion+="<td> <button onclick='actualizarReservacion("+respuesta[i].idReservation+")'>Actualizar</button>";
                tablaReservacion+="</tr>";
            }
            tablaReservacion+="</table>";
            $("#resultadoReservacion").append(tablaReservacion);
        }
    });
}

function borrarReservacion(idReservation){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Reservation/" + idReservation,
        type:"DELETE",
        success:function(respuesta){
            consultarReservacion();
            alert("La reservación se eliminó satisfactoriamente")
        }
    });
}

function adicionarReservacion(){
    if ($("#startDate").val() != "" && $("#endDate").val() != "" && $("status").val() != "" && $("#score").val() != "" && $("#listCabin1").val() != "0" && $("#listClient1").val() != "0") {
        let dataJSON = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#endDate").val(),
            status:$("#status").val(),
            score:$("#score").val(),
            cabin: {id:+$("#listCabin1").val()},
            client: {idClient:+$("#listClient1").val()},
        };

        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Reservation/save",
            contentType: "application/json; charset=utf-8",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                consultarReservacion();
                alert("La reservación se adicionó satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Adicionar");

}

function actualizarReservacion(idReservation1){
    if ($("#startDate").val() != "" && $("#endDate").val() != "" && $("status").val() != "" && $("#score").val() != "" && $("#listCabin1").val() != "0" && $("#listClient1").val() != "0") {

        let dataJSON = {
            idReservation: idReservation1,
            startDate:$("#startDate").val(),
            devolutionDate:$("#endDate").val(),
            status:$("#status").val(),
            score:$("#score").val(),
            cabin: {id:+$("#listCabin1").val()},
            client: {idClient:+$("#listClient1").val()},
        };
        console.log(dataJSON)
        let dataToSend = JSON.stringify(dataJSON);

        $.ajax({
            url:"http://132.226.250.48:8085/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                consultarReservacion();
                window.alert("La reserva se modificó satisfactoriamente");
            }
        });
    } else alert("Falta información válida para Actualizar");
    
}

function reporteReservas(){
    $("#resultadoReport").empty();


    if ($("#startDate").val() != "" && $("#endDate").val() != "" ) {
        var dateFrom = $("#startDate").val()
        var dateTo = $("#endDate").val()
        $.ajax({
            url:"http://132.226.250.48:8085/api/Reservation/report-dates/" + dateFrom + "/" + dateTo + "/",
            type:"GET",
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                let tableReport="<table border='1'>";
                tableReport+="<tr>";
                tableReport+="<th> Reserva </th>";
                tableReport+="<th> Cliente </th>";
                tableReport+="<th> Cabaña </th>";
                tableReport+="<th> Fecha Inicio </th>";
                tableReport+="<th> Fecha Devolucion </th>";
                tableReport+="<th> Estado </th>";
                tableReport+="<th> Calificación </th>";

                for(i=0;i<respuesta.length;i++){
                    var start = new Date(respuesta[i].startDate);
                    var sY = start.getFullYear();
                    var sM = start.getMonth() + 1;
                    var sD = start.getDate() + 1;
                    var st = sY + "-" + sM + "-" + sD;
                    var end = new Date(respuesta[i].devolutionDate);
                    var eY = end.getFullYear();
                    var eM = end.getMonth() + 1;
                    var eD = end.getDate() + 1;
                    var en = eY + "-" + eM + "-" + eD;

                    tableReport+="<tr>";
                    tableReport+="<td align='center' style='width: 45px'>" + respuesta[i].idReservation + "</td>";
                    tableReport+="<td style='width: 150px'>" + respuesta[i].client.name + "</td>";
                    tableReport+="<td style='width: 150px'>" + respuesta[i].cabin.name + "</td>";
                    tableReport+="<td align='center' style='width: 100px'>" + st + "</td>";
                    tableReport+="<td align='center' style='width: 140px'>" + en + "</td>";
                    tableReport+="<td style='width: 100px'>" + respuesta[i].status + "</td>";
                    tableReport+="<td style='width: 80px'>" + respuesta[i].score + "</td>";
                    tableReport+="</tr>";
                }
                tableReport+="</table>";
                $("#resultadoReport").append(tableReport);
          




            }
        });
    } else alert("Falta información válida para generar el reporte");

}


function reporteCompara(){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Reservation/report-status",
        type:"GET",
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            let tableReport="<table border='1'>";
            tableReport+="<tr>";
            tableReport+="<th> Reservas Completadas</th>";
            tableReport+="<th> Reservas Canceladas </th>";
            tableReport+="</tr>";

//            console.log(respuesta)
//            for(i=0;i<respuesta.length;i++){
                tableReport+="<tr>";
                tableReport+="<td align='center' style='width: 100px'>" + respuesta.completed + "</td>";
                tableReport+="<td align='center' style='width: 100px'>" + respuesta.cancelled + "</td>";
                tableReport+="</tr>";
//            }
            tableReport+="</table>";
            $("#resultadoReport1").append(tableReport);
        }
    });
}


function reporteRanking(){

    $.ajax({
        url:"http://132.226.250.48:8085/api/Reservation/report-clients",
        type:"GET",
        success:function(respuesta){
            let tableReport="<table border='1'>";
            tableReport+="<tr>";
            tableReport+="<th> # de Reservas </th>";
            tableReport+="<th> Cliente </th>";
            tableReport+="<th> eMail </th>";
            tableReport+="</tr>";

            for(i=0;i<respuesta.length;i++){
                tableReport+="<tr>";
                tableReport+="<td align='center' style='width: 100px'>" + respuesta[i].total + "</td>";
                tableReport+="<td align='center' style='width: 200px'>" + respuesta[i].client.name + "</td>";
                tableReport+="<td align='center' style='width: 200px'>" + respuesta[i].client.email + "</td>";
                tableReport+="</tr>";
            }
            tableReport+="</table>";
            $("#resultadoReport2").append(tableReport);
        }
    });
}