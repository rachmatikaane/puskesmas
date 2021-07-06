<?php

namespace Database\Factories;

use App\Models\ResepObat;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResepObatFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ResepObat::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $obat_ids = \App\Models\Obat::pluck('id');
        $kunjungan_ids = \App\Models\Kunjungan::pluck('id');

        return [
            'id_obat' => $this->faker->randomElement($obat_ids),
            'id_kunjungan' => $this->faker->randomElement($kunjungan_ids),
            'jumlah' => $this->faker->numberBetween(1, 10),
            'tanggal' => $this->faker->date(),
            'aturan_pakai' => $this->faker->randomElement(["3 x 1 sdm/hari", "2 x 1/hari"]),
            'status' => $this->faker->boolean(),
        ];
    }
}
