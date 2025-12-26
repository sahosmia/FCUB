<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{



    public function index(Request $request)
    {

        $search = $request->string('search')->toString();
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        $limit = (int) $request->input('limit', 10);

        $user = Auth::user();
        $query = Payment::with('user');

        if ($user->role == "student") {
            $query->where('user_id', $user->id);
        }

        if ($search) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('student_id', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc');
        $payments = $query->paginate($limit)->appends($request->query());

        return Inertia::render('payments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search', 'sort_by', 'sort_dir', 'limit'])
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name')->get();
        return Inertia::render('payments/Create', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Base validation
        $rules = [
            'amount' => 'required|numeric|min:0',
            'receipt' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'payment_date' => 'required|date',
        ];

        // Admin হলে user_id required
        if ($user->role === 'admin') {
            $rules['user_id'] = 'required|exists:users,id';
        }

        $data = $request->validate($rules);

        // Receipt upload
        if ($request->hasFile('receipt')) {
            $data['receipt'] = $request->file('receipt')
                ->store('receipts', 'public');
        }

        if ($user->role === 'student') {
            $data['user_id'] = $user->id;
        }

        // Target user (admin হলে selected user, student হলে self)
        $targetUser = User::findOrFail($data['user_id']);

        $targetUser->payments()->create($data);





        return redirect()
            ->route('payments.index')
            ->with('success', 'Payment added successfully.');
    }


    public function show(Payment $payment)
    {
        $payment->load('user');
        return Inertia::render('payments/Show', [
            'payment' => $payment
        ]);
    }
public function edit(Payment $payment)
{
    $user = Auth::user();

    // Student cannot edit others payment
    if ($user->role === 'student' && $payment->user_id !== $user->id) {
        abort(403);
    }

    $payment->load('user');

    $users = [];
    if ($user->role === 'admin') {
        $users = User::select('id', 'name')->get();
    }

    return Inertia::render('payments/Edit', [
        'payment' => $payment,
        'users' => $users,
    ]);
}
    public function update(Request $request, Payment $payment)
{
    $user = Auth::user();

    // Student cannot update others payment
    if ($user->role === 'student' && $payment->user_id !== $user->id) {
        abort(403);
    }

    // Base rules
    $rules = [
        'amount' => 'required|numeric|min:0',
        'payment_date' => 'required|date',
        'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ];

    // Admin can change user
    // if ($user->role === 'admin') {
    //     $rules['user_id'] = 'required|exists:users,id';
    // }


    $data = $request->validate($rules);

    // Handle receipt update
    if ($request->hasFile('receipt')) {

        // delete old receipt
        if ($payment->receipt) {
            Storage::disk('public')->delete($payment->receipt);
        }

        $data['receipt'] = $request->file('receipt')
            ->store('receipts', 'public');
    }

    // Student cannot change user_id
    if ($user->role === 'student') {
        $data['user_id'] = $payment->user_id;
        $data['status'] = "pending";
    }

    $payment->update($data);

    return redirect()
        ->route('payments.index')
        ->with('success', 'Payment updated successfully.');
}


    public function destroy(Payment $payment)
    {

        if ($payment->receipt) {
            Storage::disk('public')->delete($payment->receipt);
        }

        $payment->delete();



        return redirect()->route('payments.index')->with('success', 'Payment deleted successfully.');
    }

    public function approve(Payment $payment)
    {
        $payment->update(['status' => 'approved']);

        // ইউজারের ফী আপডেট করা
        $user = $payment->user;
        $totalPaid = $user->payments()->where('status', 'approved')->sum('amount');
        $user->update([
            'paid_fee' => $totalPaid,
            'due_fee' => $user->course_fee - $totalPaid,
        ]);

        return redirect()->route('payments.index')->with('success', 'Payment approved and fees updated.');
    }

    public function rejected(Payment $payment)
    {
        $payment->update(['status' => 'rejected']);
        return redirect()->back()->with('error', 'Payment has been rejected.');
    }
}
