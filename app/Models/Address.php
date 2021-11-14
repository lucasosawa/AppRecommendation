<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'city',
        'state',
        'zipCode',
        'district',
        'street',
        'number'
    ];


    public function user()
    {
        return $this->hasOne(User::class);
    }
}
