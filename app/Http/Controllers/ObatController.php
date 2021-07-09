<?php

namespace App\Http\Controllers;

use App\Models\Obat;
use App\Models\Kunjungan;
use App\Models\ResepObat;
use App\Models\Antrian;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ObatController extends Controller
{
    public function index() {
        // GET data obat
        $list_obat = Obat::all();

        // Render Obat/Daftar
        return Inertia::render('Obat/Daftar', [
            "list_obat" => $list_obat
        ]);
    }

    public function create() {
        // Render Obat/Tambah
        return Inertia::render('Obat/Tambah');
    }

    public function store(Request $request) {
        // STORE data obat
        $obat = new Obat();
        $obat->nama = $request->nama;
        $obat->stok = $request->stok;
        $obat->satuan = $request->satuan;
        $obat->save();

        // Redirect ke /obat
        return redirect()->route('obat')->with('message', 'Data obat berhasil ditambahkan');
    }

    public function edit(int $id_obat) {
        // GET data obat per $id_obat
        $obat = Obat::find($id_obat);

        // Render Obat/Sunting
        return Inertia::render('Obat/Sunting', [
            'obat' => $obat
        ]);
    }

    public function update(Request $request, int $id_obat) {
        // GET data obat per $id_obat
        $obat = Obat::find($id_obat);

        // UPDATE data obat
        $obat->nama = $request->nama;
        $obat->stok = $request->stok;
        $obat->satuan = $request->satuan;
        $obat->save();

        // Redirect ke /obat
        return redirect()->route('obat')->with('message', 'Data obat berhasil diperbaharui');
    }

    public function editStok(int $id_obat) {
        // GET data obat per $id_obat
        $obat = Obat::find($id_obat);

        // Render Obat/Stok
        return Inertia::render('Obat/Stok', [
            'obat' => $obat
        ]);
    }

    public function updateStok(Request $request, int $id_obat) {
        // GET data obat per $id_obat
        $obat = Obat::find($id_obat);
        
        // UPDATE stok obat
        $obat->stok = $obat->stok + $request->stok;
        $obat->save();

        // Redirect ke /obat
        return redirect()->route('obat')->with('message', 'Stok obat berhasil ditambahkan');
    }

    public function delete(int $id_obat) {
        $obat = Obat::find($id_obat);
        $obat->delete();

        return redirect()->route('obat')->with('message', 'Data obat berhasil dihapus');
    }

    public function ambil(Request $request, int $id_kunjungan) {
        DB::transaction(function () use ($request, $id_kunjungan) {        
            $kunjungan = Kunjungan::with('resep_obat.obat')->where('id', $id_kunjungan)->first();
            
            $nomor_antrian = Antrian::find($kunjungan->id_nomor_antrian);
            $nomor_antrian->status = 5;
            $nomor_antrian->save();

            foreach ($kunjungan->resep_obat as $resep) {
                $obat = Obat::find($resep['obat']['id']);
                $obat->stok = $obat->stok - $resep['jumlah'];
                $obat->save();

                $r = ResepObat::find($resep['id']);
                $r->status = 1;
                $r->save();
            }
        });

        return redirect()->route('antrian.resep')->with('message', 'Proses pengambilan obat berhasil diselesaikan');
    }
}
