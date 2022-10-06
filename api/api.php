<?
include("include/session.php");
include("include/func1.php");
include("include/_enviar_email.php");

$accion = $_GET["accion"];
$datos = array();
$estado = '';
$mensaje = '';

switch ($accion) {
	case "":
		/**
		 * Error, no se pasa acción
		 */
		$estado = "error";
		$mensaje = "No se ha pasado acción";
		break;

	case "add_solicitud":
		/**
		 * Capturar datos del form
		 * Updatear datos del formulario en la tabla
		 * Enviar email
		 */

		# 1.- Capturar datos del form
		$form_data  = json_decode(file_get_contents("php://input"));

		$direccion	=  $database->escape_str($form_data->direccion);		
		$cp			= $form_data->cp; 
		$poblacion	= $database->escape_str($form_data->poblacion);
		$provincia	= $form_data->provincia;

		# 2.- Formatear datos
		$provincia 	= strtoupper($provincia);  

		# 3.- Grabar datos en la tabla solicitudes_registro
		$q  = 'INSERT into solicitudes_registro ';
		$q .= '(nombreFiscal, nombreComercial, dir, dirCp,dirPob,dirPro,contacto,eMail,telefono,iban,nif,codCli,recogida,seguro,tarifa) ';
		$q .= 'VALUES ';
		$q .= "('$nombreFiscal', '$nombreComercial', '$dir', '$dirCp','$dirPob','$dirPro','$contacto','$eMail','$telefono','$iban','$nif','$codCli','$recogida','$seguro','$tarifa'); ";
		$auxInsert = $database->query($q);

		# 4.- enviar eMail 
		$body  .= "
		<table class='table table-striped'>    
		<tbody>
		<tr>
			<td valign='top'><b><h1>Departamento:</h1></b></td>
			<td><h1> $auxLast_id </h1></td>
		</tr> 

		<tr>
			<td valign='top'><b>Nombre:</b></td>
			<td> $nombre </td>
		</tr>  
		      
		<tr>
			<td valign='top'><b>Dirección:</b></td>
			<td> $direccion  <br> $cp - $poblacion  ($provincia)</td>
		</tr>
	   </tbody>
	  </table>
	  ";
		$asunto = "Nuevo formulario de solicitud de alta " . time();
		$auxEnvio = $enviarEmail->sendEmail(EMAIL_SEND, $asunto, $body);

		$estado = "ok";

		if (!$auxInsert) {
			$estado = "error";
			$mensaje = "No se han podido insertar datos";
		}
		if ($auxEnvio <> 'OK') {
			$estado = "error";
			$mensaje = " Error enviando eMail: $auxEnvio";
		}

		// Montar array de respuesta 
		$datos = array(
			'body' => $body,
			'q' => $q
		);

		if ($estado == "ok") $mensaje = "Solicitud enviada";
		break;

	case "busca_cp":
		/**
		 * Buscar Poblacion/es y Provincia en base a un CP
		 * Devolver array de Poblaciones y datos de provinvia
		 */

		$cp = $_GET["cp"];
		$estado = "ok";
		if (!$cp) {
			$estado = "error";
			$mensaje = "No se ha pasado cp";
		}
		$aux = substr($cp, 0, 2);
		$q1 = "SELECT * from aux_provincias WHERE cod_pro='$aux' ";
		$List = $database->getQuery($q1);
		$provincia = $List[0]['provincia'];

		$q = "SELECT * from poblacionesenvialia WHERE CP='$cp' ORDER BY Poblacion ";
		$List = $database->getQueryAssoc($q);

		if (!$List) $estado = "error";

		// Montar array de respuesta 
		$datos = array(
			'lista' => $List,
			'provincia' => $provincia,
			'q' => $q1
		);
		break;

	default:
		$estado = "error";
		$mensaje = "Acción no encontrada";
}




// Añadir estado al array de datos
$datos["estado"] = $estado;
$datos["mensaje"] = $mensaje;
$datos["accion"] = $accion;


//	CABECERAS	//

header('Content-Type: application/json');

// Evitar error blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
header('Access-Control-Allow-Origin: *');

//Devolvemos el array pasado a JSON como objeto
http_response_code(200);


//echo json_encode($datos, JSON_FORCE_OBJECT);
echo json_encode($datos);
