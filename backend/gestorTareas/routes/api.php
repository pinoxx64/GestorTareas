<?php

use App\Http\Controllers\RolController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::get('usuario', [UsuarioController::class], 'usuariosGet');
Route::post('usuario', [UsuarioController::class], 'usuarioPost');
Route::get('usuario/{id}', [UsuarioController::class], 'usuarioGet');
Route::put('usuario/{id}', [UsuarioController::class], 'usuarioPut');
Route::delete('usuario/{id}', [UsuarioController::class], 'usuarioDelete');

Route::get('tarea', [tareaController::class], 'tareasGet');
Route::post('tarea', [tareaController::class], 'tareaPost');
Route::get('tarea/{id}', [tareaController::class], 'tareaGet');
Route::put('tarea/{id}', [tareaController::class], 'tareaPut');
Route::delete('tarea/{id}', [tareaController::class], 'tareaDelete');

Route::get('rol', [rolController::class], 'rolesGet');
Route::post('rol', [rolController::class], 'rolPost');
Route::get('rol/{id}', [rolController::class], 'rolGet');
Route::put('rol/{id}', [rolController::class], 'rolPut');
Route::delete('rol/{id}', [rolController::class], 'rolDelete');
