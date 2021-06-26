<?php

namespace App\Http\Controllers;

use App\Models\Antrian;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index() {
        if (Auth::user()->peran == 'pendaftaran') {
            return redirect()->route('antrian.list');
        }
        
        $antrian_hari_ini = Antrian::where('tanggal', date('Y-m-d'))->get();
        $antrian_berlangsung = Antrian::where('tanggal', date('Y-m-d'))->where('status', 0)->get();
        $antrian_selesai = Antrian::where('tanggal', date('Y-m-d'))->where('status', 1)->get();

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
        if (Auth::user()->peran == 'antrian') {
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
}
