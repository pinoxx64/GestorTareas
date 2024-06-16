<?php

namespace Database\Factories;

use App\Models\usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class usuarioFactory extends Factory
{
    protected $model = usuario::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'correo' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'contrasena' => Hash::make('contrasena'),
            'remember_token' => Str::random(10),
        ];
    }
}
