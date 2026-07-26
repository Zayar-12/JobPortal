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
 
   public function pendingCompanies()
    {
        $companies = Company::where('status', 'pending')->get();
        return CompanyResource::collection($companies);
    }

    public function pendingJobs()
    {
        
        $jobs = Job::where('status', 'pending')->with('company')->get();
        return JobResource::collection($jobs);
    }

    public function acceptActionCompanies(string $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        $company->status = 'accepted';
        $company->save();

        return response()->json([
            'message' => 'Company approved successfully',
            'data' => new CompanyResource($company)
        ]);
    }

    public function acceptActionJobs(string $id)
    {
        $job = Job::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $job->status = 'accepted';
        $job->save();

        return response()->json([
            'message' => 'Job approved successfully',
            'data' => new JobResource($job)
        ]);
    }

    public function rejectActionCompanies(string $id)
    {
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        
        $company->delete(); 

        return response()->json(['message' => 'Company rejected and deleted successfully']);
    }

    public function rejectActionJobs(string $id)
    {
        $job = Job::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $job->delete();

        return response()->json(['message' => 'Job rejected and deleted successfully']);
    }
    
}
