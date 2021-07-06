<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Kunjungan;
use App\Models\Pegawai;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index() {
        if (Auth::user()->peran == 'pendaftaran') {
            return redirect()->route('antrian.list');
        }

        if (Auth::user()->peran == 'medis') {
            return redirect()->route('antrian.medis');
        }
        
        $antrian_hari_ini = Antrian::where('tanggal', date('Y-m-d'))->get();
        $antrian_berlangsung = Antrian::where('tanggal', date('Y-m-d'))->where('status', '<', 2)->get();
        $antrian_selesai = Antrian::where('tanggal', date('Y-m-d'))->where('status', '>', 1)->get();

        return Inertia::render('Antrian', [
            "antrian" => count($antrian_hari_ini),
            "berlangsung" => count($antrian_berlangsung),
            "selesai" => count($antrian_selesai),
        ]);
    }

    public function ambil() {
        $no = count(Antrian::where('tanggal', date('Y-m-d'))->get()) + 1;
        
        $antrian = new Antrian();
        $antrian->no = $no;
        $antrian->tanggal = date('Y-m-d');
        $antrian->save();

        return redirect()->route('antrian')->with("message", "Nomor antrian berhasil diambil");
    }

    public function list() {
        if (Auth::user()->peran != 'pendaftaran' && Auth::user()->peran != 'admin') {
            return redirect()->route('antrian');
        }

        $antrian = Antrian::where('tanggal', date('Y-m-d'))->get();

        return Inertia::render('AntrianPendaftar', [
            "antrian" => $antrian
        ]);
    }

    public function skip(Request $request) {
        $antrian = Antrian::find($request->id_nomor_antrian);
        $antrian->status = 1;
        $antrian->save();

        return redirect()->route('antrian.list')->with('message', 'Nomor antrian berhasil dilewat');
    }

    public function medis() {
        if (Auth::user()->peran != 'medis' && Auth::user()->peran != 'admin') {
            return redirect()->route('antrian');
        }

        $antrian = Kunjungan::with('nomor_antrian')->with('pegawai')->with('pasien')
            ->where('status', 0);
        
        if (Auth::user()->peran !== 'admin') {
            $pegawai = Pegawai::where('id_pengguna', Auth::user()->id)->first();
            $antrian = $antrian->where('id_pegawai', $pegawai->id);
        }

        $antrian = $antrian->orderBy('waktu')->get();

        return Inertia::render('AntrianMedis', [
            "antrian" => $antrian
        ]);
    }
}
