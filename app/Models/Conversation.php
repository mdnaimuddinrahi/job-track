<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    /**
     * {
            "id": 1,
            "participants": "sumit@learnwithsumit.com-akash@learnwithsumit.com",
            "users": [
                {
                    "email": "sumit@learnwithsumit.com",
                    "name": "Sumit Saha",
                    "id": 1
                },
                {
                    "email": "akash@learnwithsumit.com",
                    "name": "Akash Ahmed",
                    "id": 2
                }
            ],
            "message": "How are you?",
            "timestamp": 1661976143678
        },
     */

    protected $table = "conversations";
    protected $fillable = ['user_one_id', 'user_two_id', 'message', 'created_at', 'updated_at'];

    public function userOne()
    {
        return $this->belongsTo(User::class, 'user_one_id');
    }

    public function userTwo()
    {
        return $this->belongsTo(User::class, 'user_two_id');
    }


}
