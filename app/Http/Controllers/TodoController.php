<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['status', 'color']);
        $todos = (new Todo())->getTodoList($filters);

        return response()->json($todos);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        $input = $request->validated();
        $todo = (new Todo())->newTodo($input['text'], $input['color'] ?? 0);

        return response()->json($todo, 201);

    }

    public function update(UpdateTodoRequest $request, $todoId)
    {
        $input = $request->validated();
        $todo = Todo::updateTodo($todoId, $input);

        return response()->json(['data' => $todo]);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json(['message' => 'deleted successs', ['data' => $todo]], 204);
    }

    public function completeAll()
    {
        (new Todo())->completeAllTodos();
        return response()->json(['message' => 'All todos marked as completed']);
    }

    public function clearCompleted()
    {
        (new Todo())->deleteCompletedTodos();
        return response()->json(['message' => 'All completed todos deleted']);
    }
}
