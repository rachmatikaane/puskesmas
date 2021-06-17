<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antrian extends Model
{
    use HasFactory;

    protected $table = "nomor_antrian";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'no',
        'tanggal',
        'status',
        'created_at',
        'updated_at '
    ];

    public function kunjungan() {
        return $this->hasOne(\App\Models\Kunjungan::class, 'id_nomor_antrian');
    }
}
