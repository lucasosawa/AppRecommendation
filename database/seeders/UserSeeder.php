<?php

namespace Database\Seeders;

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
//        $admin = User::create([
//            'name' => 'Admin',
//            'email' => 'admin@admin.com',
//            'password' => Hash::make('admin@admin.com')
//        ]);

        $admin = User::create([
            'name' => 'teste',
            'email' => 'teste@admin.com',
            'password' => Hash::make('123')
        ]);
    }
}
