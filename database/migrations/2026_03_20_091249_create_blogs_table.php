<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id()->comment('Primary key: Unique blog ID');
            
            $table->string('title')
                    ->comment('Title of the blog post');

            $table->text('description')
                    ->nullable()
                    ->comment('Full description/content of the blog post');

            $table->string('image', 500)
                    ->nullable()
                    ->comment('URL or path of the blog image');
            
            $table->json('tags')
                    ->nullable()
                    ->comment('JSON array of tags associated with the blog');
            
            $table->unsignedInteger('likes')
                    ->default(0)
                    ->comment('Number of likes for the blog post');

            $table->boolean('is_saved')
                    ->default(false)
                    ->comment('Global saved/bookmarked flag (0 = false, 1 = true)');

            $table->dateTime('created_at')
                  ->useCurrent()
                  ->comment('Record creation time');

            $table->dateTime('updated_at')
                  ->useCurrent()
                  ->useCurrentOnUpdate()
                  ->comment('Last update time');

            // Indexes
            $table->index('title', 'idx_blogs_title');
             // Using DATETIME instead of timestamps()
            $table->comment('Stores Blogs content metadata');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
