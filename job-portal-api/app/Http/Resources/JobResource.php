<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
             'company_id'=>$this->company_id,
             'category_id'=>$this->category_id,
    'title'=>$this->title,
    'description'=>$this->description,
    'requirements'=>$this->requirements,
    'salary'=>$this->salary,
    'location'=>$this->location,
    'deadline'=>$this->deadline,
    'company'=>new CompanyResource($this->whenLoaded('company'))
        ];
    }
}
