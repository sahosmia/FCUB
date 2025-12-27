<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display all students
     */
    public function index()
    {
        return Inertia::render('students/Index', [
            'students' => Student::with('batch')->latest()->get(),
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('students/Create', [
            'batches' => Batch::all(),
        ]);
    }

    /**
     * Store student data
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:students,email',
            'phone'    => 'required|string|max:20',
            'batch_id' => 'required|exists:batches,id',
        ]);

        Student::create($request->only([
            'name',
            'email',
            'phone',
            'batch_id',
        ]));

        return redirect()->route('students.index')
            ->with('success', 'Student added successfully');
    }

    /**
     * Show single student profile
     */
    public function show(Student $student)
    {
        $student->load([
            'batch',
            'presentAddress',
            'permanentAddress',
            'educations',
        ]);

        return Inertia::render('students/Show', [
            'student' => $student,
        ]);
    }

    /**
     * Delete student
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->back()
            ->with('success', 'Student deleted successfully');
    }
}
