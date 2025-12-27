<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoutineController extends Controller
{
    /**
     * Student + Admin
     * List routines
     */
    public function index()
    {
        $routines = Routine::get();
        return Inertia::render('routines/Index', [
            'routines' => $routines,
        ]);
    }

    /**
     * Admin only
     * Show create form
     */
    public function create()
    {
        $this->authorizeAdmin();

        return Inertia::render('routines/Create');
    }

    /**
     * Admin only
     * Store routines PDF
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'file'  => 'required|file|mimes:pdf|max:5120',
        ]);

        $data['file_path'] = $request->file('file')->store('routines', 'public');

        Routine::create($data);

        return redirect()
            ->route('routines.index')
            ->with('success', 'Routine uploaded successfully.');
    }

    /**
     * Admin only
     * Show edit form
     */
    public function edit(Routine $routine)
    {
        $this->authorizeAdmin();

        return Inertia::render('routines/Edit', [
            'routine' => $routine,
        ]);
    }

    /**
     * Admin only
     * Update routine
     */
    public function update(Request $request, Routine $routine)
    {
        $this->authorizeAdmin();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'file'  => 'nullable|file|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $this->deleteFile($routine);
            $data['file_path'] = $request->file('file')->store('routines', 'public');
        }

        $routine->update($data);

        return redirect()
            ->route('routines.index')
            ->with('success', 'Routine updated successfully.');
    }

    /**
     * Admin only
     * Delete routine
     */
    public function destroy(Routine $routine)
    {
        $this->authorizeAdmin();

        $this->deleteFile($routine);
        $routine->delete();

        return redirect()
            ->route('routines.index')
            ->with('success', 'Routine deleted successfully.');
    }



    /**
     * -------------------
     * Helper methods
     * -------------------
     */

    private function authorizeAdmin(): void
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }
    }

    private function deleteFile(Routine $routine): void
    {
        if ($routine->file_path) {
            Storage::disk('public')->delete($routine->file_path);
        }
    }
}
