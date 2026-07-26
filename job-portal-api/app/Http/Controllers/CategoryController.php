<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories=Category::all();

        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255|unique:categories,name',
    //     ]);

        
    //     $category = Category::create([
    //         'name' => $request->name,
    //         'slug' => $request->name, 
    //     ]);

  
    //     return response()->json([
    //         'message' => 'Category added successfully!',
    //         'data' => new CategoryResource($category)
    //     ], 201);
    // }
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255|unique:categories,name',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048', 
    ]);

    $logoPath = null;
    if ($request->hasFile('logo')) {
        $path = $request->file('logo')->store('categories', 'public');
        $logoPath = asset('storage/' . $path); 
    }

    $category = Category::create([
        'name' => $request->name,
        'slug' => $request->name, 
        'icon' => $logoPath, 
    ]);

    return response()->json([
        'message' => 'Category added successfully!',
        'data' => new CategoryResource($category)
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $categoryWithJobs=Category::with('jobs')->where('id',$category->id)->first();

        return new CategoryResource($categoryWithJobs);
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
    $category = Category::findOrFail($id);

   
    if ($category->icon) {
        $oldPath = str_replace(asset('storage/'), '', $category->icon);
        Storage::disk('public')->delete($oldPath);
    }

    $category->delete();

    return response()->json([
        'message' => 'Category deleted successfully!'
    ], 200);
}
}
