<?php

namespace Database\Factories;

use App\Models\Kunjungan;
use Illuminate\Database\Eloquent\Factories\Factory;

class KunjunganFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Kunjungan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $antrian = new \App\Models\Antrian();
        $antrian->no = (count(\App\Models\Antrian::pluck('id')) % 50) + 1;
        $antrian->tanggal = date("Y-m-d");
        $antrian->status = $this->faker->boolean();
        $antrian->save();

        $rekam_medis = new \App\Models\RekamMedis();
        $rekam_medis->tanggal = date("Y-m-d");
        $rekam_medis->anamnesis = $this->faker->paragraphs(2, true);
        $rekam_medis->hasil_pemeriksaan = $this->faker->paragraphs(2, true);
        $rekam_medis->save();
        
        $medis_ids = \App\Models\Pegawai::whereNotNull('id_pelayanan')->pluck('id');
        $pasien_ids = \App\Models\Pasien::pluck('id');

        return [
            'id_nomor_antrian' => $antrian->id,
            'id_pasien' => $this->faker->randomElement($pasien_ids),
            'id_pegawai' => $this->faker->randomElement($medis_ids),
            'id_rekam_medis' => $rekam_medis->id,
            'tanggal' => $this->faker->date(),
            'waktu' => $this->faker->time(),
            'status' => $this->faker->boolean(),
            'no_resep_obat' => $this->faker->unique()->bothify('#?#?#?##??#?#?'),
            'jenis_pembayaran' => $this->faker->randomElement(['BPJS', 'Umum']),
            'total_harga' => $this->faker->randomNumber(5),
            'lunas' => $this->faker->boolean(),
        ];
    }
}
