<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Http\Requests\StorePasienRequest;
use App\Http\Requests\UpdatePasienRequest;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    public function index() {
        $list_pasien = Pasien::all();

        return Inertia::render('Pasien/Daftar', [
            "list_pasien" => $list_pasien
        ]);
    }

    public function create() {
        return Inertia::render('Pasien/Tambah');
    }

    public function createWithAntrian(int $id_nomor_antrian) {
        return Inertia::render('Pasien/Tambah', [
            "id_nomor_antrian" => $id_nomor_antrian
        ]);
    }

    public function store(StorePasienRequest $request) {
        $pasien = new Pasien();
        $pasien->nik = $request->nik;
        $pasien->no_rekam_medis = $request->no_rekam_medis;
        $pasien->nama = $request->nama;
        $pasien->tempat_lahir = $request->tempat_lahir;
        $pasien->tanggal_lahir = $request->tanggal_lahir;
        $pasien->jenis_kelamin = $request->jenis_kelamin;
        $pasien->gol_darah = $request->gol_darah;
        $pasien->alamat = $request->alamat;
        $pasien->kecamatan = $request->kecamatan;
        $pasien->kelurahan = $request->kelurahan;
        $pasien->kota = $request->kota;
        $pasien->provinsi = $request->provinsi;
        $pasien->kontak = $request->kontak;
        $pasien->pekerjaan = $request->pekerjaan;
        $pasien->status_menikah = $request->status_menikah;
        $pasien->no_bpjs = $request->no_bpjs;
        $pasien->save();


        if ($request->id_nomor_antrian) {
            return redirect()->route('kunjungan.createFull', [
                "id_nomor_antrian" => $request->id_nomor_antrian, 
                "id_pasien" => $pasien->id
            ])->with('message', 'Data pasien berhasil ditambahkan');
        }

        return redirect()->route('pasien')->with('message', 'Data pasien berhasil ditambahkan');
    }

    public function edit(int $id_pasien) {
        $pasien = Pasien::find($id_pasien);

        return Inertia::render('Pasien/Sunting', [
            "pasien" => $pasien
        ]);
    }

    public function update(UpdatePasienRequest $request, int $id_pasien) {
        $pasien = Pasien::find($id_pasien);
        if (!$pasien) {
            return redirect()->route('pasien', ['message' => [
                'type' => 'error',
                'text' => 'Data pasien tidak ditemukan'
            ]]);
        }
        $pasien->nik = $request->nik;
        $pasien->no_rekam_medis = $request->no_rekam_medis;
        $pasien->nama = $request->nama;
        $pasien->tempat_lahir = $request->tempat_lahir;
        $pasien->tanggal_lahir = $request->tanggal_lahir;
        $pasien->jenis_kelamin = $request->jenis_kelamin;
        $pasien->gol_darah = strlen($request->gol_darah) > 0 ? $request->gol_darah : null;
        $pasien->alamat = $request->alamat;
        $pasien->kecamatan = $request->kecamatan;
        $pasien->kelurahan = $request->kelurahan;
        $pasien->kota = $request->kota;
        $pasien->provinsi = $request->provinsi;
        $pasien->kontak = $request->kontak;
        $pasien->pekerjaan = $request->pekerjaan;
        $pasien->status_menikah = $request->status_menikah;
        $pasien->no_bpjs = strlen($request->no_bpjs) > 0 ? $request->no_bpjs : null;
        $pasien->save();

        return redirect()->route('pasien')->with('message', 'Data pasien berhasil diubah');
    }

    public function delete(int $id_pasien) { 
        $pasien = Pasien::find($id_pasien);
        if (!$pasien) {
            return redirect()->back()->with('message', [
                'type' => 'error',
                'text' => 'Data pasien tidak ditemukan'
            ]);
        }

        $pasien->delete();
        return redirect()->route('pasien')->with('message', 'Data pasien berhasil dihapus');
    }

    public function show(int $id_pasien) {
        $pasien = Pasien::find($id_pasien);
        if (!$pasien) {
            return redirect()->route('pasien', ['message' => [
                'type' => 'error',
                'text' => 'Data pasien tidak ditemukan'
            ]]);
        }

        return Inertia::render('Pasien/Detail', [
            'pasien' => $pasien
        ]);
    }
}
