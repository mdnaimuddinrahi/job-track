<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class RegisteredUserController extends Controller
{
    public function index(Request $request): JsonResponse {
        $email = $request->input('email');
        $users = (new User())->where('email', 'like', "%{$email}%")->whereNot('id', Auth::id())->get();

        return response()->json(['data' => $users]);
    }

    public function show(int $id): JsonResponse {
        $user = (new User())->find($id);

        return response()->json(['data' => $user]);
    }
}
