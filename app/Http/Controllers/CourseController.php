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
    $sortBy  = $request->input('sort_by', 'created_at');
    $sortDir = $request->input('sort_dir', 'desc');
    $limit   = (int) $request->input('limit', 10);

    /**
     * Base query for Courses
     */
    $query = Course::query();

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    // apply semester filter if provided
    if ($request->filled('semester')) {
        $query->where('semester', $request->input('semester'));
    }

    // apply user filter if provided
    if ($request->filled('user_id')) {
        $query->where('user_id', $request->input('user_id'));
    }

    // Apply filter for active courses only if provided
    if ($request->filled('is_active')) {
        $isActive = filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN);
        $query->where('is_active', $isActive);
    }

    $allowedSort = ['title', 'created_at'];
    if (!in_array($sortBy, $allowedSort)) {
        $sortBy = 'created_at';
    }

    $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');

    $courses = $query->paginate($limit)->appends($request->query()); // Keeps URL params in pagination links

    $courses->load('user:id,name');

    // user data for dropdown filter
    $users = User::select('id', 'name')->get();


// return $users;
    return Inertia::render('courses/Index', [
        'courses' => $courses,
        'users'   => $users,
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
        $users = User::select('id', 'name')->get();
        return Inertia::render('courses/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|integer',
            'user_id' => 'required|exists:users,id',
            'semester' => 'nullable|string|max:50',
            'is_active' => 'nullable|boolean',
            'image' => 'nullable|image|max:2048',
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
        $users = User::select('id', 'name')->get();
        return Inertia::render('courses/Edit', [
            'course' => $course,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|integer',
            'user_id' => 'required|exists:users,id',
            'semester' => 'nullable|string|max:50',
            'is_active' => 'nullable|boolean',
            'image' => 'nullable|image|max:2048',
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
