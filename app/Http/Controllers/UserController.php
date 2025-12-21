<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UserController extends Controller
{
   public function index(Request $request)
{
   
    $search  = $request->string('search')->toString();
    $sortBy  = $request->input('sort_by', 'created_at');
    $sortDir = $request->input('sort_dir', 'desc');
    $limit   = (int) $request->input('limit', 10);

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
        ]);

        User::create($data);

        return redirect()->route('users.index');
    }

    public function show(User $user)
    {

        return Inertia::render('users/Show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/Edit', [
            'user' => $user,
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
        ]);

        if (empty($data['password'])) {
            unset($data['password']);
        }
        
        $user->update($data);

        return redirect()->route('users.index');
    }

    public function destroy(User $users)
    {
        $users->delete();
        return redirect()->route('users.index');
    }
}
