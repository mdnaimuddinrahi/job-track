<?php

namespace App\Http\Controllers;

use App\Common\ResponseCode;
use Illuminate\Http\JsonResponse;

abstract class Controller
{
    public function sendResponse(array $data = [], int $code = ResponseCode::SUCCESS, string $message = ''): JsonResponse
    {
        return response()->json([
            'code' => $code,
            'message' => ResponseCode::getMessage($code, $message),
            'data' => $data,
        ], $code);
    }
}
