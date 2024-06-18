<?php

namespace Database\Seeders;

use App\Models\tareas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class tareasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        tareas::factory()->count(50)->create();
    }
}
