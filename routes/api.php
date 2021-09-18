<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BitcoinController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [BitcoinController::class, 'login']);
Route::get('/crypto/btc', [BitcoinController::class, 'btc']);
Route::post('/crypto/btc', [BitcoinController::class, 'updatebtc']);

Route::get('/json', function () {
    $currencies = json_decode(file_get_contents(asset('storage/json/currencies.json'), false), true);
    return $currencies;
})->name('json');
