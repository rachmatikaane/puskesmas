<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Kunjungan;
use App\Models\Pasien;
use App\Models\Pelayanan;
use App\Http\Requests\StoreKunjunganRequest;
use App\Http\Requests\UpdateKunjunganRequest;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KunjunganController extends Controller
{
    public function index() {
        $list_kunjungan = Kunjungan::with('nomor_antrian')->with('pasien')->with('pegawai.pelayanan')->with('rekam_medis')->orderByDesc('tanggal')->get();

        return Inertia::render("Kunjungan/Daftar", [
            "list_kunjungan" => $list_kunjungan
        ]);
    }

    public function create() {
        $list_antrian = Antrian::where('tanggal', date('Y-m-d'))->where('status', '<', 2)->get();
        $list_pasien = Pasien::all();
        $list_pelayanan = Pelayanan::with('pegawai')->get();

        return Inertia::render("Kunjungan/Tambah", [
            "list_antrian" => $list_antrian,
            "list_pasien" => $list_pasien,
            "list_pelayanan" => $list_pelayanan
        ]);
    }

    public function createWithAntrian(int $id_nomor_antrian) {
        $list_antrian = Antrian::where('tanggal', date('Y-m-d'))->where('status', '<', 2)->get();
        $list_pasien = Pasien::all();
        $list_pelayanan = Pelayanan::with('pegawai')->get();

        return Inertia::render("Kunjungan/Tambah", [
            "list_antrian" => $list_antrian,
            "list_pasien" => $list_pasien,
            "list_pelayanan" => $list_pelayanan,
            "id_nomor_antrian" => $id_nomor_antrian
        ]);
    }

    public function createFull(int $id_nomor_antrian, int $id_pasien) {
        $list_antrian = Antrian::where('tanggal', date('Y-m-d'))->where('status', '<', 2)->get();
        $list_pasien = Pasien::all();
        $list_pelayanan = Pelayanan::with('pegawai')->get();

        return Inertia::render("Kunjungan/Tambah", [
            "list_antrian" => $list_antrian,
            "list_pasien" => $list_pasien,
            "list_pelayanan" => $list_pelayanan,
            "id_nomor_antrian" => $id_nomor_antrian,
            "id_pasien" => $id_pasien
        ]);
    }

    public function store(StoreKunjunganRequest $request) {
        DB::transaction(function () use ($request) {
            $kunjungan = new Kunjungan();
            $kunjungan->id_nomor_antrian = $request->id_nomor_antrian;
            $kunjungan->id_pasien = $request->id_pasien;
            $kunjungan->id_pegawai = $request->id_pegawai;
            $kunjungan->tanggal = date('Y-m-d');
            $kunjungan->waktu = date( "H:i:s");
            $kunjungan->id_pegawai = $request->id_pegawai;
            $kunjungan->jenis_pembayaran = $request->jenis_pembayaran;
            $kunjungan->save();

            $antrian = Antrian::find($request->id_nomor_antrian);
            $antrian->status = 2;
            $antrian->save();
        });

        return redirect()->route('antrian.list')->with('message', 'Data kunjungan berhasil ditambahkan');
    }

    public function edit(int $id_kunjungan) {
        $kunjungan = Kunjungan::with('pegawai')->where('id', $id_kunjungan)->first();
        $list_antrian = Antrian::where('tanggal', date('Y-m-d'))->where('status', '<', 2)->orWhere('id', $kunjungan->id_nomor_antrian)->get();
        $list_pasien = Pasien::all();
        $list_pelayanan = Pelayanan::with('pegawai')->get();

        return Inertia::render("Kunjungan/Sunting", [
            "list_antrian" => $list_antrian,
            "list_pasien" => $list_pasien,
            "list_pelayanan" => $list_pelayanan,
            "kunjungan" => $kunjungan
        ]);
    }

    public function update(UpdateKunjunganRequest $request, int $id_kunjungan) {
        $kunjungan = Kunjungan::find($id_kunjungan);
        $kunjungan->id_nomor_antrian = $request->id_nomor_antrian;
        $kunjungan->id_pasien = $request->id_pasien;
        // $kunjungan->tanggal = date('Y-m-d');
        // $kunjungan->waktu = date( "H:i:s");
        $kunjungan->id_pegawai = $request->id_pegawai;
        $kunjungan->jenis_pembayaran = $request->jenis_pembayaran;
        $kunjungan->save();

        return redirect()->route('kunjungan')->with('message', 'Data kunjungan berhasil diubah');
    }

    public function delete(int $id_kunjungan) {
        $kunjungan = Kunjungan::find($id_kunjungan);
        if (!$kunjungan) {
            return redirect()->back()->with('message', [
                'type' => 'error',
                'text' => 'Data kunjungan tidak ditemukan'
            ]);
        }
        $kunjungan->delete();

        return redirect()->route('kunjungan')->with('message', 'Data kunjungan berhasil dihapus');
    }

    public function show(int $id_kunjungan) {
        // GET Kunjungan

        return Inertia::render("Kunjungan/Detail", [
            "kunjungan" => ""
        ]);
    }
}
