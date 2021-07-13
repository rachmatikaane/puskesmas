<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Kunjungan;
use App\Models\Pegawai;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    public function index() {
        $antrian = Kunjungan::with('nomor_antrian')->with('pegawai.pelayanan')->with('pasien')
            ->where('status', 1)->where('lunas', 0)->orderBy('waktu')->get();

        return Inertia::render('Pembayaran/Daftar', [
            "antrian" => $antrian
        ]);
    }

    public function lunas() {
        $list_pembayaran = Kunjungan::with('nomor_antrian')->with('pegawai.pelayanan')->with('pasien')
            ->where('status', 1)->where('lunas', 1)->orderByDesc('waktu')->get();

        return Inertia::render('Pembayaran/Lunas', [
            "list_pembayaran" => $list_pembayaran
        ]);
    }

    public function create(int $id_kunjungan) {
        $kunjungan = Kunjungan::with('pasien')
            ->with('pegawai.pelayanan')
            ->with('nomor_antrian')
            ->with('rekam_medis')
            ->with('resep_obat.obat')
            ->where('id', $id_kunjungan)
            ->first();
        $petugas = Pegawai::with('pengguna')->where('id_pengguna', Auth::user()->id)->first();

        return Inertia::render('Pembayaran/Tambah', [
            "kunjungan" => $kunjungan,
            "petugas" => $petugas
        ]);
    }

    public function store(Request $request, int $id_kunjungan) {
        DB::transaction(function () use ($request, $id_kunjungan) {
            // Update total_harga, lunas = 1 di kunjungan
            $kunjungan = Kunjungan::find($id_kunjungan);
            $kunjungan->total_harga = $request->total_harga;
            $kunjungan->lunas = 1;
            $kunjungan->save();

            // Update status = 4 di nomor antrian
            $antrian = Antrian::find($kunjungan->id_nomor_antrian);
            $antrian->status = 4;
            $antrian->save();
        });

        // Redirect ke /pembayaran
        return redirect()->route('pembayaran')->with('message', 'Data pembayaran berhasil ditambahkan');
    }

    public function show(int $id_kunjungan) {
        $kunjungan = Kunjungan::with('pasien')
            ->with('pegawai.pelayanan')
            ->with('nomor_antrian')
            ->with('rekam_medis')
            ->with('resep_obat.obat')
            ->where('id', $id_kunjungan)
            ->first();
        $petugas = Pegawai::with('pengguna')->where('id_pengguna', Auth::user()->id)->first();
        
        return Inertia::render('Pembayaran/Detail', [
            "kunjungan" => $kunjungan,
            "petugas" => $petugas
        ]);
    }
}
