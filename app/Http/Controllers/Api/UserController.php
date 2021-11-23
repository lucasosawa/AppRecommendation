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
            'role'=> $request->role,
            'status'=> 1,
            'telephone'=> $request->telephone,
            'typeUser'=> $request->typeUser,
        ]);
            return response()->json(['message'=> 'Created successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Created Failed', $e]);
        }
    }

    public function update(Request $request,User $user)
    {
        try {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role'=> $request->role,
                'status'=> $request->status,
                'telephone'=> $request->telephone,
                'typeUser'=> $request->typeUser,
            ]);
            // if($request->address_id){
                $user->updateOrCreateAddress($user, $request);
            // }
            if($request->typeUser == 2){
                $user->updateOrCreateProfile($user, $request);
            }
            if($request->typeUser == 4){
                $user->updateOrCreateCompanyProfile($user, $request);
            }
            return response()->json(['message'=> 'Updated successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Updated Failed']);
        }
    }

    public function userList($status, $role){
        $users = User::where('status', 1)
        ->when(request()->role, function($query){
            return $query->where('role', request()->role);
        })
        ->when(request()->name, function($query){
            return $query->where('name', request()->name);
        })
        ->get();
    }

    public function destroy($id)
    {
        //
    }

    public function authUser(){
        $user = User::where('id', auth()->user()->id)->with(['address', 'profile', 'companiesProfile'])->first();
        return response()->json($user);
    }
}
