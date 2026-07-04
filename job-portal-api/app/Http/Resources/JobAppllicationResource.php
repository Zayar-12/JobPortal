<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobAppllicationResource extends JsonResource
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
            'cv_path'=>$this->cv_path? asset('storage/'.$this->cv_path):null,
            'status'=>$this->status,
            'job_id'=>$this->job_id,
            'user_id'=>$this->user_id,
            'job'=>$this->job,
            'applier'=>$this->user,
        ];
    }
}
