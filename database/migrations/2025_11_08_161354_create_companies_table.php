<?php

use App\Models\Company;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->text('description')->nullable();
            $table->date('applied_on')->nullable();
            $table->tinyInteger('applied_status')->default(Company::APPLIED_STATUS_PENDING)->comment('Pending 1: Interested, 2: Applied, 3: Interviewing, 4: Offered, 5: Rejected'); //
            $table->string('applied_position')->nullable();
            $table->string('applied_via')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
