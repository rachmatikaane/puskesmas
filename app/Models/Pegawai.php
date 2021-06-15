<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;

    protected $table = "pegawai";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'id_pelayanan',
        'id_pengguna',
        'nama',
        'jabatan',
        'created_at',
        'updated_at'
    ];

    public function pengguna() {
        return $this->belongsTo(Pengguna::class, 'id_pengguna');
    }

    public function pelayanan() {
        return $this->belongsTo(Pelayanan::class, 'id_pelayanan');
    }
}
