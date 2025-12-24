<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'date_of_birth' => ['required', 'date'],
            'gender' => ['required', 'string', 'in:male,female,other'],
            'admission_document' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
        ])->validate();

        // $admissionDocumentPath = null;
        // if (isset($input['admission_document'])) {

        //     $admissionDocumentPath = $input['admission_document']->store('documents', 'public');
        // }

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'date_of_birth' => $input['date_of_birth'],
            'gender' => $input['gender'],
            // 'admission_document' => $admissionDocumentPath,
            'course_fee' => 200000,
            'admission_fee' => 5000,
            'due_fee' => 205000,
            'status' => false,
        ]);
    }
}
