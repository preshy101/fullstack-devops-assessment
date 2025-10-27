<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormStoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',

            // Validate the nested JSON structure: form_structure
            'form_structure' => 'required|array',
            'form_structure.sections' => 'required|array',

            // Validation for each section in the array
            'form_structure.sections.*.name' => 'required|string|max:255',
            'form_structure.sections.*.groups' => 'required|array',

            // Validation for each group in each section
            'form_structure.sections.*.groups.*.name' => 'required|string|max:255',
            'form_structure.sections.*.groups.*.fields' => 'required|array',

            // Validation for each field in each group
            'form_structure.sections.*.groups.*.fields.*.key' => 'required|string|max:100',
            'form_structure.sections.*.groups.*.fields.*.label' => 'required|string|max:255',
            'form_structure.sections.*.groups.*.fields.*.type' => 'required|string|in:text,number,date,select,checkbox,radio',
            'form_structure.sections.*.groups.*.fields.*.required' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'form_structure.sections.required' => 'The form structure must contain at least one section.',
            'form_structure.sections.*.name.required' => 'Every section must have a name.',
            'form_structure.sections.*.groups.required' => 'Every section must contain at least one group.',
            'form_structure.sections.*.groups.*.fields.required' => 'Every group must contain at least one field.',
            'form_structure.sections.*.groups.*.fields.*.type.in' => 'The field type is invalid. Allowed types: text, number, date, select, checkbox, radio.',
        ];
    }
}
