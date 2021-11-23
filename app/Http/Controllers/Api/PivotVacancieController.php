<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PivotVacancie;
use App\Models\Vacancies;
use App\Models\User;

class PivotVacancieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getAuthUserVacancies(){
        $pivot_vacancie = PivotVacancie::where('user_id', auth()->user()->id)->with('vacancie')->get();
        return response()->json($pivot_vacancie);
    }

    public function getUserVacancies(User $user){
        $pivot_vacancie = PivotVacancie::where('user_id', $user->id)->with('vacancie')->get();
        return response()->json($pivot_vacancie);
    }

    public function store(Vacancies $vacancie){
        $pivot_vacancie = PivotVacancie::ValidateUserVacancieIfExists($vacancie);
        if($pivot_vacancie < 1){
            PivotVacancie::create([
                'user_id' => auth()->user()->id,
                'vacancie_id' => $vacancie->id
            ]);
            return response()->json(['message' => 'success']);
        }
        return  response()->json(['message' => 'usuário ja registrado']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
