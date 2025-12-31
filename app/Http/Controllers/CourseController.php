<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
   public function index(Request $request)
{
    /**
     * Extract filters with sane defaults.
     * These values mirror the frontend filter state.
     */
    $search  = $request->string('search')->toString();
    $sortBy  = $request->input('sort_by', 'semester');
    $sortDir = $request->input('sort_dir', 'asc');
    $limit   = (int) $request->input('limit', 10);

    /**
     * Base query for Courses
     */
    $query = Course::query();

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('code', 'like', "%{$search}%");
        });
    }

    // apply semester filter if provided
    if ($request->filled('semester')) {
        $query->where('semester', $request->input('semester'));
    }




    $allowedSort = ['title', 'code','semester'];
    if (!in_array($sortBy, $allowedSort)) {
        $sortBy = 'semester';
    }

    $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');

    $courses = $query->paginate($limit)->appends($request->query()); // Keeps URL params in pagination links

// return $users;
    return Inertia::render('courses/Index', [
        'courses' => $courses,
        'filters' => [
            'search'   => $search,
            'sort_by'  => $sortBy,
            'sort_dir' => $sortDir,
            'limit'    => $limit,
        ],
    ]);
}




    public function create()
    {
        return Inertia::render('courses/Create', [
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string',
            'credit' => 'required|integer',
            'semester' => 'required',
        ]);

        Course::create($data);

        return redirect()->route('courses.index')->with('success', 'Course created successfully.');
    }

    public function show(Course $course)
    {
        return Inertia::render('courses/Show', [
            'course' => $course,
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('courses/Edit', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
             'code' => 'required|string',
            'credit' => 'required|integer',
            'semester' => 'required',
        ]);

        $course->update($data);

        return redirect()->route('courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
