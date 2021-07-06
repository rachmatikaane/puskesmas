<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\PelayananController;
use App\Http\Controllers\AntrianController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\KunjunganController;
use App\Http\Controllers\PemeriksaanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::user()->peran == 'admin') {
        return redirect()->route('pegawai');
    }

    if (Auth::user()->peran == 'antrian') {
        return redirect()->route('antrian');
    }

    if (Auth::user()->peran == 'pendaftaran') {
        return redirect()->route('antrian.list');
    }
    
    if (Auth::user()->peran == 'medis') {
        return redirect()->route('antrian.medis');
    }

    return redirect()->route('pegawai');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group([
    "prefix" => 'pegawai', 
    "middleware" => ['auth', 'verified', 'role:admin']
], function() {
    Route::get('/', [PegawaiController::class, 'index'])->name('pegawai');
    Route::get('/tambah', [PegawaiController::class, 'create'])->name('pegawai.create');
    Route::post('/tambah', [PegawaiController::class, 'store'])->name('pegawai.store');
    Route::get('/{id_pegawai}', [PegawaiController::class, 'edit'])->name('pegawai.edit');
    Route::put('/{id_pegawai}', [PegawaiController::class, 'update'])->name('pegawai.update');
    Route::delete('/{id_pegawai}', [PegawaiController::class, 'delete'])->name('pegawai.delete');
    Route::get('/{id_pegawai}/detail', [PegawaiController::class, 'show'])->name('pegawai.show');
});

Route::group([
    "prefix" => 'layanan',
    "middleware" => ['auth', 'verified', 'role:admin']
], function() {
    Route::get('/', [PelayananController::class, 'index'])->name('layanan');
    Route::get('/tambah', [PelayananController::class, 'create'])->name('layanan.create');
    Route::post('/tambah', [PelayananController::class, 'store'])->name('layanan.store');
    Route::get('/{id_pelayanan}', [PelayananController::class, 'edit'])->name('layanan.edit');
    Route::put('/{id_pelayanan}', [PelayananController::class, 'update'])->name('layanan.update');
    Route::delete('/{id_pelayanan}', [PelayananController::class, 'delete'])->name('layanan.delete');
    Route::get('/{id_pelayanan}/detail', [PelayananController::class, 'show'])->name('layanan.show');
});

Route::group([
    "prefix" => 'antrian',
    "middleware" => ['auth', 'verified', 'role:admin|antrian|pendaftaran|medis']
], function() {
    Route::get('/', [AntrianController::class, 'index'])->name('antrian');
    Route::post('/ambil', [AntrianController::class, 'ambil'])->name('antrian.ambil');

    Route::get('/list', [AntrianController::class, 'list'])->name('antrian.list');
    Route::post('/skip', [AntrianController::class, 'skip'])->name('antrian.skip');
    
    Route::get('/medis', [AntrianController::class, 'medis'])->name('antrian.medis');
});

Route::group([
    "prefix" => 'pasien',
    "middleware" => ['auth', 'verified', 'role:admin|pendaftaran|medis']
], function() {
    Route::get('/', [PasienController::class, 'index'])->name('pasien');
    Route::get('/tambah', [PasienController::class, 'create'])->name('pasien.create');
    Route::get('/tambah/{id_nomor_antrian}', [PasienController::class, 'createWithAntrian'])->name('pasien.createWithAntrian');
    Route::post('/tambah', [PasienController::class, 'store'])->name('pasien.store');
    Route::get('/{id_pasien}', [PasienController::class, 'edit'])->name('pasien.edit');
    Route::post('/{id_pasien}', [PasienController::class, 'update'])->name('pasien.update');
    Route::delete('/{id_pasien}', [PasienController::class, 'delete'])->name('pasien.delete');
    Route::get('/{id_pasien}/detail', [PasienController::class, 'show'])->name('pasien.show');
});

Route::group([
    "prefix" => 'kunjungan',
    "middleware" => ['auth', 'verified', 'role:admin|pendaftaran']
], function() {
    Route::get('/', [KunjunganController::class, 'index'])->name('kunjungan');
    Route::get('/tambah', [KunjunganController::class, 'create'])->name('kunjungan.create');
    Route::get('/tambah/{id_nomor_antrian}', [KunjunganController::class, 'createWithAntrian'])->name('kunjungan.createWithAntrian');
    Route::get('/tambah/{id_nomor_antrian}/{id_pasien}', [KunjunganController::class, 'createFull'])->name('kunjungan.createFull');
    Route::post('/tambah', [KunjunganController::class, 'store'])->name('kunjungan.store');
    Route::get('/{id_kunjungan}', [KunjunganController::class, 'edit'])->name('kunjungan.edit');
    Route::post('/{id_kunjungan}', [KunjunganController::class, 'update'])->name('kunjungan.update');
    Route::delete('/{id_kunjungan}', [KunjunganController::class, 'delete'])->name('kunjungan.delete');
    Route::get('/{id_kunjungan}/detail', [KunjunganController::class, 'show'])->name('kunjungan.show');
});

Route::group([
    "prefix" => 'pemeriksaan',
    "middleware" => ['auth', 'verified', 'role:admin|medis']
], function() {
    Route::get('/', [PemeriksaanController::class, 'index'])->name('pemeriksaan');
    Route::get('/{id_kunjungan}', [PemeriksaanController::class, 'create'])->name('pemeriksaan.create');
    Route::post('/{id_kunjungan}', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');
    Route::get('/{id_kunjungan}/detail', [PemeriksaanController::class, 'show'])->name('pemeriksaan.show');
});

Route::get('/obat', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('obat');

Route::get('/rekam-medis', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('rekam_medis');

Route::get('/pengaturan', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pengaturan');

require __DIR__.'/auth.php';
