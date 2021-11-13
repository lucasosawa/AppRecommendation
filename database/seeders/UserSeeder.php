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
            'age'=> '18',
            'about'=> 'mim',
            'role'=> 'admin',
            'status'=> 1,
            'telephone'=> '2021-09-15 20:42:48',
            'AcademicEducation'=> '2021-09-15 20:42:48',
            'interest' => 'Livros',
            'skills'=>'Graduação',
            'professionalHistory' => 'Curriculum',
            'highlights' => 'nao sei',
            'gitHub' => 'Aptidão',



        ]);

        User::create([
            'name'=> 'usuario',
            'email'=> 'usuario@usuario.com',
            'password'=> Hash::make('admin@admin.com'),
            'age' => '18',
            'about'=> 'xico',
            'role'=> 'admin',
            'status'=> 1,
            'telephone'=> '2021-09-15 20:42:48',
            'AcademicEducation'=> '2021-09-15 20:42:48',
            'interest' => 'Livros',
            'skills'=>'Graduação',
            'professionalHistory' => 'Curriculum',
            'highlights' => 'nao sei',
            'gitHub' => 'Aptidão',

        ]);

        User::create([
            'name'=> 'usuario2',
            'email'=> 'usuario2@usuario.com',
            'password'=> Hash::make('admin@admin.com'),
            'age'=> 'papai',
            'about'=> '18',
            'role'=> 'admin',
            'status'=> 1,
            'telephone'=> '2021-09-15 20:42:48',
            'AcademicEducation'=> '2021-09-15 20:42:48',
            'interest' => 'Livros',
            'skills'=>'Graduação',
            'professionalHistory' => 'Curriculum',
            'highlights' => 'nao sei',
            'gitHub' => 'Aptidão',

        ]);

        CompanyProfile::create([

            'name' => 'Super Muffato',
            'email' => 'muffato@muffato.com',
            'about' => 'maior rede de mercado',
            'telephone' => '4333541119',
            'category' => 'Mercado',
            'size' => 'big',
            'headOffice' => 'Rua Blue',
            'address' =>'Rua Blue',
            'founded' => '2021-09-15',
            'specialty' => 'produtos',
            'companyRole' => 'Gerente',

        ]);
    }
}
