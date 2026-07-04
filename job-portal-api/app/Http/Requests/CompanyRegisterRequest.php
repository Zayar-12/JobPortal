<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CompanyRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employer_id'=>['nullable'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed', 'min:8'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'location' => ['nullable', 'string'],
            'website' => ['nullable', ],
        ];
    }
}
