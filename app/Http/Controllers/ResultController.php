<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Result;

class ResultController extends Controller
{
    /**
     * Student + Admin
     * Show all results
     */
    public function index()
    {
        $results = Result::latest()->get()->map(function ($result) {
            return [
                'id' => $result->id,
                'title' => $result->title,
                'file_path' => $result->file_path,
                'created_at' => $result->created_at->format('d M Y'),
            ];
        });

        return Inertia::render('results/Index', [
            'results' => $results,
            'isAdmin' => auth()->user()->role === 'admin',
        ]);
    }

    /**
     * Admin only
     * Show upload form
     */
   public function create()
    {
        return Inertia::render('results/Create');
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
        $path = $request->file('file')->store('results', 'public');

        Result::create([
            'title' => $request->title,
            'file_path' => $path,
        ]);

        return redirect()
            ->route('routines.index')
            ->with('success', 'Routine uploaded successfully.');
    }
}
