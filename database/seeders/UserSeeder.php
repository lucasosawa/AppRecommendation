<?php

namespace Database\Seeders;

use App\Models\CompanyProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=> 'Admin',
            'email'=> 'admin@admin.com',
            'password'=> Hash::make('admin@admin.com'),
            'role'=> 'admin',
            'typeUser'=> 1,
            'status'=> 1,
            'telephone'=> '11111-1111',
        ]);
        User::create([
            'name'=> 'usuario',
            'email'=> 'usuario@usuario.com',
            'password'=> Hash::make('usuario@usuario.com'),
            'role'=> 'user',
            'typeUser'=> 2,
            'status'=> 1,
            'telephone'=> '11111-1111',
        ]);
        User::create([
            'name'=> 'contractor',
            'email'=> 'contractor@contractor.com',
            'password'=> Hash::make('contractor@contractor.com'),
            'role'=> 'contractor',
            'typeUser'=> 3,
            'status'=> 1,
            'telephone'=> '11111-1111',
        ]);
    }
}
