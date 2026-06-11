<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
   protected $fillable = [
    'company_id',
    'title',
    'description',
    'requirements',
    'salary',
    'deadline'
   ];


   public function company():BelongsTo{
      return $this->belongsTo(Company::class,'company_id');
   }

   public function jobApplications():HasMany{
      return $this->hasMany(JobApplication::class,'job_id');
   }
}
