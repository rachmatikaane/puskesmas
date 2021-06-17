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
        DB::table('pengguna')->insert([
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'peran' => 'admin',
        ]);

        DB::table('pelayanan')->insert([
            [ 'nama' => 'Poli Anak' ],
            [ 'nama' => 'Poli Umum' ],
            [ 'nama' => 'Poli Gigi' ],
            [ 'nama' => 'UGD' ],
            [ 'nama' => 'Laboratorium' ],
        ]);

        DB::table('kontak')->insert([
            [ 
                'icon' => env('APP_URL') . '/assets/telepon.png',
                'nama' => 'telepon', 
                'isi' => '(+62) 212-020-3681' ,
                'url' => null
            ],
            [ 
                'icon' => env('APP_URL') . '/assets/instagram.png',
                'nama' => 'instagram', 
                'isi' => '@puskesmasciwaruga_', 
                'url' => 'https://www.instagram.com/puskesmasciwaruga_' 
            ],
            [ 
                'icon' => env('APP_URL') . '/assets/alamat.png',
                'nama' => 'alamat', 
                'isi' => 'Jl. Waruga Jaya No.4, Ciwaruga, Parongpong' ,
                'url' => null
            ],
            [ 
                'icon' => env('APP_URL') . '/assets/facebook.png',
                'nama' => 'facebook', 
                'isi' => 'Puskesmas Ciwaruga', 
                'url' => 'https://www.facebook.com/Puskesmas-Ciwaruga-121425699258724/' 
            ],
        ]);

        DB::table('jadwal')->insert([
            [ 'hari' => 'Senin', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
            [ 'hari' => 'Selasa', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
            [ 'hari' => 'Rabu', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
            [ 'hari' => 'Kamis', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
            [ 'hari' => 'Jumat', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
            [ 'hari' => 'Sabtu', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
            [ 'hari' => 'Minggu', 'jam_mulai' => '08:00', 'jam_selesai' => '16:00' ],
        ]);

        \App\Models\Pegawai::factory()->count(50)->create();
        \App\Models\Pasien::factory()->count(50)->create();
        \App\Models\Kunjungan::factory()->count(50)->create();
        \App\Models\Obat::factory()->count(50)->create();
        \App\Models\ResepObat::factory()->count(50)->create();
    }
}
