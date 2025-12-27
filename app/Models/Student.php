<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    //
    protected $fillable = [
        'user_id',
        'mobile','home_phone','gender','dob','blood_group',
        'marital_status','national_id',
        'father_name','father_occupation','mother_name','mother_occupation',
        'parents_phone',
        'present_address','present_thana','present_district','present_country',
        'permanent_address','permanent_thana','permanent_district','permanent_country',
        'ssc_exam','ssc_group','ssc_result','ssc_year','ssc_institute','ssc_board',
        'hsc_exam','hsc_group','hsc_result','hsc_year','hsc_institute','hsc_board',
    ];
}
