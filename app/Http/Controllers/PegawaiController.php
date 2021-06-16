<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Pengguna;
use App\Models\Pelayanan;
use App\Http\Requests\StorePegawaiRequest;
use App\Http\Requests\UpdatePegawaiRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    public function index() {
        $list_pegawai = Pegawai::with('pengguna')->with('pelayanan')->get();

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
        $pegawai = Pegawai::with('pengguna')->with('pelayanan')->where('id', $id_pegawai)->first();
        $list_pelayanan = Pelayanan::all();

        return Inertia::render('Pegawai/Sunting', [
            "pegawai" => $pegawai,
            "list_pelayanan" => $list_pelayanan
        ]);    
    }

    public function update(UpdatePegawaiRequest $request, int $id_pegawai) {
        $validated = $request->validated();

        $pegawai = Pegawai::find($id_pegawai);
        if (!$pegawai) {
            return redirect()->route('pegawai', ['message' => [
                'type' => 'error',
                'text' => 'Data pegawai tidak ditemukan'
            ]]);
        }
        $pengguna = Pengguna::find($pegawai->id_pengguna);

        DB::transaction(function () use ($request, $pegawai, $pengguna) {
            $pengguna->username = $request->username;
            if ($request->password) {
                $pengguna->password = $request->password;
            }
            $pengguna->peran = $request->peran;
            $pengguna->save();

            $pegawai->id_pelayanan = $request->id_pelayanan;
            $pegawai->nama = $request->nama;
            $pegawai->jabatan = $request->jabatan;
            $pegawai->save();
        });

        return redirect()->route('pegawai', ['message' => 'Data pegawai berhasil diubah']);
    }

    public function delete(int $id_pegawai) {
        $pegawai = Pegawai::find($id_pegawai);
        $pengguna = Pengguna::find($pegawai->id_pengguna);
        if (!$pegawai || !$pengguna) {
            return redirect()->back()->with('message', ["type" => "error", "text" => "Data pegawai tidak ditemukan"]);
        }
        
        $pengguna->delete();
        return redirect()->back()->with('message', 'Data pegawai berhasil dihapus');
    }
}
