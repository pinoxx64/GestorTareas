<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\rol;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    public function rolesGet()
    {
        $roles = rol::all();
        return response()->json(['roles' => $roles]);
    }

    public function rolPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $rol = rol::create([
                'nombre' => $request['nombre'],
            ]);
        }
    }

    public function rolGet($id_rol)
    {
        $rol = rol::find($id_rol);

        if (!$rol) {
            return response()->json(['message' => 'rol no encontrado'], 404);
        }

        return response()->json(['rol' => $rol]);
    }

    public function rolDelete($id_rol)
    {
        $rol = rol::find($id_rol);
        $rol->delete();

        return response()->json(['message' => 'rol eliminado exitosamente']);
    }

    public function rolPut(Request $request,$id_rol)
    {
        $rol = rol::find($id_rol);

        if (!$rol) {
            return response()->json(['message' => 'rol no encontrado'], 404);
        }

        $rol->update([
            'nombre' => $request['nombre']
        ]);

        return response()->json(['rol' => $rol, 'message' => 'rol actualizado exitosamente']);
    }
}
