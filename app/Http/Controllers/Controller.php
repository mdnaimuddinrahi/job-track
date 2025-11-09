<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function sendResponse($data = [], $code = 200, $message = 'Success')
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ], 200);
    }
}
