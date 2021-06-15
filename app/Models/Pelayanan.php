<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelayanan extends Model
{
    use HasFactory;

    protected $table = "pelayanan";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'nama',
        'created_at',
        'updated_at'
    ];

    public function pegawai() {
        return $this->hasMany(Pegawai::class, 'id_pelayanan');
    }
}
