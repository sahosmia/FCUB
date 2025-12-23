<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Batch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        $limit = (int) $request->input('limit', 10);

        /**
         * Base query for Users
         *
         */
        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // apply semester filter if provided
        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }



        // Apply filter for active users only if provided
        if ($request->filled('status')) {
            $isActive = filter_var($request->input('status'), FILTER_VALIDATE_BOOLEAN);
            $query->where('status', $isActive);
        }

        $allowedSort = ['name', 'created_at'];
        if (!in_array($sortBy, $allowedSort)) {
            $sortBy = 'created_at';
        }

        $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');

        $users = $query->paginate($limit)->appends($request->query()); // Keeps URL params in pagination links

        return Inertia::render('users/Index', [
            'users' => $users,
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
        return Inertia::render('users/Create', [
            'batches' => Batch::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:admin,student',
            'status' => 'nullable|boolean',
            'phone' => 'nullable|string|max:20',
            'gender' => 'nullable|string|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'course_fee' => 'nullable|numeric',
            'paid_fee' => 'nullable|numeric',
            'due_fee' => 'nullable|numeric',
            'batch_id' => 'nullable|exists:batches,id',
            'session' => 'nullable|string|max:255',
            'admission_document' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'admission_fee' => 'nullable|numeric',
            'student_id' => 'nullable|string|unique:users,student_id',
        ]);

        if ($request->hasFile('admission_document')) {
            $data['admission_document'] = $request->file('admission_document')->store('documents', 'public');
        }

        User::create($data);

        return redirect()->route('users.index');
    }

    public function show(User $user)
    {

        return Inertia::render('users/Show', [
            'user' => $user->load('batch'),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/Edit', [
            'user' => $user,
            'batches' => Batch::all(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string|in:admin,student',
            'status' => 'nullable|boolean',
            'phone' => 'nullable|string|max:20',
            'gender' => 'nullable|string|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'course_fee' => 'nullable|numeric',
            'paid_fee' => 'nullable|numeric',
            'due_fee' => 'nullable|numeric',
            'batch_id' => 'nullable|exists:batches,id',
            'session' => 'nullable|string|max:255',
            'admission_document' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'admission_fee' => 'nullable|numeric',
            'student_id' => 'nullable|string|unique:users,student_id,' . $user->id,
        ]);

        if (empty($data['password'])) {
            unset($data['password']);
        }
        
        if ($request->hasFile('admission_document')) {
            if ($user->admission_document) {
                Storage::disk('public')->delete($user->admission_document);
            }
            $data['admission_document'] = $request->file('admission_document')->store('documents', 'public');
        }

        $user->update($data);

        return redirect()->route('users.index');
    }

    public function destroy(User $users)
    {
        if ($users->admission_document) {
            Storage::disk('public')->delete($users->admission_document);
        }
        $users->delete();
        return redirect()->route('users.index');
    }
}
