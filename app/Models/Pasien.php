<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $table = "pasien";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'nik',
        'no_rekam_medis',
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'gol_darah',
        'alamat',
        'kecamatan',
        'kelurahan',
        'kota',
        'provinsi',
        'kontak',
        'pekerjaan',
        'status_menikah',
        'no_bpjs',
        'created_at',
        'updated_at'
     ];
}
