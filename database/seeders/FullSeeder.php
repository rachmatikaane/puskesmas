<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
     public function run()
     {
        \App\Models\Pegawai::factory()->count(50)->create();
        \App\Models\Pasien::factory()->count(50)->create();
        \App\Models\Kunjungan::factory()->count(50)->create();
        \App\Models\Obat::factory()->count(50)->create();
        \App\Models\ResepObat::factory()->count(50)->create();
     }
}