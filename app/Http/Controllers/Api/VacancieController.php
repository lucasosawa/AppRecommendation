<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vacancies;
use App\Models\User;
use App\Models\PivotVacancie;


class VacancieController extends Controller
{
    public function index()
    {
        $Vacancies = Vacancies::when(request()->workNiche, function($query){
            return $query->orWhere('workNiche', request()->workNiche);
        })
        ->when(request()->occupation, function($query){
            return $query->orWhere('occupation', request()->occupation);
        })
        ->get();

        return response()->json($Vacancies);
    }

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

    public function show(Vacancies $vacancie)
    {
        return response()->json($vacancie);
    }

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
