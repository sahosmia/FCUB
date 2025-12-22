<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
    {
    $search  = $request->string('search')->toString();
    $limit   = (int) $request->input('limit', 10);

    $query = Batch::query();

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%");
        });
    }
    $batches = $query->paginate($limit)->appends($request->query());

    return inertia('batches/Index', [
        'batches' => $batches,
        'filters' => [
            'search'   => $search,
            'limit'    => $limit,
        ],
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */

    public function create()
    {
        return Inertia::render('batches/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Batch::create($data);
        return redirect()->route('batches.index')->with('success', 'Batch created successfully.');;
    }

    public function show(Batch $batch)
    {

        return Inertia::render('batches/Show', [
            'batch' => $batch,
        ]);
    }

    public function edit(Batch $batch)
    {
        return Inertia::render('batches/Edit', [
            'batch' => $batch,
        ]);
    }

    public function update(Request $request, Batch $batch)
    {
        $data = $request->validate([
'title' => 'required|string|max:255|unique:batches,title,' . $batch->id,        ]);



        $batch->update($data);
        return redirect()->route('batches.index')->with('success', 'Batch updated successfully.');
    }

    public function destroy(Batch $batch)
    {
        $batch->delete();
        return redirect()->route('batches.index')->with('success', 'Batch deleted successfully.');
    }
}
