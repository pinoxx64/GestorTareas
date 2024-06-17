<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request)
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
    }
}
