<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class JobRequest extends FormRequest
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
            'title'        => ['required', 'string', 'min:4'],
            'description'  => ['required', 'string', 'min:4'],
            'requirements' => ['required', 'string', 'min:4'],
            'salary'       => ['required', 'numeric'],
            'deadline'     => ['required', 'date'],
            'category_id'  => ['required', 'exists:categories,id'], // Must exist in categories table
            'location'     => ['nullable', 'string'],
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            'title.required'        => 'The job title is required.',
            'title.min'             => 'The job title must be at least 4 characters long.',
            'description.required'  => 'The job description is required.',
            'requirements.required' => 'The job requirements are required.',
            'salary.required'       => 'The salary amount is required.',
            'salary.numeric'        => 'The salary must be a number.',
            'deadline.required'     => 'The application deadline is required.',
            'deadline.date'         => 'The deadline must be a valid date.',
            'category_id.required' => 'Please select a job category.',
            'category_id.exists'   => 'The selected category is invalid.',
            'location.string'      => 'The location must be a valid text.',

        ];
    }
}
