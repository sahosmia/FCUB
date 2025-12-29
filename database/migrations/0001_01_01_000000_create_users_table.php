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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'student'])->default('student');
            $table->string('phone')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('date_of_birth')->nullable();
            $table->decimal('course_fee', 10, 2)->nullable();
            $table->decimal('paid_fee', 10, 2)->nullable();
            $table->decimal('due_fee', 10, 2)->nullable();
            $table->foreignId('batch_id')->nullable()->constrained('batches')->onDelete('set null');
            $table->string('session')->nullable();
            $table->string('admission_document')->nullable();
            $table->decimal('admission_fee', 10, 2)->nullable();
            $table->string('student_id')->unique()->nullable();
            $table->string('semester') ->default('1');
            $table->boolean('status')->default(true);

             // Basic Info
            $table->string('home_phone')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('national_id')->nullable();

            // Parents Info
            $table->string('father_name')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('parents_phone')->nullable();

            // Present Address
            $table->text('present_address')->nullable();
            $table->string('present_thana')->nullable();
            $table->string('present_post_code')->nullable();
            $table->string('present_district')->nullable();
            $table->string('present_country')->nullable();

            // Permanent Address
            $table->text('permanent_address')->nullable();
            $table->string('permanent_thana')->nullable();
            $table->string('permanent_post_code')->nullable();
            $table->string('permanent_district')->nullable();
            $table->string('permanent_country')->nullable();

            // SSC / Equivalent
            $table->string('ssc_exam_name')->nullable();
            $table->string('ssc_group')->nullable();
            $table->decimal('ssc_result', 4, 2)->nullable();
            $table->year('ssc_passing_year')->nullable();
            $table->string('ssc_institute')->nullable();
            $table->string('ssc_board')->nullable();

            // HSC / Equivalent
            $table->string('hsc_exam_name')->nullable();
            $table->string('hsc_group')->nullable();
            $table->decimal('hsc_result', 4, 2)->nullable();
            $table->year('hsc_passing_year')->nullable();
            $table->string('hsc_institute')->nullable();
            $table->string('hsc_board')->nullable();


            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
