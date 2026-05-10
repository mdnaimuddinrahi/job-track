<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use function PHPSTORM_META\map;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user_id;

        $conversations = Conversation::with([
            'userOne:id,name,email',
            'userTwo:id,name,email'
        ])
        ->where(function ($query) use ($userId) {
            $query->where('user_one_id', $userId)
                ->orWhere('user_two_id', $userId);
        })
        ->orderByDesc('updated_at')
        ->get();

        $data = $conversations->map(function ($conversation) {
            return [
                'id' => $conversation->id,

                // participants string
                'participants' => $conversation->userOne->email . '-' . $conversation->userTwo->email,

                // users array
                'users' => [
                    [
                        'id' => $conversation->userOne->id,
                        'name' => $conversation->userOne->name,
                        'email' => $conversation->userOne->email,
                    ],
                    [
                        'id' => $conversation->userTwo->id,
                        'name' => $conversation->userTwo->name,
                        'email' => $conversation->userTwo->email,
                    ],
                ],

                // last message
                'message' => $conversation->message,

                // timestamp in ms
                'timestamp' => $conversation->updated_at
                    ? $conversation->updated_at->timestamp * 1000
                    : null,
            ];
        });

        return response()->json([
            'conversations' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConversationRequest $request)
    {
        
        $input = $request->validated();

        // 🔥 Always sort to avoid (1,2) and (2,1)
        $userOne = Auth::id();
        $userTwo = $input['user_id'];// max($input['user_one_id'], $input['user_two_id']);

        // ✅ Find or create conversation
        $conversation = Conversation::where([
            'user_one_id' => $userOne,
            'user_two_id' => $userTwo,
        ])->first();

        if ($conversation) {
            // ✅ Update message if exists
            $conversation->update([
                'message' => $input['message'],
            ]);
        } else {
            // ✅ Create new
            $conversation = Conversation::create([
                'user_one_id' => $userOne,
                'user_two_id' => $userTwo,
                'message' => $input['message'],
            ]);
        }

        // ✅ Load users properly
        $conversation->load(['userOne:id,name,email', 'userTwo:id,name,email']);

        // ✅ Format response EXACTLY like you want
        $data = [
            'id' => $conversation->id,
            'participants' => $conversation->userOne->email . '-' . $conversation->userTwo->email,
            'users' => [
                [
                    'id' => $conversation->userOne->id,
                    'name' => $conversation->userOne->name,
                    'email' => $conversation->userOne->email,
                ],
                [
                    'id' => $conversation->userTwo->id,
                    'name' => $conversation->userTwo->name,
                    'email' => $conversation->userTwo->email,
                ],
            ],
            'message' => $conversation->message,
            'timestamp' => now()->timestamp * 1000, // ms format like your JSON
        ];

        return response()->json([
            'message' => 'Conversation processed successfully.',
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $conversation)
    {
        $userIds = explode(',', $conversation->user_ids);
        $users = (new User())->getUsers(['user_ids' => $userIds, 'selected_cols' => ['id', 'name', 'email']]);
        $participants = $users->pluck('email')->implode('-');
        $data = [
            'id' => $conversation->id,
            'participants' => $participants,
            'users' => $users,
            'message' => $conversation->message,
            "timestamp" => strtotime($conversation->created_at),
        ];

        return response()->json(['data' => $data, 'message' => "Conversation details Successfully."]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        $conversation->delete();

        return response()->json(['message' => 'Conversation Deleted Successfully']);
    }

    public function getConversation(Request $request)
    {
        try {
            $userId = auth()->id();

            // Get matched users by email
            $participantUsers = User::where('email', 'like', "{$request->input('participant_email')}%")
                ->where('id', '!=', $userId)
                ->pluck('id'); // ✅ get only IDs

            // Get conversations where:
            // (user_one = me AND user_two in matched users)
            // OR
            // (user_two = me AND user_one in matched users)
            $conversations = Conversation::with([
                    'userOne:id,name,email',
                    'userTwo:id,name,email'
                ])
                ->where(function ($query) use ($userId, $participantUsers) {
                    $query->where(function ($q) use ($userId, $participantUsers) {
                        $q->where('user_one_id', $userId)
                        ->whereIn('user_two_id', $participantUsers);
                    })->orWhere(function ($q) use ($userId, $participantUsers) {
                        $q->where('user_two_id', $userId)
                        ->whereIn('user_one_id', $participantUsers);
                    });
                })
                ->orderByDesc('updated_at')
                ->get();

            // ✅ Same mapping as index()
            $data = $conversations->map(function ($conversation) {
                return [
                    'id' => $conversation->id,

                    'participants' => $conversation->userOne->email . '-' . $conversation->userTwo->email,

                    'users' => [
                        [
                            'id' => $conversation->userOne->id,
                            'name' => $conversation->userOne->name,
                            'email' => $conversation->userOne->email,
                        ],
                        [
                            'id' => $conversation->userTwo->id,
                            'name' => $conversation->userTwo->name,
                            'email' => $conversation->userTwo->email,
                        ],
                    ],

                    'message' => $conversation->message,

                    'timestamp' => $conversation->updated_at
                        ? $conversation->updated_at->timestamp * 1000
                        : null,
                ];
            });

            return response()->json([
                'conversations' => $data
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching conversation: ' . $e->getMessage());

            return response()->json(['message' => 'Error fetching conversation'], 500);
        }
    }

    // public function update(Request $request, Conversation $conversation)
    // {
    //     $input = $request->all();

    //     $conversation->update([
    //         'message' => $input['message'],
    //     ]);

    //     return response()->json(['message' => 'Conversation updated successfully']);
    // }

    public function update(Request $request, Conversation $conversation)
    {
        $input = $request->all();

        // ✅ Update message
        $conversation->update([
            'message' => $input['message'],
        ]);

        // ✅ Load relationships
        $conversation->load(['userOne:id,name,email', 'userTwo:id,name,email']);

        // ✅ Format SAME response as store()
        $data = [
            'id' => $conversation->id,
            'participants' => $conversation->userOne->email . '-' . $conversation->userTwo->email,
            'users' => [
                [
                    'id' => $conversation->userOne->id,
                    'name' => $conversation->userOne->name,
                    'email' => $conversation->userOne->email,
                ],
                [
                    'id' => $conversation->userTwo->id,
                    'name' => $conversation->userTwo->name,
                    'email' => $conversation->userTwo->email,
                ],
            ],
            'message' => $conversation->message,
            'timestamp' => now()->timestamp * 1000,
        ];

        return response()->json([
            'message' => 'Conversation updated successfully',
            'data' => $data
        ]);
    }
}
