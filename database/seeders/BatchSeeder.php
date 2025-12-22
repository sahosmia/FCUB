<?php
 namespace Database\Seeders;

use App\Models\Batch;
use Illuminate\Database\Seeder;
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;

    class BatchSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {
            // make 22 to 32 batches
            for ($i = 22; $i <= 32; $i++) {
                Batch::create([
                    'title' => $i . 'th Batch',
                ]);
            }
            
        }
    }
