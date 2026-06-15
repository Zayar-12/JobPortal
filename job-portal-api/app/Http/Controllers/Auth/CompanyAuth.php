<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRegisterRequest;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;

class CompanyAuth extends Controller
{



public function companyRegister(CompanyRegisterRequest $request){


 $data= $request->validated();
 
 $email= $data['email'];
 $password=bcrypt($data['password']);
$name=$data['name'];

   $user=User::create([
    'email'=>$email,
    'name'=>$name,
    'password'=>$password,
    'role'=>"employer"
   ]);

   

   $data['employer_id']=$user->id;

   $company=Company::create($data);

    $token = $user->createToken('main')->plainTextToken;

    return response()->json([
        'token'=>$token,
        'company_id'=>$company->id,
        'role'=>$user->role
    
    ]);

}
}
