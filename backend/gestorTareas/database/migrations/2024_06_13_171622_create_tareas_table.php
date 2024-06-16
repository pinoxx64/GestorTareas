<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion');
            $table->enum('dificultad', ['XS', 'S', 'M', 'L', 'XL']);
            $table->integer('horas_estimadas');
            $table->integer('horas_actuales')->nullable();
            $table->integer('porcentaje')->default(0);
            $table->boolean('completo')->default(false);
            $table->foreignId('id_usuario')->nullable()->constrained('usuarios')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas');
    }
};
