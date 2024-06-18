<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UsuarioController extends Controller
{
    public function usuariosGet()
    {
        $usuarios = usuario::all();
        return response()->json(['usuarios' => $usuarios]);
    }

    public function usuarioPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255|unique:users',
            'contrasena' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $usuario = usuario::create([
                'nombre' => $request['nombre'],
                'correo' => $request['correo'],
                'contrasena' => bcrypt($request['contrasena']),
            ]);
        }
    }

    public function usuarioGet($id_usuario)
    {
        $usuario = usuario::find($id_usuario);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json(['usuario' => $usuario]);
    }

    public function usuarioDelete($id_usuario)
    {
        $usuario = usuario::find($id_usuario);
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }

    public function usuarioPut(Request $request,$id_usuario)
    {
        $usuario = usuario::find($id_usuario);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->update([
            'nombre' => $request['nombre'],
            'correo' => $request['correo'],
            'contrasena' => bcrypt($request['contrasena']),
        ]);

        return response()->json(['usuario' => $usuario, 'message' => 'Usuario actualizado exitosamente']);
    }
}
