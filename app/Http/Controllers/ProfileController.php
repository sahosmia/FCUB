<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
$user = Auth::user()->load('batch');
        $payments = $user->payments()->orderBy('payment_date', 'desc')->paginate(10);

        return Inertia::render('profile/Show', [
            'user' => $user,
            'payments' => $payments,
        ]);
    }
}
