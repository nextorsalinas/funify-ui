<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MarketplaceController;

use App\Http\Controllers\DashboardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/marketplace/items', [MarketplaceController::class, 'getItems']);

// Public Auth Routes
Route::post('/auth/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/auth/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

// Google Auth
Route::get('/auth/google/redirect', [\App\Http\Controllers\Api\AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [\App\Http\Controllers\Api\AuthController::class, 'handleGoogleCallback']);

// Public Checkout
Route::post('/checkout', [\App\Http\Controllers\Api\CheckoutController::class, 'store']);

// Protected Dashboard Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::post('/auth/complete-profile', [\App\Http\Controllers\Api\AuthController::class, 'completeProfile']);
    Route::get('/dashboard/orders/pending-count', [DashboardController::class, 'getPendingOrdersCount']);
    Route::get('/dashboard/orders', [DashboardController::class, 'getOrders']);
    Route::get('/dashboard/inventory', [DashboardController::class, 'getInventory']);
    Route::post('/dashboard/services', [DashboardController::class, 'storeService']);
    Route::post('/dashboard/products', [DashboardController::class, 'storeProduct']);
    
    // Update & Delete
    Route::post('/dashboard/services/{id}', [DashboardController::class, 'updateService']); // Using POST for file upload support
    Route::delete('/dashboard/services/{id}', [DashboardController::class, 'deleteService']);
    Route::post('/dashboard/products/{id}', [DashboardController::class, 'updateProduct']); // Using POST for file upload support
    Route::delete('/dashboard/products/{id}', [DashboardController::class, 'deleteProduct']);
    Route::patch('/dashboard/inventory/{id}/toggle-status', [DashboardController::class, 'toggleStatus']);
});
