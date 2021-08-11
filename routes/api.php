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

Route::post('signup','App\Http\Controllers\Api\UserController@signup')->name('signup.user');
Route::get('users', 'App\Http\Controllers\Api\UserController@index')->name('all.users');
Route::post('auth/login', 'App\Http\Controllers\Api\AuthController@login')->name('login.user');
Route::group(['middleware'=> ['apiJwt']],function (){
    Route::post('auth/logout', 'App\Http\Controllers\Api\AuthController@logout')->name('logout.user');

    Route::post('me', 'App\Http\Controllers\Api\AuthController@me');

});
//Route::get('users', 'App\Http\Controllers\Api\UserController@index')->name('all.users');
