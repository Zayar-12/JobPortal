<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Http\Resources\JobResource;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class UserJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $latest20Jobs = Job::with('company')->where('status', 'accepted')->latest()->paginate(5);

        return JobResource::collection($latest20Jobs);
    }

    public function topCompanies()
    {
        $topCompanies = \App\Models\Company::withCount(['jobs as total_applications_count' => function ($query) {
            $query->has('jobApplications');
        }])
            ->orderByDesc('total_applications_count')
            ->take(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => CompanyResource::collection($topCompanies)
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $job = Job::with('company')->findOrFail($id);
        return new JobResource($job);
    }

    public function search(Request $request)
    {
        $title = $request->query('title');
        $location = $request->query('location');

        $query = Job::query();

        $query->with('company');
        if ($title) {
            $query->where('title', 'like', '%' . $title . '%')->where('status', 'accepted');
        }

        if ($location) {
            $query->where('location', 'like', '%' . $location . '%')->where('status', 'accepted');
        }

        $jobs = $query->paginate(3);

        return JobResource::collection($jobs);
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
