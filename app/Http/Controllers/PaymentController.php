<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    //     $this->middleware(function ($request, $next) {
    //         if ($request->user()->role !== 'admin') {
    //             abort(403);
    //         }
    //         return $next($request);
    //     });
    // }


    public function create(User $user)
    {
        return Inertia::render('payments/Create', [
            'user' => $user,
        ]);
    }

    public function store(Request $request, User $user)
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:0',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'payment_date' => 'required|date',
            'semester' => 'required|integer|min:1|max:8',
        ]);

        if ($request->hasFile('receipt')) {
            $data['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        $user->payments()->create($data);

        $user->update([
            'paid_fee' => $user->payments()->sum('amount'),
            'due_fee' => ($user->course_fee + $user->admission_fee) - $user->payments()->sum('amount'),
        ]);

        return redirect()->route('users.show', $user)->with('success', 'Payment added successfully.');
    }

    public function destroy(Payment $payment)
    {
        $user = $payment->user;

        if ($payment->receipt) {
            Storage::disk('public')->delete($payment->receipt);
        }

        $payment->delete();

        $user->update([
            'paid_fee' => $user->payments()->sum('amount'),
            'due_fee' => ($user->course_fee + $user->admission_fee) - $user->payments()->sum('amount'),
        ]);

        return redirect()->route('users.show', $user)->with('success', 'Payment deleted successfully.');
    }
}
