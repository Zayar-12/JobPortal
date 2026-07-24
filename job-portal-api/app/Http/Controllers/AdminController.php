<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Http\Resources\JobResource;
use App\Http\Resources\UserResource;
use App\Models\Company;
use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
      public function allUsers(){
        $user=User::all()->where('role','user');
         if(!$user){
            return response()->json([
                'message'=>'user not found'
            ]);
        }
        return UserResource::collection($user);
    }

     public function allCompanies()
    {
       $allCompanies= Company::all();

       return CompanyResource::collection($allCompanies);
    }

    public function allRecentJobs(){
        $allRecentJobs=Job::latest()->get();
        return JobResource::collection($allRecentJobs);
    }
}
