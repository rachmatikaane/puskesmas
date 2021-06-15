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
    }
}
