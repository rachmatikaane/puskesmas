<?php

namespace Database\Factories;

use App\Models\Obat;
use Illuminate\Database\Eloquent\Factories\Factory;

class ObatFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Obat::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nama' => $this->faker->colorName(),
            'stok' => $this->faker->numberBetween(1, 200),
            'satuan' => $this->faker->randomElement(['pcs', 'botol', 'unit'])
        ];
    }
}
