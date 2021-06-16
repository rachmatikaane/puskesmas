<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\PelayananController;

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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group([
    "prefix" => 'pegawai', 
    "middleware" => ['auth', 'verified']
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
    "middleware" => ['auth', 'verified']
], function() {
    Route::get('/', [PelayananController::class, 'index'])->name('layanan');
    Route::get('/tambah', [PelayananController::class, 'create'])->name('layanan.create');
    Route::post('/tambah', [PelayananController::class, 'store'])->name('layanan.store');
    Route::get('/{id_pelayanan}', [PelayananController::class, 'edit'])->name('layanan.edit');
    Route::put('/{id_pelayanan}', [PelayananController::class, 'update'])->name('layanan.update');
    Route::delete('/{id_pelayanan}', [PelayananController::class, 'delete'])->name('layanan.delete');
    Route::get('/{id_pelayanan}/detail', [PelayananController::class, 'show'])->name('layanan.show');
});

Route::get('/antrian', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('antrian');

Route::get('/pasien', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pasien');

Route::get('/obat', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('obat');

Route::get('/kunjungan', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('kunjungan');

Route::get('/rekam-medis', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('rekam_medis');

Route::get('/pengaturan', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pengaturan');

require __DIR__.'/auth.php';
