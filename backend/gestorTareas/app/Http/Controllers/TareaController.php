<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\tareas;
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
            'nombre' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $tarea = tareas::create([
                'nombre' => $request['nombre'],
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
            'nombre' => $request['nombre']
        ]);

        return response()->json(['tarea' => $tarea, 'message' => 'tarea actualizado exitosamente']);
    }
}
