<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobApplicationRequest;
use App\Http\Resources\JobAppllicationResource;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobApplicationRequest $request)
    {


        $user = $request->user();
        if($user->role != 'user'){
              return response()->json([
                "message" => "Your role is not user"
            ]);
        }
        $job_id = $request->job_id;
        $job = Job::find($job_id);
        if (!$job) {
            return response()->json([
                "message" => "Job doesn't exist"
            ]);
        }
        $user_id = $user->id;
        $existingJobApplicatoin = JobApplication::where('user_id', $user_id)->where('job_id', $job_id)->first();


        if ($existingJobApplicatoin) {
            return response()->json([
                "message" => "You have already applied for this job."
            ], 409);
        }

        
        $data = $request->validated();


        $data["job_id"] = $job->id;
        $data['user_id'] = $user->id;
        $newJobApplication = JobApplication::create($data);

        return $newJobApplication;
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        return new JobAppllicationResource($jobApplication);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
