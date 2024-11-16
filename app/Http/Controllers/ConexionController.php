<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conexion;

class ConexionController extends Controller
{    

    public function store(Request $request)
    {

        $datosJson = json_decode($request->getContent(), true);
        
        foreach ($datosJson['Datos'] as $dato) {
            // Creamos un nuevo modelo y asignamos los valores
            $nuevoDato = new Conexion();
            $nuevoDato->Temperatura = $dato['Temperatura'];
            $nuevoDato->Humedad = $dato['Humedad'];
            $nuevoDato->Gas = $dato['Gas'];
            $nuevoDato->MAC = $dato['MAC'];
            $nuevoDato->Presion = $dato['Presion'];
            $nuevoDato->save();

            return response()->json(['message' => 'Datos almacenados correctamente'], 200);

        }

    }   

    
    function list()
    {
        return Conexion::all();
    }
} 
