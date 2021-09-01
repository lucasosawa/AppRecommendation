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
        User::create([
           'name' => 'Admin',
           'email' => 'admin@admin.com',
           'password' => Hash::make('admin@admin.com')
        ]);

        User::create([
            'name' => 'company',
            'email' => 'company@gdev.com',
            'password' => Hash::make('123')
        ]);

        User::create([
            'name' => 'candidate',
            'email' => 'candidate@gdev.com',
            'password' => Hash::make('123')
        ]);
    }
}
