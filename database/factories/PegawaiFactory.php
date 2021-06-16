<?php

namespace Database\Factories;

use App\Models\Pegawai;
use App\Models\Pengguna;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class PegawaiFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pegawai::class;

    protected function randomPeran(int $n) {
        switch ($n) {
            case 1: return 'admin';
            case 2: return 'pendaftaran';
            case 3: return 'medis';
            case 4: return 'pembayaran';
            case 5: return 'apoteker';
            case 6: return 'antrian';
        };
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $peran = $this->randomPeran($this->faker->numberBetween(1, 6));

        $pengguna = new Pengguna;
        $pengguna->username = $this->faker->unique()->username();
        $pengguna->password = Hash::make('password123');
        $pengguna->peran = $peran;
        $pengguna->save();
        
        return [
            'id_pelayanan' => $peran == 'medis' ? $this->faker->numberBetween(1, 5) : null,
            'id_pengguna' => $pengguna->id,
            'nama' => $this->faker->name(),
            'jabatan' => $this->faker->name(),
        ];
    }
}
