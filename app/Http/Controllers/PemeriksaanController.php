<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Pegawai;
use App\Models\Pelayanan;
use App\Models\Kunjungan;
use App\Models\Obat;
use App\Models\RekamMedis;
use App\Models\ResepObat;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemeriksaanController extends Controller
{
    public function index() {
        // GET DATA
        $list_pemeriksaan = Kunjungan::with('pasien')->with('pegawai.pelayanan')->where('status', 1);

        if (Auth::user()->peran !== 'admin') {
            $pegawai = Pegawai::where('id_pengguna', Auth::user()->id)->first();
            $list_pemeriksaan = $list_pemeriksaan->where('id_pegawai', $pegawai->id);
        }

        $list_pemeriksaan = $list_pemeriksaan->orderByDesc('tanggal')->get();

        // Render Pemeriksaan/Daftar
        return Inertia::render("Pemeriksaan/Daftar", [
            "list_pemeriksaan" => $list_pemeriksaan
        ]);
    }

    public function create(int $id_kunjungan) {
        $kunjungan = Kunjungan::with('nomor_antrian')->with('pasien')->with('pegawai.pelayanan')->where('id', $id_kunjungan)->first();
        $list_obat = Obat::all();

        return Inertia::render('Pemeriksaan/Tambah', [
            "kunjungan" => $kunjungan,
            "list_obat" => $list_obat
        ]);
    }

    public function store(Request $request, int $id_kunjungan) {
        DB::transaction(function () use ($request, $id_kunjungan) {
            // Store rekam_medis
            $rekam_medis = new RekamMedis();
            $rekam_medis->tanggal = date('Y-m-d');
            $rekam_medis->anamnesis = $request->anamnesis;
            $rekam_medis->hasil_pemeriksaan = $request->hasil_pemeriksaan;
            $rekam_medis->save();

            // Loop store resep_obat
            foreach($request->resep_obat as $resep_obat) {
                $resep = new ResepObat();
                $resep->id_obat = $resep_obat['id_obat'];
                $resep->id_kunjungan = $id_kunjungan;
                $resep->jumlah = $resep_obat['qty'];
                $resep->aturan_pakai = $resep_obat['aturan_pakai'];
                $resep->tanggal = date('Y-m-d');
                $resep->save();
            }

            $kunjungan = Kunjungan::find($id_kunjungan);

            // Update status = 1 & total_harga & id_rekam_medis kunjungan
            $kunjungan->id_rekam_medis = $rekam_medis->id;
            $kunjungan->no_resep_obat = $request->no_resep;
            $kunjungan->status = 1;
            $kunjungan->save();
            
            // Update status = 3 nomor_antrian
            $nomor_antrian = Antrian::find($kunjungan->id_nomor_antrian);
            $nomor_antrian->status = 3;
            $nomor_antrian->save();
        });

        // Redirect ke /antrian/medis
        return redirect()->route('antrian.medis')->with('message', 'Data pemeriksaan berhasil ditambahkan');
    }

    public function show(int $id_kunjungan) {
        $kunjungan = Kunjungan::with('pasien')
            ->with('pegawai.pelayanan')
            ->with('nomor_antrian')
            ->with('rekam_medis')
            ->with('resep_obat.obat')
            ->where('id', $id_kunjungan)
            ->first();

        return Inertia::render('Pemeriksaan/Detail', [
            "kunjungan" => $kunjungan
        ]);
    }
}
