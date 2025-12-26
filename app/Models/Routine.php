<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    //
    protected $fillable = [
        'title',
        'file_path',
        'uploaded_by',
    ];
}
