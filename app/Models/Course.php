<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'code',
        'credit',
        'semester',
    ];


      /**
     * The users that are enrolled in the course.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}
