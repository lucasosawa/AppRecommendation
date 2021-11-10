<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [

    'name',
    'email',
    'about',
    'telephone',
    'category',
    'size',
    'headOffice',
    'adress',
    'founded',
    'specialty',

    ];

    public function users()
    {
        return $this->hasMany(User::class);

    }
    public function vancacies()
    {
        return $this->hasMany(Vacancies::class);

    }
}

