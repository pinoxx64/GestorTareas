<?php

namespace Database\Factories;

use App\Models\tareas;
use App\Models\usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class tareasFactory extends Factory
{
    protected $model = tareas::class;

    public function definition()
    {
        return [
            'descripcion' => $this->faker->sentence,
            'dificultad' => $this->faker->randomElement(['XS', 'S', 'M', 'L', 'XL']),
            'horas_estimadas' => $this->faker->numberBetween(1, 100),
            'horas_actuales' => $this->faker->numberBetween(1, 100),
            'porcentaje' => $this->faker->numberBetween(0, 100),
            'completo' => $this->faker->boolean,
            'id_usuario' => usuario::factory(),
        ];
    }
}
