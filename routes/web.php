<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PegawaiController;

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

Route::get('/layanan', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('layanan');

Route::get('/rekam-medis', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('rekam_medis');

Route::get('/pengaturan', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pengaturan');

require __DIR__.'/auth.php';
