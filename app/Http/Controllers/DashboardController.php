<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller{
    public function index(){
$user = Auth::user();
        $stats = [];

        if ($user->role === 'admin') {
            $stats['total_students'] = User::where('role', 'student')->count();
            $stats['total_courses'] = Course::count();
            $stats['pending_students'] = User::where('role', 'student')->where('status', false)->count();
            $stats['active_students'] = User::where('role', 'student')->where('status', true)->count();
        } else {
            // $stats['enrolled_courses'] = $user->courses()->count();
            $stats['paid_fee'] = $user->paid_fee;
            $stats['due_fee'] = $user->due_fee;
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
