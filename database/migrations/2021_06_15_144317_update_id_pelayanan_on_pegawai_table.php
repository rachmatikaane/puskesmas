<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateIdPelayananOnPegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         Schema::table('pegawai', function (Blueprint $table) {
             $table->unsignedBigInteger('id_pelayanan')->nullable()->change();
         });
     }
 
     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::table('pegawai', function (Blueprint $table) {
             $table->unsignedBigInteger('id_pelayanan')->nullable(false)->change();
         });
     }
}
