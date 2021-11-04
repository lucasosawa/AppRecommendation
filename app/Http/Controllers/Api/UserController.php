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

    public function signup(Request $request)
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make(''.$request->password.''),
            ]);
            return response()->json(['message'=> 'Signup successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Signup Failed']);
        }
    }

    public function userList($status, $role){
//         return response()->json($role);
        $users = User::where('status', $status)->where('role', $role)->get();

        return response()->json($users);

    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {
        //
    }
}
