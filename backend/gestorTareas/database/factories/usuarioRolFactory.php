<?php

namespace Database\Factories;

use App\Models\usuario;
use App\Models\rol;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\usuarioRol>
 */
class usuarioRolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_rol' => Rol::factory(),
            'id_usuario' => usuario::factory(),
        ];
    }
}
