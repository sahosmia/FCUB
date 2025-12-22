<?php
 namespace Database\Seeders;

    use Illuminate\Database\Seeder;
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;

    class UserSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {

            

            User::create([
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => true,
                'gender' => 'male',
                'date_of_birth' => '2000-01-01',
                'phone' => '0123456789',

            ]);
            User::create([
                'name' => 'Student User',
                'email' => 'student@gmail.com',
                'password' => Hash::make('password'),
                'gender' => 'male',
                'date_of_birth' => '2000-01-01',
                'phone' => '0123456789',
                'course_fee' => 1000.00,
                'paid_fee' => 500.00,
                'due_fee' => 500.00,
                'batch_id' => 3,
                'session' => '2022-2023',
                'admission_document' => 'document.pdf',
                'admission_fee' => 100.00,
                'student_id' => 'STU2022001',
                'role' => 'student',
                'status' => true,
            ]);

            User::create([
                'name' => 'Student User 2',
                'email' => 'student2@gmail.com',
                'password' => Hash::make('password'),
                'gender' => 'female',
                'date_of_birth' => '2001-01-01',
                'phone' => '0123456788',
                'course_fee' => 1000.00,
                'paid_fee' => 500.00,
                'due_fee' => 500.00,
                'batch_id' => 2,
                'session' => '2022-2023',
                'admission_document' => 'document.pdf',
                'admission_fee' => 100.00,
                'student_id' => 'STU2022002',
                'role' => 'student',
                'status' => true,
            ]);

            User::create([
                'name' => 'Student User 3',
                'email' => 'student3@gmail.com',
                'password' => Hash::make('password'),
                'gender' => 'male',
                'date_of_birth' => '2002-01-01',
                'phone' => '0123456787',
                'course_fee' => 1000.00,
                'paid_fee' => 500.00,
                'due_fee' => 500.00,
                'batch_id' => 1,
                'session' => '2022-2023',
                'admission_document' => 'document.pdf',
                'admission_fee' => 100.00,
                'student_id' => 'STU2022003',
                'role' => 'student',
                'status' => true,
            ]);

            User::factory()->count(20)->create();

        }
    }
