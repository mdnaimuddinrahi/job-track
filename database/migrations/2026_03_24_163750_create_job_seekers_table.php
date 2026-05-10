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
        Schema::create('job_seekers', function (Blueprint $table) {
            $table->id()
                  ->comment('Primary key: unique job ID');
            
            $table->string('title')
                  ->comment('Job title')
                  ->index();
            
            $table->string('type')
                  ->comment('Job type, e.g., Internship, Full-time');
            
            $table->decimal('salary', 12, 2)
                  ->comment('Salary offered for the job');
            
            $table->date('deadline')
                  ->comment('Application deadline');
            
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
        Schema::dropIfExists('job_seekers');
    }
};
