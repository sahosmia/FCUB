<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RoutineController extends Controller
{
    /**
     * Student + Admin
     * Show all routines
     */
    public function index()
    {
        $routines = Routine::latest()->get()->map(function ($routine) {
            return [
                'id' => $routine->id,
                'title' => $routine->title,
                'file_path' => $routine->file_path,
                'created_at' => $routine->created_at->format('d M Y'),
            ];
        });

        return Inertia::render('routines/Index', [
            'routines' => $routines,
            'isAdmin' => auth()->user()->role === 'admin',
        ]);
    }

    /**
     * Admin only
     * Show upload form
     */
   public function create()
    {
        return Inertia::render('routines/Create');
    }


    /**
     * Admin only
     * Store routine PDF
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file'  => 'required|file|mimes:pdf|max:5120', // 5MB
        ]);

        // Store PDF
        $path = $request->file('file')->store('routines', 'public');

        Routine::create([
            'title' => $request->title,
            'file_path' => $path,
        ]);

        return redirect()
            ->route('routines.index')
            ->with('success', 'Routine uploaded successfully.');
    }
}
