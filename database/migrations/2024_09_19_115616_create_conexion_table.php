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
        Schema::create('conexion', function (Blueprint $table) {
            $table->id(); // ID como columna primaria
            $table->string('MAC', 20)->nullable();
            $table->foreign('MAC')->references('mac_address')->on('users')->onDelete('cascade'); // Relación con users
            $table->float('Temperatura'); // Temperatura como float
            $table->float('Humedad'); // Humedad como float
            $table->float('Gas'); // Gas como float
            $table->float('Presion'); // Presión como float
            $table->dateTime('Fecha', 6)->default(DB::raw('CURRENT_TIMESTAMP(6)')); // Fecha con precisión de 6 y valor por defecto actual
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conexion');
    }
};
