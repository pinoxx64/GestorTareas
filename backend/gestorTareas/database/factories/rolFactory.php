<?php

namespace Database\Factories;

use App\Models\Rol;
use Illuminate\Database\Eloquent\Factories\Factory;

class rolFactory extends Factory
{
    protected $model = Rol::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->unique()->jobTitle,
        ];
    }
}
