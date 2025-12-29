<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'phone',
        'gender',
        'date_of_birth',
        'course_fee',
        'paid_fee',
        'due_fee',
        'batch_id',
        'session',
        'admission_document',
        'admission_fee',
        'student_id',
        'semester',
         // Basic Info
        'home_phone',
        'blood_group',
        'marital_status',
        'national_id',

        // Parents Info
        'father_name',
        'father_occupation',
        'mother_name',
        'mother_occupation',
        'parents_phone',

        // Present Address
        'present_address',
        'present_thana',
        'present_post_code',
        'present_district',
        'present_country',

        // Permanent Address
        'permanent_address',
        'permanent_thana',
        'permanent_post_code',
        'permanent_district',
        'permanent_country',

        // SSC / Equivalent
        'ssc_exam_name',
        'ssc_group',
        'ssc_result',
        'ssc_passing_year',
        'ssc_institute',
        'ssc_board',

        // HSC / Equivalent
        'hsc_exam_name',
        'hsc_group',
        'hsc_result',
        'hsc_passing_year',
        'hsc_institute',
        'hsc_board',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'status' => 'boolean',
        ];
    }

    /**
     * Get the batch that the user belongs to.
     */    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }
       /**
     * Get the payments for the user.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function student()
{
    return $this->hasOne(Student::class);
}

}
