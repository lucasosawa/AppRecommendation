<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacancies extends Model
{
    use HasFactory;

    protected $fillable = [

        'title',
        'workNiche',
        'requirements',
        'description',
        'dateCreate',
        'dateEnd',
        'adress',

        ];

        public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
