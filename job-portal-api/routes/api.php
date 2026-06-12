<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyJobController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\UserJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


require __DIR__ . '/auth.php';
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('companyJobs', CompanyJobController::class);
    Route::apiResource('jobApplication',JobApplicationController::class);
});


Route::apiResource('userJobs', UserJobController::class);
Route::apiResource('categories', CategoryController::class);
