<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobRequest;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\JobResource;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;

class CompanyJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();
        $role = $user->role;
        if ($role == 'user'  || $role == 'admin') {
            return response()->json([
                "message" => "You are not an employer"
            ]);
        }

        $jobs = Company::with('jobs')->where('employer_id', $user->id)->first();

        return new CompanyResource($jobs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();

        $role = $user->role;
        if ($role == 'user'  || $role == 'admin') {
            return response()->json([
                "message" => "You are not an employer"
            ]);
        }

        $employer_id = $user->id;

        $company = Company::where('employer_id', $employer_id)->first();


        if (!$company) {
            return response()->json([
                "message" => "Company doesn't exit"
            ]);
        }
        $company_id = $company->id;

        $data['company_id'] = $company_id;
        $job = Job::create($data);

        return new JobResource($job);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job, Request $request)
    {

        $user = $request->user();
        $role = $user->role;
        if ($role == 'user'  || $role == 'admin') {
            return response()->json([
                "message" => "You are not an employer"
            ]);
        }

        $employer_id = $user->id;

        $company = Company::where('employer_id', $employer_id)->first();


        if (!$company) {
            return response()->json([
                "message" => "Company doesn't exit"
            ]);
        }
        $company_id = $company->id;

        if ($company_id != $job->company_id) {
            return response()->json([
                "message" => "Company doesn't upload this job"
            ]);
        }

        return new JobResource($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobRequest $request, Job $job)

    {
        $data = $request->validated();


        $user = $request->user();
        $role = $user->role;
        if ($role == 'user'  || $role == 'admin') {
            return response()->json([
                "message" => "You are not an employer"
            ]);
        }

        $employer_id = $user->id;

        $company = Company::where('employer_id', $employer_id)->first();


        if (!$company) {
            return response()->json([
                "message" => "Company doesn't exit"
            ]);
        }
        $company_id = $company->id;

        if ($company_id != $job->company_id) {
            return response()->json([
                "message" => "Company doesn't upload this job"
            ]);
        }

        $data['company_id'] = $company_id;

        $job->update($data);

        return  new JobResource($job);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job, Request $request)
    {

        $user = $request->user();
        $role = $user->role;
        if ($role == 'user'  || $role == 'admin') {
            return response()->json([
                "message" => "You are not an employer"
            ]);
        }

        $employer_id = $user->id;

        $company = Company::where('employer_id', $employer_id)->first();


        if (!$company) {
            return response()->json([
                "message" => "Company doesn't exit"
            ]);
        }
        $company_id = $company->id;

        if ($company_id != $job->company_id) {
            return response()->json([
                "message" => "Company doesn't upload this job"
            ]);
        }

        $result = $job->delete();

        if ($result) {
            return response()->json([
                "message" => "Delete successful"
            ]);
        } else {
            return response()->json([
                "message" => "Delete action fail"
            ]);
        }
    }
}
