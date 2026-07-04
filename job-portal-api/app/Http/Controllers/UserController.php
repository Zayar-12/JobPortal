<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;

class UserController extends Controller
{
    public function profile(){
        $user=request()->user();
        if(!$user){
            return response()->json([
                'message'=>'user not found'
            ]);
        }
        return new UserResource($user);
    }
}
