<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vacancies;

class PivotVacancie extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vacancie_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function vacancie()
    {
        return $this->belongsTo(Vacancies::class);
    }

    public function scopeValidateUserVacancieIfExists($query, $vacancie){
        return $query->where('vacancie_id', $vacancie->id)
        ->where('user_id', auth()->user()->id)->count();
    }

}
