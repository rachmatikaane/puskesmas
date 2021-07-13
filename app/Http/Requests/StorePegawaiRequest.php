<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePegawaiRequest extends FormRequest
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
            'username' => 'bail|required|max:100|unique:pengguna,username',
            'password' => 'bail|required|confirmed',
            'password_confirmation' => 'required',
            'peran' => 'bail|required',
            'id_pelayanan' => 'nullable|integer',
            'nama' => 'bail|required|max:100',
            'jabatan' => 'bail|required|max:100'
        ];
    }
}
