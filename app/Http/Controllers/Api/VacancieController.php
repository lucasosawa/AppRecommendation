<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vacancies;
use App\Models\User;
use App\Models\PivotVacancie;


class VacancieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($workNiche, $occupation)
    {
        $Vacancies = Vacancies::where('workNiche', $workNiche)->orWhere('occupation', $occupation)->get();
        return response()->json($Vacancies);
    }

    public function vacancieApply(){
        $Vacancies = PivotVacancie::with('user', 'vacancie')->where('user_id', 2)->get();
        return response()->json($Vacancies);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            Vacancies::create([
            'title' => $request->title,
            'workNiche' => $request->workNiche,
            'occupation' => $request->occupation,
            'requirements' => $request->requirements,
            'description'=> $request->description,
            'dateEnd'=> $request->dateEnd,
        ]);
            return response()->json(['message'=> 'Created successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Created Failed', $e]);
        }
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
    public function update(Request $request, Vacancies $Vacancie)
    {
        try {
            $Vacancie->update([
            'title' => $request->title,
            'workNiche' => $request->workNiche,
            'requirements' => $request->requirements,
            'description'=> $request->description,
            'dateEnd'=> $request->dateEnd,
        ]);
            return response()->json(['message'=> 'Updated successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Updated Failed', $e]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $Vacancie = Vacancies::findOrFail($id);
            $Vacancie->delete();
            return response()->json(['message'=> 'Deleted successful']);
        }catch (\Exception $e){
            return response()->json(['message'=> 'Deleted Failed', $e]);
        }
    }
}
