<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\tareas;
use App\Models\usuario;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TareaController extends Controller
{
    public function tareasGet()
    {
        $tareas = tareas::all();
        return response()->json(['tareas' => $tareas]);
    }

    public function tareaPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'descripcion' => 'required|string',
            'dificultad' => 'required|string|in:XS,S,M,L,XL',
            'horas_estimadas' => 'required|integer|min=1',
            'horas_actuales' => 'integer|min=0',
            'porcentaje' => 'required|string',
            'completo' => 'required|integer',
            'id_usuario' => 'integer'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $tarea = tareas::create([
                'descripcion' => $request['descripcion'],
                'dificultad' => $request['dificultad'],
                'horas_estimadas' => $request['horas_estimadas'],
                'horas_actuales' => $request['horas_actuales'],
                'porcentaje' => $request['porcentaje'],
                'completo' => $request['completo'],
                'id_usuario' => $request['id_usuario'],
            ]);
        }
    }

    public function tareaGet($id_tareas)
    {
        $tarea = tareas::find($id_tareas);

        if (!$tarea) {
            return response()->json(['message' => 'tarea no encontrado'], 404);
        }

        return response()->json(['tarea' => $tarea]);
    }

    public function tareaDelete($id_tareas)
    {
        $tarea = tareas::find($id_tareas);
        $tarea->delete();

        return response()->json(['message' => 'tarea eliminado exitosamente']);
    }

    public function tareaPut(Request $request,$id_tareas)
    {
        $tarea = tareas::find($id_tareas);

        if (!$tarea) {
            return response()->json(['message' => 'tarea no encontrado'], 404);
        }

        $tarea->update([
                'descripcion' => $request['descripcion'],
                'dificultad' => $request['dificultad'],
                'horas_estimadas' => $request['horas_estimadas'],
                'horas_actuales' => $request['horas_actuales'],
                'porcentaje' => $request['porcentaje'],
                'completo' => $request['completo'],
                'id_usuario' => $request['id_usuario']
        ]);

        return response()->json(['tarea' => $tarea, 'message' => 'tarea actualizado exitosamente']);
    }

    public function asignarMejorProgramador(Request $request)
    {
        $request->validate([
            'descripcion' => 'required|string',
            'dificultad' => 'required|string|in:XS,S,M,L,XL',
            'horas_estimadas' => 'required|integer|min=1',
        ]);

        $programadores = usuario::where('rol', 'programador')->get();

        $mejorProgramador = $programadores->sortByDesc('eficiencia')->first();

        if (!$mejorProgramador) {
            return response()->json(['message' => 'No hay programadores disponibles'], 404);
        }

        $tarea = tareas::find();
        $tarea->update([
            'descripcion' => $request['descripcion'],
            'dificultad' => $request['dificultad'],
            'horas_estimadas' => $request['horas_estimadas'],
            'horas_actuales' => $request['horas_actuales'],
            'porcentaje' => $request['porcentaje'],
            'completo' => $request['completo'],
            'id_usuario' => $request['id_usuario']
    ]);

        return response()->json(['message' => 'Tarea asignada exitosamente', 'tarea' => $tarea], 201);
    }
}
