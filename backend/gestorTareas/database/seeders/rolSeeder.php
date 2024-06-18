<?php

namespace Database\Seeders;

use App\Models\rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class rolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        rol::factory()->create(['nombre' => 'Administrador']);
        rol::factory()->create(['nombre' => 'Programador']);
    }
}
