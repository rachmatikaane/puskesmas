<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\PengaturanController;
use App\Http\Controllers\PublicController;
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

    if (Auth::user()->peran == 'pembayaran') {
        return redirect()->route('pembayaran');
    }

    if (Auth::user()->peran == 'apoteker') {
        return redirect()->route('antrian.resep');
    }

    return redirect()->route('pegawai');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/informasi', [PublicController::class, 'informasi'])->name('informasi');
Route::get('/kontak', [PublicController::class, 'kontak'])->name('kontak');

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
    "middleware" => ['auth', 'verified', 'role:admin|antrian|pendaftaran|medis|apoteker']
], function() {
    Route::get('/', [AntrianController::class, 'index'])->name('antrian');
    Route::post('/ambil', [AntrianController::class, 'ambil'])->name('antrian.ambil');

    Route::get('/list', [AntrianController::class, 'list'])->name('antrian.list');
    Route::post('/skip', [AntrianController::class, 'skip'])->name('antrian.skip');
    
    Route::get('/medis', [AntrianController::class, 'medis'])->name('antrian.medis');

    Route::geT('/resep', [AntrianController::class, 'resep'])->name('antrian.resep');
});

Route::post('/resep/{id_kunjungan}', [ObatController::class, 'ambil'])->name('obat.ambil');

Route::group([
    "prefix" => 'pasien',
    "middleware" => ['auth', 'verified', 'role:admin|pendaftaran|medis|apoteker']
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

Route::group([
    "prefix" => 'pengaturan',
    "middleware" => ['auth', 'verified', 'role:admin']
], function() {
    Route::get('/jadwal', [PengaturanController::class, 'createJadwal'])->name('jadwal.create');
    Route::post('/jadwal', [PengaturanController::class, 'updateJadwal'])->name('jadwal.update');

    Route::get('/kontak', [PengaturanController::class, 'createKontak'])->name('kontak.create');
    Route::post('/kontak', [PengaturanController::class, 'updateKontak'])->name('kontak.update');
});

Route::group([
    "prefix" => 'pembayaran',
    "middleware" => ['auth', 'verified', 'role:admin|pembayaran']
], function() {
    Route::get('/', [PembayaranController::class, 'index'])->name('pembayaran');
    Route::get('/lunas', [PembayaranController::class, 'lunas'])->name('pembayaran.lunas');
    Route::get('/{id_kunjungan}', [PembayaranController::class, 'create'])->name('pembayaran.create');
    Route::post('/{id_kunjungan}', [PembayaranController::class, 'store'])->name('pembayaran.store');
    Route::get('/{id_kunjungan}/detail', [PembayaranController::class, 'show'])->name('pembayaran.show');
});

Route::group([
    "prefix" => 'obat',
    "middleware" => ['auth', 'verified', 'role:admin|apoteker']
], function() {
    Route::get('/', [ObatController::class, 'index'])->name('obat');
    Route::get('/tambah', [ObatController::class, 'create'])->name('obat.create');
    Route::post('/tambah', [ObatController::class, 'store'])->name('obat.store');
    Route::get('/{id_obat}', [ObatController::class, 'edit'])->name('obat.edit');
    Route::put('/{id_obat}', [ObatController::class, 'update'])->name('obat.update');
    Route::delete('/{id_obat}', [ObatController::class, 'delete'])->name('obat.delete');
    Route::get('/{id_obat}/stok', [ObatController::class, 'editStok'])->name('obat.editStok');
    Route::put('/{id_obat}/stok', [ObatController::class, 'updateStok'])->name('obat.updateStok');
});

Route::get('/profil', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('profil');

require __DIR__.'/auth.php';
