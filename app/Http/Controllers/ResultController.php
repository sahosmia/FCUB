<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Student + Admin
     * List results
     */
    public function index()
    {
        $results = Result::get();
        return Inertia::render('results/Index', [
            'results' => $results,
        ]);
    }

    /**
     * Admin only
     * Show create form
     */
    public function create()
    {
        $this->authorizeAdmin();

        return Inertia::render('results/Create');
    }

    /**
     * Admin only
     * Store result PDF
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'file'  => 'required|file|mimes:pdf|max:5120',
        ]);

        $data['file_path'] = $request->file('file')->store('results', 'public');

        Result::create($data);

        return redirect()
            ->route('results.index')
            ->with('success', 'Result uploaded successfully.');
    }

    /**
     * Admin only
     * Show edit form
     */
    public function edit(Result $result)
    {
        $this->authorizeAdmin();

        return Inertia::render('results/Edit', [
            'result' => $result,
        ]);
    }

    /**
     * Admin only
     * Update result
     */
    public function update(Request $request, Result $result)
    {
        $this->authorizeAdmin();

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'file'  => 'nullable|file|mimes:pdf|max:5120',
        ]);

        if ($request->hasFile('file')) {
            $this->deleteFile($result);
            $data['file_path'] = $request->file('file')->store('results', 'public');
        }

        $result->update($data);

        return redirect()
            ->route('results.index')
            ->with('success', 'Result updated successfully.');
    }

    /**
     * Admin only
     * Delete result
     */
    public function destroy(Result $result)
    {
        $this->authorizeAdmin();

        $this->deleteFile($result);
        $result->delete();

        return redirect()
            ->route('results.index')
            ->with('success', 'Result deleted successfully.');
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

    private function deleteFile(Result $result): void
    {
        if ($result->file_path) {
            Storage::disk('public')->delete($result->file_path);
        }
    }
}
