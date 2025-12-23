<?php

use App\Http\Controllers\BatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/about', function () {
    return Inertia::render('about');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        $stats = [];

        if ($user->role === 'admin') {
            $stats['total_students'] = User::where('role', 'student')->count();
            $stats['total_courses'] = Course::count();
            $stats['pending_students'] = User::where('role', 'student')->where('status', false)->count();
            $stats['active_students'] = User::where('role', 'student')->where('status', true)->count();
        } else {
            $stats['enrolled_courses'] = $user->courses()->count();
            $stats['paid_fee'] = $user->paid_fee;
            $stats['due_fee'] = $user->due_fee;
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    })->name('dashboard');

    Route::resource('courses', CourseController::class);
    Route::resource('users', UserController::class);
    Route::post('users/{user}/approve', [UserController::class, 'approve'])->name('users.approve');
    Route::resource('users.payments', PaymentController::class)->shallow()->except(['index']);
    Route::resource('batches', BatchController::class);

});

require __DIR__.'/settings.php';
