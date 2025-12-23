<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
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

        $query = User::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        if ($request->filled('status')) {
            $isActive = filter_var($request->input('status'), FILTER_VALIDATE_BOOLEAN);
            $query->where('status', $isActive);
        }

        $allowedSort = ['name', 'created_at'];
        if (!in_array($sortBy, $allowedSort)) {
            $sortBy = 'created_at';
        }

        $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');

        $users = $query->paginate($limit)->appends($request->query());

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

    public function store(UserRequest $request)
    {
        $data = $request->validated();

        $data['status'] = false; // Default to pending
        $data['due_fee'] = ($data['course_fee'] + $data['admission_fee']) - ($data['paid_fee'] ?? 0);

        if ($request->hasFile('admission_document')) {
            $data['admission_document'] = $request->file('admission_document')->store('documents', 'public');
        }

        User::create($data);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        return Inertia::render('users/Show', [
            'user' => $user->load('batch'),
            'payments' => $user->payments()->orderBy('payment_date', 'desc')->paginate(10),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/Edit', [
            'user' => $user,
            'batches' => Batch::all(),
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();

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

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->admission_document) {
            Storage::disk('public')->delete($user->admission_document);
        }
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function approve(User $user)
    {
        $user->update(['status' => true]);
        return redirect()->route('users.index')->with('success', 'User approved successfully.');
    }
}
