<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePasienRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nik' => 'required|size:16|unique:pasien,nik',
            'no_rekam_medis' => 'required|max:100|unique:pasien,no_rekam_medis',
            'nama' => 'required|max:100',
            'tempat_lahir' => 'required|max:100',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'gol_darah' => 'in:A,B,AB,O',
            'kecamatan' => 'max:100',
            'kelurahan' => 'max:100',
            'kota' => 'max:100',
            'provinsi' => 'max:100',
            'kontak' => 'max:20',
            'pekerjaan' => 'max:100',
            'status_menikah' => 'max:100',
            'no_bpjs' => 'max:100|nullable|unique:pasien,no_bpjs',
        ];
    }
}
