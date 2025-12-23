<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        $userId = $this->route('user') ? $this->route('user')->id : null;

        $rules = [
            'name' => 'required|string|max:255',
            'email' => ['nullable', 'string', Rule::unique('users')->ignore($userId)],
            'password' => $userId ? 'nullable|string|min:8' : 'required|string|min:8',
            'role' => 'required|string|in:admin,student',
            'status' => 'nullable|boolean',
            'phone' => 'nullable|string|max:20',
            'gender' => 'nullable|string|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'course_fee' => 'nullable|numeric',
            'admission_fee' => 'nullable|numeric',
            'batch_id' => 'nullable|exists:batches,id',
            'session' => 'nullable|string|max:255',
            'admission_document' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'student_id' => ['nullable', 'string', Rule::unique('users')->ignore($userId)],
        ];

        if ($this->isMethod('post')) { // Create
            $rules['date_of_birth'] = 'required|date';
            $rules['gender'] = 'required|string|in:male,female,other';
            $rules['course_fee'] = 'required|numeric';
            $rules['admission_fee'] = 'required|numeric';
            $rules['admission_document'] = 'required|file|mimes:jpg,jpeg,png,pdf|max:2048';
        }

        return $rules;
    }
}
