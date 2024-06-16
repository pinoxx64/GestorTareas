<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tareas extends Model
{
    use HasFactory;

    protected $fillable = [
        'descripcion',
        'dificultad',
        'horas_estimadas',
        'horas_actuales',
        'porcentaje',
        'completo',
        'id_usuario',
    ];

    public function usuario()
    {
        return $this->belongsTo(usuario::class);
    }
}
