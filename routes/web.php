<?php

use App\Http\Controllers\BatchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/about', function () {
    return Inertia::render('about');
});


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('profile', [ProfileController::class, 'show'])->name('profile.show');
  //  Route::get('profile', [StudentController::class, 'show'])->name('profile.show');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // courses
    Route::resource('courses', CourseController::class);

    // Payments
    Route::resource('payments', PaymentController::class);

    // Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::post('payments/{payment}/approve', [PaymentController::class, 'approve'])->name('payments.approve');
    Route::post('payments/{payment}/reject', [PaymentController::class, 'reject'])->name('payments.reject');
    // });

    // Student + Admin (View)
    Route::get('/routines', [RoutineController::class, 'index'])
        ->name('routines.index');

    // Admin Only

    Route::get('/routines/create', [RoutineController::class, 'create'])
        ->name('routines.create');

    Route::post('/routines', [RoutineController::class, 'store'])->name('routines.store');

    // Student + Admin (View) Result
    Route::get('/results', [ResultController::class, 'index'])
        ->name('results.index');

    // Admin Only

    Route::get('/results/create', [ResultController::class, 'create'])
        ->name('results.create');

    Route::post('/results', [ResultController::class, 'store'])
        ->name('results.store');


    // Users
    Route::resource('users', UserController::class);
    Route::post('users/{user}/approve', [UserController::class, 'approve'])->name('users.approve');
    Route::resource('users.payments', PaymentController::class)->shallow()->except(['index']);

    // Batches
    Route::resource('batches', BatchController::class);
});

require __DIR__ . '/settings.php';
