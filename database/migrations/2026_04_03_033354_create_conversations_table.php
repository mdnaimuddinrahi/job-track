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
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            // Users
            $table->unsignedBigInteger('user_one_id')->comment('First user');
            $table->unsignedBigInteger('user_two_id')->comment('Second user');
            $table->unique(['user_one_id', 'user_two_id'], 'unique_conversation');
            
            $table->text('message')->nullable();

             // Using DATETIME instead of timestamps()
            $table->dateTime('created_at')
                  ->useCurrent()
                  ->comment('Record creation time');

            $table->dateTime('updated_at')
                  ->useCurrent()
                  ->useCurrentOnUpdate()
                  ->comment('Last update time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
