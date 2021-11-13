<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function store(Request $request)
    {

        try {

                User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'age' => $request->age,
                'about'=> $request->about,
                'role'=> $request->role,
                'status'=> $request->status,
                'telephone'=> $request->telephone,
                'AcademicEducation'=> $request->AcademicEducation,
                'interest'=> $request->interest,
                'skills'=> $request->skills,
                'professionalHistory'=> $request->professionalHistory,
                'highlights'=> $request->highlights,
                'gitHub'=> $request->gitHub

            ]);
            return response()->json(['message'=> 'Created successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Created Failed']);
        }
    }
    public function update(Request $request,User $user)
    {
        try {

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'age' => $request->age,
                'about'=> $request->about,
                'role'=> $request->role,
                'status'=> $request->status,
                'telephone'=> $request->telephone,
                'AcademicEducation'=> $request->AcademicEducation,
                'interest'=> $request->interest,
                'skills'=> $request->skills,
                'professionalHistory'=> $request->professionalHistory,
                'highlights'=> $request->highlights,
                'gitHub'=> $request->gitHub

            ]);
            return response()->json(['message'=> 'Updated successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Updated Failed']);
        }
    }




    public function userList($status, $role){
//         return response()->json($role);
        $users = User::where('status', $status)->where('role', $role)->get();

        return response()->json($users);

    }

    public function destroy($id)
    {
        //
    }
}
