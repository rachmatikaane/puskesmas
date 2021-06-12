<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/pengguna', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pengguna');

Route::get('/pengguna/buat', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pengguna.buat');

Route::get('/pegawai', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('pegawai');

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
