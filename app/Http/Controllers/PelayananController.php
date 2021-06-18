<?php

namespace App\Http\Controllers;

use App\Helpers\Utilities;
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
    
    public function show(int $id_pelayanan) {
        $layanan = Pelayanan::with('pegawai')->with('kunjungan')->where('id', $id_pelayanan)->first();
        if (!$layanan) {
            return redirect()->route('layanan')->with('message', [
                'type' => 'error',
                'text' => 'Data layanan tidak ditemukan'
            ]);
        }

        $pasien_hari = 0;
        $pasien_bulan = 0;
        $pasien_tahun = 0;

        foreach ($layanan->kunjungan as $k) {
            if (date('Ymd') == date('Ymd', strtotime($k->tanggal))) $pasien_hari++;
            if (date('Ym') == date('Ym', strtotime($k->tanggal))) $pasien_bulan++;
            if (date('Y') == date('Y', strtotime($k->tanggal))) $pasien_tahun++;
        }

        return Inertia::render('Pelayanan/Detail', [
            "layanan" => $layanan,
            "pasien_hari" => $pasien_hari,
            "pasien_bulan" => $pasien_bulan,
            "pasien_tahun" => $pasien_tahun,
            "pasien_5_bulan" => Utilities::filterDataPerMonth($layanan->kunjungan->toArray()),
        ]);
    }
}
