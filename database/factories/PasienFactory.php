<?php

namespace Database\Factories;

use App\Models\Pasien;
use Illuminate\Database\Eloquent\Factories\Factory;

class PasienFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pasien::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nik' => $this->faker->unique()->numerify('#################'),
            'no_rekam_medis' => $this->faker->unique()->bothify('#?#?#?##??#?#?'),
            'nama' => $this->faker->name(),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date('Y-m-d', '-6 years'),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'gol_darah' => $this->faker->randomElement(['A', 'B', 'O']),
            'alamat' => $this->faker->address(),
            'kecamatan' => $this->faker->state(),
            'kelurahan' => $this->faker->country(),
            'kota' => $this->faker->city(),
            'provinsi' => $this->faker->state(),
            'kontak' => $this->faker->numerify('08##########'),
            'pekerjaan' => $this->faker->jobTitle(),
            'status_menikah' => $this->faker->randomElement(['Menikah', 'Belum Menikah']),
            'no_bpjs' => $this->faker->randomElement([$this->faker->bothify('?#?##?#?#??##?', null)]),
        ];
    }
}
