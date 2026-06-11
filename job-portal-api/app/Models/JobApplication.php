<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    protected $fillable = [
         'job_id',
         'user_id',
         'cv_path',
         'status',
         'applied_at'

    ];

    public function job():BelongsTo{
        return $this->belongsTo(Job::class,'job_id');
    }

     public function user():BelongsTo{
        return $this->belongsTo(User::class,'user_id');
    }
}
