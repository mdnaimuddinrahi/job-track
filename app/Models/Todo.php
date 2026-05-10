<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        'text',
        'completed',
        'color',
    ];
    const COLOR_DEFAULT = 0;
    const COLOR_RED = 1;
    const COLOR_GREEN = 2;
    const COLOR_YELLOW = 3;
    const COMPLETED = 1;
    const NOT_COMPLETED = 0;

    public static function colorList(): array {
        return [
            self::COLOR_DEFAULT => '',
            self::COLOR_RED => 'red',
            self::COLOR_GREEN => 'green',
            self::COLOR_YELLOW => 'yellow',
        ];
    }

    public function newTodo($text, $color = self::COLOR_DEFAULT)
    {
        return self::create([
            'text' => $text,
            'color' => $color,
            'completed' => self::NOT_COMPLETED,
        ]);
    }

    public function getTodoList(array $filters = [])
    {
        $query = self::query();

        if (isset($filters['completed'])) {
            $query->where('completed', $filters['completed']);
        }

        if (isset($filters['color'])) {
            $query->where('color', $filters['color']);
        }
        $query->select(['id', 'text', 'color', 'completed']);

        return $query->get();
    }

    public function getColorAttribute($value)
    {
        return self::colorList()[$value] ?? '';
    }

    public function setColorAttribute($value)
    {
        $colors = array_flip(self::colorList());
        $this->attributes['color'] = $colors[$value] ?? self::COLOR_DEFAULT;
    }

    public function completeAllTodos()
    {
        return self::query()->update(['completed' => self::COMPLETED]);
    }

    public function deleteCompletedTodos()
    {
        return self::query()->where('completed', self::COMPLETED)->delete();
    }

    public static function updateTodo(int $todoId, array $input): self
    {
        $todo = Todo::findOrFail($todoId);
        $todo->update($input);
        return $todo;
    }

    
}
