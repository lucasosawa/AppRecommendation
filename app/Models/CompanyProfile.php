<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $table = 'company_profile';
    protected $fillable = [

    'name',
    'email',
    'about',
    'telephone',
    'category',
    'size',
    'headOffice',
    'address',
    'founded',
    'specialty',
    'user_id',
    'companyRole'

    ];

    public function users()
    {
        return $this->belongsTo(User::class);

    }
    public function vancacies()
    {
        return $this->hasMany(Vacancies::class);

    }
}

