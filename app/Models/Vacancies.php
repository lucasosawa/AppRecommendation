<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PivotVacancie;

class Vacancies extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'workNiche',
        'occupation',
        'requirements',
        'description',
        'dateEnd'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function vacanciePivot()
    {
        return $this->hasMany(PivotVacancie::class);
    }


}
