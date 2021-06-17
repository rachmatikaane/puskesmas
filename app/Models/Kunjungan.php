<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    use HasFactory;

    protected $table = "kunjungan";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'id_nomor_antrian',
        'id_pasien',
        'id_pegawai',
        'id_rekam_medis',
        'tanggal',
        'waktu',
        'status',
        'jenis_pembayaran',
        'total_harga',
        'lunas',
        'created_at',
        'updated_at'
    ];
}
