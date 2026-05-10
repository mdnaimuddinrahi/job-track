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
        Schema::create('expenses', function (Blueprint $table) {
             // Primary Key
            $table->id()->comment('Primary key: Unique expense ID');

            // Name of the expense/income source
            $table->string('name')
                  ->comment('Name or title of the expense or income source');

            // Type: income or expense
            $table->enum('type', ['income', 'expense'])
                  ->comment('Type of transaction: income or expense');

            // Amount value
            $table->decimal('amount', 12, 2)
                  ->comment('Transaction amount');

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
        Schema::dropIfExists('expenses');
    }
};
