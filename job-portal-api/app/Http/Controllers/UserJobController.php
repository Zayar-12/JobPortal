<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;

class UserJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $latest20Jobs=Job::latest()->take(20)->get();

        return JobResource::collection($latest20Jobs);
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

    $job=Job::findOrFail($id);
        return new JobResource($job);
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
