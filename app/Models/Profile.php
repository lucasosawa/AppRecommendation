<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'age',
        'about',
        'academicEducation',
        'interest',
        'highlights',
        'skills',
        'professionalHistory',
        'gitHub'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
