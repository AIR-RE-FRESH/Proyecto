<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conexion extends Model
{
    use HasFactory;

    protected $table = 'conexion';

    protected $fillable = ['MAC', 'Temperatura', 'Humedad', 'Gas', 'Presion'];

    public $timestamps = false;
}
