<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Kontak;
use App\Models\Pegawai;
use App\Models\Pengguna;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

    public function editPengguna() {
        $pegawai = Pegawai::where('id_pengguna', Auth::user()->id)->first();

        return Inertia::render('Pengaturan/Pengguna', [
            'pegawai' => $pegawai
        ]);
    }

    public function updatePengguna(Request $request) {
        // UPDATE data pengguna
        DB::transaction(function () use ($request) {
            $pegawai = Pegawai::where('id_pengguna', Auth::user()->id)->first();
            $pegawai->nama = $request->nama;
            $pegawai->save();

            $pengguna = Pengguna::find(Auth::user()->id);
            $pengguna->username = $request->username;
            if ($request->password) {
                $pengguna->password = Hash::make($request->password);
            }
            $pengguna->save();
        });

        // Redirect ke /profil
        return redirect()->route('profil')->with('message', 'Profil anda berhasil diperbaharui');
    }
}
