<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Kontak;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PengaturanController extends Controller
{
    public function createJadwal() {
        $list_jadwal = Jadwal::all();

        return Inertia::render('Pengaturan/Jadwal', [
            "list_jadwal" => $list_jadwal
        ]);
    }

    public function updateJadwal(Request $request) {
        // Loop update jadwal
        foreach($request->jadwal as $jadwal) {
            $j = Jadwal::find($jadwal['id']);
            $j->jam_mulai = $jadwal['jam_mulai'];
            $j->jam_selesai = $jadwal['jam_selesai'];
            $j->libur = $jadwal['libur'];
            $j->save();
        }

        // Redirect ke /pengaturan/jadwal
        return redirect()->route('jadwal.create')->with('message', 'Data jadwal berhasil diubah');
    }

    public function createKontak() {
        $list_kontak = Kontak::all();

        return Inertia::render('Pengaturan/Kontak', [
            "list_kontak" => $list_kontak
        ]);
    }

    public function updateKontak(Request $request) {
        // Loop update kontak
        foreach($request->kontak as $kontak) {
            $k = Kontak::find($kontak['id']);
            $k->isi = $kontak['isi'];
            $k->url = $kontak['url'];
            $k->save();
        }

        // Redirect ke /pengaturan/kontak
        return redirect()->route('kontak.create')->with('message', 'Data kontak berhasil diubah');
    }
}
