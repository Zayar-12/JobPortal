<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "employer_id"=>$this->employer_id,
    "name"=>$this->name,
    "description"=>$this->description,
    "logo"=>$this->logo? asset('storage/'.$this->logo) :null,
    "background_photo"=>$this->background_photo? asset('storage/'.$this->background_photo) :null,
    "location"=>$this->location,
    "website"=>$this->website,
    "uploaded_jobs"=>JobResource::collection($this->whenLoaded('jobs'))
    
        ];
    }
}
