<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKunjunganTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kunjungan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_nomor_antrian');
            $table->unsignedBigInteger('id_pasien');
            $table->unsignedBigInteger('id_pegawai');
            $table->date('tanggal');
            $table->time('waktu');
            $table->boolean('status')->default(0);
            $table->string('jenis_pembayaran', 10);
            $table->integer('total_harga');
            $table->boolean('lunas')->default(0);
            $table->foreign('id_nomor_antrian')->references('id')->on('nomor_antrian');
            $table->foreign('id_pasien')->references('id')->on('pasien');
            $table->foreign('id_pegawai')->references('id')->on('pegawai');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kunjungan');
    }
}
