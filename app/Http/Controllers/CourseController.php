<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
    $sortBy  = $request->input('sort_by', 'created_at');
    $sortDir = $request->input('sort_dir', 'desc');
    $limit   = (int) $request->input('limit', 10);

    /**
     * Base query for Courses
     */
    $query = Course::query();

    /**
     * Apply search filter (title + description)
     */
    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    /**
     * Apply safe sorting
     * (Prevents user from sorting by unexpected columns)
     */
    $allowedSort = ['title', 'created_at'];
    if (!in_array($sortBy, $allowedSort)) {
        $sortBy = 'created_at';
    }

    $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');

    /**
     * Execute paginated result
     */
    $courses = $query->paginate($limit)
                     ->appends($request->query()); // Keeps URL params in pagination links

    /**
     * Send response to Inertia page
     */
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
        return Inertia::render('courses/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|integer',
        ]);

        Course::create($data);

        return redirect()->route('courses.index');
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
            'description' => 'nullable|string',
            'duration' => 'nullable|integer',
        ]);

        $course->update($data);

        return redirect()->route('courses.index');
    }

    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('courses.index');
    }
}
