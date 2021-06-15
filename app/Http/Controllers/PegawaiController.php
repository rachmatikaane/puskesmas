<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Pengguna;
use App\Models\Pelayanan;
use App\Http\Requests\StorePegawaiRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    public function index() {
        $list_pegawai = Pegawai::all();

        return Inertia::render('Pegawai/Daftar', [
            "list_pegawai" => $list_pegawai
        ]);    
    }

    public function create() {
        $list_pelayanan = Pelayanan::all();

        return Inertia::render('Pegawai/Tambah', [
            "list_pelayanan" => $list_pelayanan
        ]);
    }

    public function store(StorePegawaiRequest $request) {
        $validated = $request->validated();
        
        DB::transaction(function () use ($request) {
            $pengguna = new Pengguna();
            $pengguna->username = $request->username;
            $pengguna->password = $request->password;
            $pengguna->peran = $request->peran;
            $pengguna->save();

            $pegawai = new Pegawai();
            $pegawai->id_pengguna = $pengguna->id;
            $pegawai->id_pelayanan = $request->id_pelayanan;
            $pegawai->nama = $request->nama;
            $pegawai->jabatan = $request->jabatan;
            $pegawai->save();
        });

        return redirect()->route('pegawai', ['message' => 'Data pegawai berhasil ditambahkan']);
    }

    public function edit(int $id_pegawai) {
        return $id_pegawai;
    }

    public function update(Request $request, int $id_pegawai) {
        return $id_pegawai . " Diupdate";
    }

    public function delete(int $id_pegawai) {
        return $id_pegawai . " Dihapus";
    }
}
