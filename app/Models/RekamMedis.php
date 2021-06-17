<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedis extends Model
{
    use HasFactory;

    protected $table = "rekam_medis";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'tanggal',
        'anamnesis',
        'hasil_pemeriksaan',
        'created_at',
        'updated_at'
    ];
}
