<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePegawaiRequest extends FormRequest
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
        $pegawai = \App\Models\Pegawai::find($this->id_pegawai);
        $pengguna = \App\Models\Pengguna::find($pegawai->id_pengguna);

        return [
            'username' => [
                'bail',
                'required',
                'max:100',
                Rule::unique('pengguna')->ignore($pengguna->username, 'username')
            ],
            'password' => 'confirmed',
            'peran' => 'required',
            'id_pelayanan' => 'nullable|integer',
            'nama' => 'bail|required|max:100',
            'jabatan' => 'bail|required|max:100'
        ];
    }
}
