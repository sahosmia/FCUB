<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display payment list
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $filters = [
            'search'   => $request->string('search')->toString(),
            'sort_by'  => $request->input('sort_by', 'created_at'),
            'sort_dir' => $request->input('sort_dir', 'desc') === 'asc' ? 'asc' : 'desc',
            'limit'    => (int) $request->input('limit', 10),
        ];

        $query = Payment::query()->with('user');

        // Student can only see own payments
        if ($user->role === 'student') {
            $query->where('user_id', $user->id);
        }

        // Search by student id or name
        if ($filters['search']) {
            $query->whereHas(
                'user',
                fn($q) =>
                $q->where('student_id', 'like', "%{$filters['search']}%")
                    ->orWhere('name', 'like', "%{$filters['search']}%")
            );
        }

        $payments = $query
            ->orderBy($filters['sort_by'], $filters['sort_dir'])
            ->paginate($filters['limit'])
            ->appends($request->query());

        return Inertia::render('payments/Index', [
            'payments' => $payments,
            'filters'  => $filters,
        ]);
    }

    /**
     * Show create payment form
     */
    public function create()
    {
        return Inertia::render('payments/Create', [
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    /**
     * Store new payment
     */
    public function store(Request $request)
    {
        $authUser = Auth::user();

        $rules = [
            'amount'       => 'required|numeric|min:0.01',
            'receipt'      => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'payment_date' => 'required|date',
        ];

        if ($authUser->role === 'admin') {
            $rules['user_id'] = 'required|exists:users,id';
        }

        $data = $request->validate($rules);

        $data['user_id'] ??= $authUser->id;

        $targetUser = User::findOrFail($data['user_id']);

        // ✅ CHECK DUE AMOUNT
        $this->validateDueAmount($targetUser, (float) $data['amount']);

        $data['receipt'] = $request->file('receipt')->store('receipts', 'public');

        $targetUser->payments()->create($data);

        return redirect()
            ->route('payments.index')
            ->with('success', 'Payment added successfully.');
    }


    /**
     * Show single payment
     */
    public function show(Payment $payment)
    {
        return Inertia::render('payments/Show', [
            'payment' => $payment->load('user'),
        ]);
    }

    /**
     * Edit payment
     */
    public function edit(Payment $payment)
    {
        $this->authorizePayment($payment);

        return Inertia::render('payments/Edit', [
            'payment' => $payment->load('user'),
            'users'   => Auth::user()->role === 'admin'
                ? User::select('id', 'name')->get()
                : [],
        ]);
    }

    /**
     * Update payment
     */
    public function update(Request $request, Payment $payment)
    {
        $this->authorizePayment($payment);

        $data = $request->validate([
            'amount'       => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'receipt'      => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // ✅ CHECK DUE (exclude current payment)
        $this->validateDueAmount(
            $payment->user,
            (float) $data['amount'],
            $payment
        );

        if ($request->hasFile('receipt')) {
            $this->deleteReceipt($payment);
            $data['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        if (Auth::user()->role === 'student') {
            $data['user_id'] = $payment->user_id;
            $data['status']  = 'pending';
        }

        $payment->update($data);

        return redirect()
            ->route('payments.index')
            ->with('success', 'Payment updated successfully.');
    }


    /**
     * Delete payment
     */
    public function destroy(Payment $payment)
    {
        $this->deleteReceipt($payment);
        $payment->delete();

        return redirect()
            ->route('payments.index')
            ->with('success', 'Payment deleted successfully.');
    }

    /**
     * Approve payment
     */
    public function approve(Payment $payment)
    {
        $payment->update(['status' => 'approved']);

        $user = $payment->user;

        $totalPaid = (float) $user->payments()
            ->where('status', 'approved')
            ->sum('amount');

        $user->update([
            'paid_fee' => $totalPaid,
            'due_fee'  => max(0, (float) $user->course_fee - $totalPaid),
        ]);

        return redirect()
            ->route('payments.index')
            ->with('success', 'Payment approved and fees updated.');
    }

    /**
     * Reject payment
     */
    public function reject(Payment $payment)
    {
        $payment->update(['status' => 'rejected']);

        return redirect()
            ->route('payments.index')
            ->with('error', 'Payment has been rejected.');
    }

    /**
     * Helpers
     */
    private function authorizePayment(Payment $payment): void
    {
        if (Auth::user()->role === 'student' && $payment->user_id !== Auth::id()) {
            abort(403);
        }
    }

    private function deleteReceipt(Payment $payment): void
    {
        if ($payment->receipt) {
            Storage::disk('public')->delete($payment->receipt);
        }
    }

    private function validateDueAmount(User $user, float $amount, ?Payment $payment = null): void
    {
        $approvedPaid = (float) $user->payments()
            ->where('status', 'approved')
            ->when($payment, fn($q) => $q->where('id', '!=', $payment->id))
            ->sum('amount');

        $remainingDue = max(0, (float) $user->course_fee - $approvedPaid);

        if ($amount > $remainingDue) {
            abort(422, 'Payment amount exceeds due amount.');
        }
    }
}
