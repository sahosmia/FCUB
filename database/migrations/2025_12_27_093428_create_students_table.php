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
        Schema::create('students', function (Blueprint $table) {
            $table->id();


            // PERSONAL
            $table->string('mobile')->nullable();
            $table->string('home_phone')->nullable();
            $table->string('gender')->nullable();
            $table->date('dob')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('national_id')->nullable();

            // PARENTS
            $table->string('father_name')->nullable();
            $table->string('father_occupation')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->string('parents_phone')->nullable();

            // ADDRESS
            $table->string('present_address')->nullable();
            $table->string('present_thana')->nullable();
            $table->string('present_district')->nullable();
            $table->string('present_country')->nullable();

            $table->string('permanent_address')->nullable();
            $table->string('permanent_thana')->nullable();
            $table->string('permanent_district')->nullable();
            $table->string('permanent_country')->nullable();

            // EDUCATION (SSC)
            $table->string('ssc_exam')->nullable();
            $table->string('ssc_group')->nullable();
            $table->string('ssc_result')->nullable();
            $table->string('ssc_year')->nullable();
            $table->string('ssc_institute')->nullable();
            $table->string('ssc_board')->nullable();

            // EDUCATION (HSC)
            $table->string('hsc_exam')->nullable();
            $table->string('hsc_group')->nullable();
            $table->string('hsc_result')->nullable();
            $table->string('hsc_year')->nullable();
            $table->string('hsc_institute')->nullable();
            $table->string('hsc_board')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
