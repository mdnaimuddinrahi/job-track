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
        Schema::create('videos', function (Blueprint $table) {
            $table->id()->comment('Primary key');

            $table->string('title', 255)
                  ->comment('Video title');

            $table->text('description')
                  ->nullable()
                  ->comment('Video description');

            $table->string('author', 100)
                  ->index()
                  ->comment('Author name');

            $table->string('avatar', 300)
                  ->nullable()
                  ->comment('Author avatar URL');

            $table->date('published_at')
                  ->nullable()
                  ->index()
                  ->comment('Original publish date');

            $table->unsignedInteger('duration_seconds')
                  ->nullable()
                  ->comment('Video duration in seconds');

            $table->unsignedBigInteger('views')
                  ->default(0)
                  ->index()
                  ->comment('Total view count');

            $table->string('video_url')
                  ->comment('Video embed or source URL');

            $table->string('thumbnail')
                  ->nullable()
                  ->comment('Thumbnail image URL');

            $table->json('tags')
                  ->nullable()
                  ->comment('Tags in JSON format');

            $table->unsignedInteger('likes')
                  ->default(0)
                  ->comment('Total likes');

            $table->unsignedInteger('unlikes')
                  ->default(0)
                  ->comment('Total unlikes');

            // Using DATETIME instead of timestamps()
            $table->dateTime('created_at')
                  ->useCurrent()
                  ->comment('Record creation time');

            $table->dateTime('updated_at')
                  ->useCurrent()
                  ->useCurrentOnUpdate()
                  ->comment('Last update time');

            // 🔥 Composite Indexes (important for performance)
            $table->index(['author', 'published_at'], 'idx_author_published');
            $table->index(['views', 'published_at'], 'idx_views_published');

            // 🔍 Full-text search
            $table->fullText(['title', 'description'], 'ft_title_description');
            $table->comment('Stores video content metadata');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
