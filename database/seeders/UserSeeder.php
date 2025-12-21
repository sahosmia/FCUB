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
            ]);
            User::create([
                'name' => 'Student User',
                'email' => 'student@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => true,
            ]);
            // make 10 test users with role student
            User::factory()->count(10)->create([
                'role' => 'student',
                'status' => true,
            ]);
        }
    }
