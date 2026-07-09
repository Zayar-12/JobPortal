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
        if ($user->role != 'user') {
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

        if ($request->hasFile('cv_path')) {
            $path = $request->file('cv_path')->store('cv_files', 'public');
            $data['cv_path'] = $path;
        } else {
            return response()->json([
                "message" => "Please upload your CV file."
            ], 422);
        }


        $data["job_id"] = $job->id;
        $data['user_id'] = $user->id;
        $newJobApplication = JobApplication::create($data);

        return response()->json([
            "message" => "Application submitted successfully.",
            "data" => $newJobApplication
        ], 201);
    }
 
      public function existingJobApplication(String $id){
         $user = request()->user();
        if ($user->role != 'user') {
            return response()->json([
                "message" => "Your role is not user"
            ]);
        }
        $job=Job::findOrFail($id);
        if($job){
             return response()->json([
                "message" => "No job exist"
            ]);
        }
        $job_id = $job->id;
       
        $user_id = $user->id;
        $existingJobApplicatoin = JobApplication::where('user_id', $user_id)->where('job_id', $job_id)->exists();


      return response()->json([
        "hasApplied" => $existingJobApplicatoin
    ]);
        
      }
    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        return new JobAppllicationResource($jobApplication);
    }


    public function userJobApplications(){

    $user=request()->user();
        $jobApplications=JobApplication::where('user_id',$user->id)->get();

        return JobAppllicationResource::collection($jobApplications);
    }

     public function companyJobApplications(String $job_id){
        $company=request()->user()->company;
        if (!$company) {
        return response()->json(['message' => 'Company not found'], 404);
    }               
        $company_id=$company->id;
        $jobApplications=JobApplication::where('job_id',$job_id)->whereHas('job',function($query) use ($company_id) {
            $query->where('company_id',$company_id);
        })->with('job','user')->get();

        return JobAppllicationResource::collection($jobApplications);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = JobApplication::find($id);

    if (!$application) {
        return response()->json(['message' => 'Application not found'], 404);
    }

  
    $request->validate([
        'status' => 'required|in:accepted,rejected'
    ]);

    $application->status = $request->status;
    $application->save();

    return response()->json([
        'message' => 'Status updated successfully',
        'data' => $application
    ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
