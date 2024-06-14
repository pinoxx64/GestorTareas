<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class usuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'correo',
        'contrasena'
    ];

    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'contrasena' => 'hashed',
    ];

    public function rol()
    {
        return $this->belongsToMany(Rol::class);
        return $this->belongsToMany(Rol::class)->using(UsuarioRol::class);
    }

    public function tareas()
    {
        return $this->hasMany(Tareas::class);
    }
}
