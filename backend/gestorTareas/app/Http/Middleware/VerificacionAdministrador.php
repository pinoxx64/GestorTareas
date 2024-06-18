<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class VerificacionAdministrador
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usuario = Auth::user();
        $esAdministrador = DB::table('usuario_rol')
        ->where('id_usuario', $usuario->id)
        ->where('id_rol', 1)
        ->exists();

        if ($usuario && $esAdministrador) {
            return $next($request);
        }

        
        return response()->json(['message' => 'Acceso no autorizado'],  Response::HTTP_FORBIDDEN);
    }
}
