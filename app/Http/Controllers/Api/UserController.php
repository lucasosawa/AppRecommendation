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
            'status'=> $request->status,
            'telephone'=> $request->telephone,
            'typeUser'=> $request->typeUser,
            'address_id'=> $request->address_id,
            'profile_id'=> $request->profile_id,
            'company_id'=> $request->company_id,
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
                'address_id'=> $request->address_id,
                'profile_id'=> $request->profile_id,
                'company_id'=> $request->company_id,
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
