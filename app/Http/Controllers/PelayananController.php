<?php

namespace App\Http\Controllers;

use App\Models\Pelayanan;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PelayananController extends Controller
{
    public function index() { 
        $list_pelayanan = Pelayanan::all();

        return Inertia::render('Pelayanan/Daftar', [
            "list_pelayanan" => $list_pelayanan
        ]);
    }

    public function create() {
        return Inertia::render('Pelayanan/Tambah');
    }

    public function store(Request $request) { 
        $layanan = new Pelayanan();
        $layanan->nama = $request->nama;
        $layanan->save();

        return redirect()->route('layanan')->with('message', 'Data layanan berhasil ditambahkan');
    }
    
    public function edit(int $id_pelayanan) { 
        $layanan = Pelayanan::find($id_pelayanan);

        return Inertia::render('Pelayanan/Sunting', [
            "layanan" => $layanan
        ]);
    }

    public function update(Request $request, int $id_pelayanan) {
        $layanan = Pelayanan::find($id_pelayanan);
        $layanan->nama = $request->nama;
        $layanan->save();

        return redirect()->route('layanan')->with('message', 'Data layanan berhasil diubah');
    }

    public function delete(int $id_pelayanan) { 
        $layanan = Pelayanan::find($id_pelayanan);
        if (!$layanan) {
            return redirect()->back()->with('message', [
                'type' => 'error',
                'text' => 'Data layanan tidak ditemukan'
            ]);
        }

        $layanan->delete();
        return redirect()->route('layanan')->with('message', 'Data layanan berhasil dihapus');
    }
    
    public function show(int $id_pelayanan) { }
}
