<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
use Illuminate\Container\Attributes\DB;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    
    public function run(): void
    {
        $courses = [
            // Semester 1
            ['title' => 'Introduction to Computer Systems', 'code' => 'CSE-111', 'credit' => '3.00', 'semester' => 1],
            ['title' => 'Electrical Circuits', 'code' => 'EEE-111', 'credit' => '3.00', 'semester' => 1],
            ['title' => 'Electrical Circuits Lab', 'code' => 'EEE-112', 'credit' => '1.00', 'semester' => 1],
            ['title' => 'Physics-I', 'code' => 'PHY-111', 'credit' => '2.00', 'semester' => 1],
            ['title' => 'Linear Algebra & Co-ordinate Geometry', 'code' => 'MATH-111', 'credit' => '3.00', 'semester' => 1],
            ['title' => 'Principles of Accounting', 'code' => 'GED-111', 'credit' => '2.00', 'semester' => 1],
            ['title' => 'Bangladesh Studies', 'code' => 'GED-112', 'credit' => '2.00', 'semester' => 1],
            ['title' => 'Functional Bengali language', 'code' => 'BANG-111', 'credit' => '2.00', 'semester' => 1],

            // Semester 2
            ['title' => 'Structured Programming Using C', 'code' => 'CSE-121', 'credit' => '3.00', 'semester' => 2],
            ['title' => 'Structured Programming Using C Lab', 'code' => 'CSE-122', 'credit' => '1.00', 'semester' => 2],
            ['title' => 'Chemistry', 'code' => 'CHEM-121', 'credit' => '2.00', 'semester' => 2],
            ['title' => 'Chemistry Lab', 'code' => 'CHEM-122', 'credit' => '1.00', 'semester' => 2],
            ['title' => 'Electronic Device & Circuits', 'code' => 'EEE-121', 'credit' => '3.00', 'semester' => 2],
            ['title' => 'Electronic Device & Circuits lab', 'code' => 'EEE-122', 'credit' => '1.00', 'semester' => 2],
            ['title' => 'Physics- II', 'code' => 'PHY-121', 'credit' => '1.00', 'semester' => 2],
            ['title' => 'Physics- II Lab', 'code' => 'PHY-122', 'credit' => '1.00', 'semester' => 2],
            ['title' => 'Differential and Integral Calculus', 'code' => 'MATH-121', 'credit' => '3.00', 'semester' => 2],
            ['title' => 'Basic English', 'code' => 'ENG-121', 'credit' => '2.00', 'semester' => 2],
            ['title' => 'Viva Voce', 'code' => 'CSE-125', 'credit' => '1.00', 'semester' => 2],

            // Semester 3
            ['title' => 'Data Structures', 'code' => 'CSE-211', 'credit' => '3.00', 'semester' => 3],
            ['title' => 'Data Structures Lab', 'code' => 'CSE-212', 'credit' => '1.00', 'semester' => 3],
            ['title' => 'Discrete Mathematics', 'code' => 'CSE-213', 'credit' => '3.00', 'semester' => 3],
            ['title' => 'Digital Logic Design', 'code' => 'CSE-214', 'credit' => '3.00', 'semester' => 3],
            ['title' => 'Digital Logic Design Lab', 'code' => 'CSE-215', 'credit' => '1.00', 'semester' => 3],
            ['title' => 'Engineering Drawing', 'code' => 'ED-211', 'credit' => '1.00', 'semester' => 3],
            ['title' => 'Engineering Drawing Lab', 'code' => 'ED-212', 'credit' => '1.00', 'semester' => 3],
            ['title' => 'Statistical Methods & Probability', 'code' => 'MATH-211', 'credit' => '3.00', 'semester' => 3],
            ['title' => 'Communicative English', 'code' => 'ENG-211', 'credit' => '2.00', 'semester' => 3],
            ['title' => 'Principles of Economics', 'code' => 'GED-211', 'credit' => '1.00', 'semester' => 3],

            // Semester 4
            ['title' => 'Object Oriented Programming', 'code' => 'CSE-221', 'credit' => '3.00', 'semester' => 4],
            ['title' => 'Object Oriented Programming Lab', 'code' => 'CSE-222', 'credit' => '1.00', 'semester' => 4],
            ['title' => 'Algorithm Design and Analysis', 'code' => 'CSE-223', 'credit' => '3.00', 'semester' => 4],
            ['title' => 'Algorithm Design and Analysis Lab', 'code' => 'CSE-224', 'credit' => '1.00', 'semester' => 4],
            ['title' => 'Numerical Methods', 'code' => 'CSE-225', 'credit' => '2.00', 'semester' => 4],
            ['title' => 'Computer Organization & Architecture', 'code' => 'CSE-226', 'credit' => '3.00', 'semester' => 4],
            ['title' => 'Differential Equations & Vector Analysis', 'code' => 'MATH-221', 'credit' => '3.00', 'semester' => 4],
            ['title' => 'Law & Ethics in Engineering Practice', 'code' => 'GED-221', 'credit' => '1.00', 'semester' => 4],
            ['title' => 'Viva Voce', 'code' => 'CSE-227', 'credit' => '1.00', 'semester' => 4],

            // Semester 5
            ['title' => 'Data and Telecommunication', 'code' => 'CSE-312', 'credit' => '3.00', 'semester' => 5],
            ['title' => 'Microprocessor, Microcontroller and Assembly Language', 'code' => 'CSE-313', 'credit' => '3.00', 'semester' => 5],
            ['title' => 'Microprocessor, Microcontroller and Assembly Language Lab', 'code' => 'CSE-314', 'credit' => '1.00', 'semester' => 5],
            ['title' => 'Database Management Systems', 'code' => 'CSE-315', 'credit' => '3.00', 'semester' => 5],
            ['title' => 'Database Management Systems Lab', 'code' => 'CSE-316', 'credit' => '1.00', 'semester' => 5],
            ['title' => 'Principles of Management', 'code' => 'GED-311', 'credit' => '2.00', 'semester' => 5],
            ['title' => 'Social History and World Civilization', 'code' => 'GED-312', 'credit' => '1.00', 'semester' => 5],

            // Semester 6
            ['title' => 'Operating Systems', 'code' => 'CSE-321', 'credit' => '3.00', 'semester' => 6],
            ['title' => 'Operating Systems Lab', 'code' => 'CSE-322', 'credit' => '1.00', 'semester' => 6],
            ['title' => 'Computer Networks', 'code' => 'CSE-323', 'credit' => '3.00', 'semester' => 6],
            ['title' => 'Computer Networks Lab', 'code' => 'CSE-324', 'credit' => '1.00', 'semester' => 6],
            ['title' => 'Software Engineering', 'code' => 'CSE-325', 'credit' => '3.00', 'semester' => 6],
            ['title' => 'Software Engineering Lab', 'code' => 'CSE-326', 'credit' => '1.00', 'semester' => 6],
            ['title' => 'Compiler Design', 'code' => 'CSE-327', 'credit' => '3.00', 'semester' => 6],
            ['title' => 'Compiler Design Lab', 'code' => 'CSE-328', 'credit' => '1.00', 'semester' => 6],
            ['title' => 'Viva Voce', 'code' => 'CSE-330', 'credit' => '1.00', 'semester' => 6],

            // Semester 7
            ['title' => 'Digital Signal Processing', 'code' => 'CSE-411', 'credit' => '3.00', 'semester' => 7],
            ['title' => 'Digital Signal Processing Lab', 'code' => 'CSE-412', 'credit' => '1.00', 'semester' => 7],
            ['title' => 'Computer Graphics', 'code' => 'CSE-413', 'credit' => '3.00', 'semester' => 7],
            ['title' => 'Computer Graphics Lab', 'code' => 'CSE-414', 'credit' => '1.00', 'semester' => 7],
            ['title' => 'Artificial Intelligence', 'code' => 'CSE-415', 'credit' => '3.00', 'semester' => 7],
            ['title' => 'Artificial Intelligence Lab', 'code' => 'CSE-416', 'credit' => '1.00', 'semester' => 7],
            ['title' => 'E-Commerce and Web Engineering', 'code' => 'CSE-417', 'credit' => '3.00', 'semester' => 7],
            ['title' => 'E-Commerce and Web Engineering Lab', 'code' => 'CSE-418', 'credit' => '1.00', 'semester' => 7],

            // Semester 8
            ['title' => 'Digital Image Processing', 'code' => 'CSE-421', 'credit' => '3.00', 'semester' => 8],
            ['title' => 'Digital Image Processing Lab', 'code' => 'CSE-422', 'credit' => '1.00', 'semester' => 8],
            ['title' => 'Mobile Application development', 'code' => 'CSE-423', 'credit' => '3.00', 'semester' => 8],
            ['title' => 'Mobile Application development Lab', 'code' => 'CSE-424', 'credit' => '1.00', 'semester' => 8],
            ['title' => 'Project Work', 'code' => 'CSE-428', 'credit' => '4.00', 'semester' => 8],
            ['title' => 'Field work and Industrial Tour', 'code' => 'CSE-429', 'credit' => '1.00', 'semester' => 8],
            ['title' => 'Viva - Voce', 'code' => 'CSE-430', 'credit' => '1.00', 'semester' => 8],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
}
