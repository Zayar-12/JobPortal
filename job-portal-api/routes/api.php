<?php

use App\Http\Controllers\Auth\CompanyAuth;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyJobController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Monolog\Handler\RotatingFileHandler;

require __DIR__ . '/auth.php';
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('companyJobs', CompanyJobController::class);
    Route::apiResource('jobApplication', JobApplicationController::class);
    Route::get('/userJobApplications', [JobApplicationController::class, 'userJobApplications']);
    Route::get('/companyJobApplications/{jobId}', [JobApplicationController::class, 'companyJobApplications']);
    Route::get("/profile", [UserController::class, 'profile']);
    Route::get('/companyId', [CompanyAuth::class, 'companyId']);
});

Route::apiResource('allCompaines', CompanyController::class);
Route::apiResource('userJobs', UserJobController::class);
Route::get('/jobs/search', [UserJobController::class, 'search']);
Route::apiResource('categories', CategoryController::class);
Route::post('/register-company', [CompanyAuth::class, 'companyRegister']);
