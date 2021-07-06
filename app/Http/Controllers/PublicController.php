<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use App\Models\Pelayanan;
use App\Models\Kontak;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function informasi() {
        $list_jadwal = Jadwal::all();
        $list_pelayanan = Pelayanan::all();

        return Inertia::render('Public/Informasi', [
            'list_jadwal' => $list_jadwal,
            'list_pelayanan' => $list_pelayanan
        ]);
    }

    public function kontak() {
        $list_kontak = Kontak::all();

        return Inertia::render('Public/Kontak', [
            "list_kontak" => $list_kontak
        ]);
    }
}
