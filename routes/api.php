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

Route::post('auth/login', 'App\Http\Controllers\Api\AuthController@login')->name('login.user');
Route::post('users','App\Http\Controllers\Api\UserController@store')->name('store.user');
Route::group(['middleware'=> ['apiJwt']],function (){
    Route::post('auth/logout', 'App\Http\Controllers\Api\AuthController@logout')->name('logout.user');
    Route::post('me', 'App\Http\Controllers\Api\AuthController@me');

    Route::get('users/authenticated','App\Http\Controllers\Api\UserController@authUser')->name('current.user');
    Route::put('users/{user}','App\Http\Controllers\Api\UserController@update')->name('update.user');
    Route::get('users/{status}/{role}', 'App\Http\Controllers\Api\UserController@userList')->name('list.users');

    Route::post('vacancies','App\Http\Controllers\Api\VacancieController@store')->name('store.vacancies');
    Route::put('vacancies/{vacancie}','App\Http\Controllers\Api\VacancieController@update')->name('update.vacancies');
    Route::delete('vacancies/{id}','App\Http\Controllers\Api\VacancieController@destroy')->name('destroy.vacancies');

    Route::get('search-vacancies/{workNiche}/{occupation}','App\Http\Controllers\Api\VacancieController@index')->name('index.vacancies');
    Route::get('vacancieApply', 'App\Http\Controllers\Api\VacancieController@vacancieApply');
});
//Route::get('users', 'App\Http\Controllers\Api\UserController@index')->name('all.users');
