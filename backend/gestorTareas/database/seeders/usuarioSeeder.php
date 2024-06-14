<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use App\Models\rol;
use App\Models\usuario;
use App\Models\usuarioRol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class usuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        $adminRol = rol::where('name', 'Administrador')->first();
        $programadorRol = rol::where('name', 'Programador')->first();

        usuario::factory()
            ->count(10)
            ->create()
            ->each(function ($usuario) use ($faker, $adminRol, $programadorRol) {
                $rol = $faker->randomElement([$adminRol, $programadorRol]);
                usuarioRol::factory()->create([
                    'id_rol' => $rol->id,
                    'id_usuario' => $usuario->id,
                ]);
            });
    }
}
