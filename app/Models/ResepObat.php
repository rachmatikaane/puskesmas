<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResepObat extends Model
{
    use HasFactory;

    protected $table = "resep_obat";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'id_obat',
        'id_kunjungan',
        'jumlah',
        'tanggal',
        'status',
        'created_at',
        'updated_at'
    ];
}
