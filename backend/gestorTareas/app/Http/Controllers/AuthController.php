<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    /*public function login(Request $request)
    {
        $credenciales = [
            'correo' => $request->input('correo'),
            'contrasena' => $request->input('contrasena'),
        ];

        if (Auth::attempt($credenciales)) {
            $token = Auth::user()->createToken('token')->plainTextToken;
            return response(['token' => $token], Response::HTTP_OK);
        } else {
            return response(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
    }*/
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'contrasena' => 'required',
        ]);

        $user = usuario::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Desconectado correctamente'], 200);
    }
}
