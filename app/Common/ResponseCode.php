<?php

namespace App\Common;

class ResponseCode
{
    const SUCCESS = 200;
    const CREATED = 201;
    const NO_CONTENT = 204;
    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;
    const INTERNAL_SERVER_ERROR = 500;
    const CONTINUE = 100;
    const VALIDATION_ERROR = 422;

    public static function getMessage($code, $message = ''): string
    {
        $messages = [
            self::SUCCESS => 'Success',
            self::CREATED => 'Created successfully',
            self::NO_CONTENT => 'No content',
            self::BAD_REQUEST => 'Bad request',
            self::UNAUTHORIZED => 'Unauthorized',
            self::FORBIDDEN => 'Forbidden',
            self::NOT_FOUND => 'Not found',
            self::INTERNAL_SERVER_ERROR => 'Internal server error',
            self::CONTINUE => 'Continue',
            self::VALIDATION_ERROR => 'Validation error',
        ];

        return empty($message) ? $messages[$code] : $message;
    }
}