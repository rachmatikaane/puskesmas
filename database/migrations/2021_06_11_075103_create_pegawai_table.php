<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pegawai', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_pelayanan');
            $table->unsignedBigInteger('id_pengguna');
            $table->string('nama', 100);
            $table->string('jabatan', 100);
            $table->foreign('id_pelayanan')->references('id')->on('pelayanan')->onDelete('cascade');
            $table->foreign('id_pengguna')->references('id')->on('pengguna')->onDelete('cascade');
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
        Schema::dropIfExists('pegawai');
    }
}
