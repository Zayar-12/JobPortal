<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $allCompanies= Company::all();

       return CompanyResource::collection($allCompanies);
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
        $companyWithJobs=Company::with('jobs')->where('id',$id)->first();
           
        return new CompanyResource($companyWithJobs);
        }

    /**
     * Update the specified resource in storage.
     */
  

public function update(Request $request,string $id)
{
    
    $company = Company::findOrFail($id);

    // Validate incoming data (all fields optional to support partial or full updates)
    $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'description' => 'sometimes|nullable|string',
        'location' => 'sometimes|nullable|string|max:255',
        'website' => 'sometimes|nullable|string|max:255',
        'logo' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'background_photo' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
    ]);

    // Handle Logo Upload
    if ($request->hasFile('logo')) {
        // Delete old logo if it exists in storage
        if ($company->logo && Storage::disk('public')->exists($company->logo)) {
            Storage::disk('public')->delete($company->logo);
        }
        // Store new logo in 'company_logos' folder
        $validated['logo'] = $request->file('logo')->store('company_logos', 'public');
    }

    // Handle Background Photo Upload
    if ($request->hasFile('background_photo')) {
        // Delete old background photo if it exists in storage
        if ($company->background_photo && Storage::disk('public')->exists($company->background_photo)) {
            Storage::disk('public')->delete($company->background_photo);
        }
        // Store new background photo in 'company_background_photos' folder
        $validated['background_photo'] = $request->file('background_photo')->store('company_background_photos', 'public');
    }

    // Update the company record
    $company->update($validated);

    return response()->json([
        'message' => 'Company updated successfully',
        'data' => $company
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
