<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\ConversationMessageController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\TodoController;
use Illuminate\Container\Attributes\Auth;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);
    Route::get('/conversation/show', [ConversationController::class, 'getConversation']);
    Route::apiResource('conversations', ConversationController::class);
    Route::apiResource('conversation-messages', ConversationMessageController::class);
    Route::get('/users', [RegisteredUserController::class, 'index']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::apiResource('companies', \App\Http\Controllers\CompanyController::class);

Route::prefix('todos')->group(function () {
    Route::get('/', [TodoController::class, 'index']);
    Route::post('/', [TodoController::class, 'store']);
    Route::put('/{todo}', [TodoController::class, 'update']);
    Route::delete('/{todo}', [TodoController::class, 'destroy']);
    Route::get('/complete-all', [TodoController::class, 'completeAll']);
    Route::get('/clear-completed', [TodoController::class, 'clearCompleted']);
});

 
Route::apiResource('videos', VideoController::class);
Route::get('/related-videos', [VideoController::class, 'relatedVideos']);

Route::apiResource('tags', TagController::class);

Route::apiResource('blogs', BlogController::class);
Route::get('/related-blogs', [BlogController::class, 'relatedBlogs']);
Route::apiResource('expense', ExpenseController::class);
Route::apiResource('job-seeker', JobSeekerController::class);


// Route::get('/users/list', [RegisteredUserController::class, 'getUsers']);
// Route::get('/users/show/{id}', [RegisteredUserController::class, 'show']);

