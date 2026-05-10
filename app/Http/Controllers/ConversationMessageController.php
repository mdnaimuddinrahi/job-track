<?php

namespace App\Http\Controllers;

use App\Models\ConversationMessage;
use App\Http\Requests\UpdateConversationMessageRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\MessageSent;

class ConversationMessageController extends Controller
{
    public function index(Request $request)
    {
        // ✅ Validate input
        // $request->validate([
        //     'conversationId' => 'required|exists:conversations,id'
        // ]);

        $conversationId = $request->conversationId;

        // ✅ Get messages with sender & receiver
        $messages = ConversationMessage::with([
            'sender:id,name,email',
            'receiver:id,name,email'
        ])
        ->where('conversation_id', $conversationId)
        ->orderBy('id', 'asc')
        ->get();

        // ✅ Format response
        $data = $messages->map(function ($msg) {
            return [
                'id' => $msg->id,
                'conversationId' => $msg->conversation_id,

                'sender' => [
                    'id' => $msg->sender->id,
                    'name' => $msg->sender->name,
                    'email' => $msg->sender->email,
                ],

                'receiver' => [
                    'id' => $msg->receiver->id,
                    'name' => $msg->receiver->name,
                    'email' => $msg->receiver->email,
                ],

                'message' => $msg->message,

                // timestamp in ms
                'timestamp' => $msg->created_at
                    ? $msg->created_at->timestamp * 1000
                    : null,
            ];
        });

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $input = $request->all();
    //     $message = (new ConversationMessage())->create([
    //         'conversation_id' => $input['conversation_id'],
    //         'sender_id' => $input['sender_id'],
    //         'receiver_id' => $input['receiver_id'],
    //         'message' => $input['message'],
    //     ]);
    //     return response()->json(['message' => 'Message Send Successfully.', 'data' => $message]);
    // }

    public function store(Request $request)
    {
        $input = $request->all();

        $message = ConversationMessage::with([
            'sender:id,name,email',
            'receiver:id,name,email'
        ])->create([
            'conversation_id' => $input['conversation_id'],
            'sender_id' => $input['sender_id'],
            'receiver_id' => $input['receiver_id'],
            'message' => $input['message'],
        ]);

        $data = [
            'id' => $message->id,
            'conversationId' => $message->conversation_id,

            'sender' => [
                'id' => $message->sender->id,
                'name' => $message->sender->name,
                'email' => $message->sender->email,
            ],

            'receiver' => [
                'id' => $message->receiver->id,
                'name' => $message->receiver->name,
                'email' => $message->receiver->email,
            ],

            'message' => $message->message,

            'timestamp' => $message->created_at
                ? $message->created_at->timestamp * 1000
                : null,
        ];
        // ✅ broadcast here
        broadcast(new MessageSent($data))->toOthers();

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(ConversationMessage $conversationMessage)
    {
        $users = (new User())->getUsers(['user_ids' => [$conversationMessage->sender_id, $conversationMessage->receiver_id], 'selected_cols' => ['id', 'name', 'email']]);

        $data = [
            'conversationId' => $conversationMessage->conversation_id,
            'sender' => $users->find($conversationMessage->sender_id),
            'receiver' => $users->find($conversationMessage->receiver_id),
            'message' => $conversationMessage->message,
            "timestamp" => strtotime($conversationMessage->created_at),
        ];

        return response()->json(['data' => $data, 'message' => "Conversation Message details Successfully."]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConversationMessageRequest $request, ConversationMessage $conversationMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ConversationMessage $conversationMessage)
    {
        $conversationMessage->delete();

         return response()->json(['message' => 'Conversation Message Deleted Successfully']); 
    }
}
