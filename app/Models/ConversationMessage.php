<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConversationMessage extends Model
{
    protected $fillable = [
        'conversation_id',
        'sender_id',
        'receiver_id',
        'message',
    ];
    protected $table = "conversation_messages";

    /**
     * {
            "id": 1,
            "conversationId": 1,
            "sender": {
                "email": "sumit@learnwithsumit.com",
                "name": "Sumit Saha",
                "id": 1
            },
            "receiver": {
                "email": "akash@learnwithsumit.com",
                "name": "Akash Ahmed",
                "id": 2
            },
            "message": "Hello",
            "timestamp": 1661976143557
        }
     */

         /**
     * Sender relationship
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Receiver relationship
     */
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
