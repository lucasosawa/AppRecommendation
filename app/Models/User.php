<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\PivotVacancie;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'telephone',
        'typeUser',
        'address_id',
        'profile_id',
        'company_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function companiesProfile()
    {
        return $this->belongsTo(CompanyProfile::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function pivotVacancie(){
        return $this->hasMany(PivotVacancie::class);
    }

    public function updateOrCreateProfile($user, $request){
        $profile = Profile::updateOrCreate(
        [
            'id' => $user->profile_id
        ],
        [
            'age' => '',
            'about' => '',
            'academicEducation' => '',
            'interest' => '',
            'highlights' => '',
            'skills' => '',
            'professionalHisto' => '',
            'gitHub' => ''
        ]);
        $user->company_id = null;
        $user->profile_id = $profile->id;
        $user->save();
    return true;
}

public function updateOrCreateCompanyProfile($user, $request){
        $profile = $user->profile_id;
        $company = CompanyProfile::updateOrCreate(
        [
            'id' => $user->company_id
        ],
        [
            'about' => '',
            'category' => '',
            'size' => '',
            'founded' => '',
            'specialty' => '',
        ]);

        $user->profile_id = null;
        Profile::where('id', $profile)->delete();
        $user->company_id = $company->id;
        $user->save();
    return true;
}

public function updateOrCreateAddress($user, $request){
        $address = Address::updateOrCreate(
        [
            'id' => $user->address_id
        ],
        [
            'city' => '',
            'state' => '',
            'zipCode' => '',
            'district' => '',
            'street' => '',
            'number' => '',
        ]);
        $user->address_id = $address->id;
        $user->save();
    return true;
}

}
