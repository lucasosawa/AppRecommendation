<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

// http://127.0.0.1:8000/api/users -> post
// http://127.0.0.1:8000/api/users/id -> update

//Login
Route::post('auth/login', 'App\Http\Controllers\Api\AuthController@login')->name('login.user');
//Create User
Route::post('users','App\Http\Controllers\Api\UserController@store')->name('store.user');
Route::group(['middleware'=> ['apiJwt']],function (){
    // Logout
    Route::post('auth/logout', 'App\Http\Controllers\Api\AuthController@logout')->name('logout.user');

    // Get the current user authenticated
    Route::get('users/authenticated','App\Http\Controllers\Api\UserController@authUser')->name('current.user');
    // Update user
    Route::put('users/{user}','App\Http\Controllers\Api\UserController@update')->name('update.user');
    // Search User by Role and Name
    Route::get('users', 'App\Http\Controllers\Api\UserController@userList')->name('list.users');

    Route::post('search/vacancies','App\Http\Controllers\Api\VacancieController@index')->name('index.vacancies');
    // Search the vacancie by workNiche or occupation / or both of them
    Route::get('vacancies','App\Http\Controllers\Api\VacancieController@index')->name('index.vacancies');
    // Create/Update/Delete
    Route::post('vacancies','App\Http\Controllers\Api\VacancieController@store')->name('store.vacancies');
    Route::put('vacancies/{vacancie}','App\Http\Controllers\Api\VacancieController@update')->name('update.vacancies');
    Route::delete('vacancies/{id}','App\Http\Controllers\Api\VacancieController@destroy')->name('destroy.vacancies');
    Route::get('vacancies/{vacancie}','App\Http\Controllers\Api\VacancieController@show')->name('show.vacancies');

    // Get the user vacancies by ID
    Route::get('pivotvacancie/{user}', 'App\Http\Controllers\Api\PivotVacancieController@getUserVacancies');
    // Get vacancie by user logged
    Route::get('user/pivotvacancie', 'App\Http\Controllers\Api\PivotVacancieController@getAuthUserVacancies');
    // Apply in vacancie via user logged ID and the vacancie ID
    Route::post('pivotvacancie/{vacancie}', 'App\Http\Controllers\Api\PivotVacancieController@store');
});
//Route::get('users', 'App\Http\Controllers\Api\UserController@index')->name('all.users');
