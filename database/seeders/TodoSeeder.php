<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    public function run(): void
    {
        
        // --- IGNORE ---
        (new \App\Models\Todo())->newTodo('Buy groceries', \App\Models\Todo::COLOR_RED);
        (new \App\Models\Todo())->newTodo('Call mom', \App\Models\Todo::COLOR_GREEN);
        (new \App\Models\Todo())->newTodo('Walk the dog', \App\Models\Todo::COLOR_YELLOW);
        (new \App\Models\Todo())->newTodo('Read a book', \App\Models\Todo::COLOR_GREEN);
        (new \App\Models\Todo())->newTodo('Go for a run', \App\Models\Todo::COLOR_RED);
        
    }
}
