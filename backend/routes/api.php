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

// Public Checkout
Route::post('/checkout', [\App\Http\Controllers\Api\CheckoutController::class, 'store']);

// Protected Dashboard Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::get('/dashboard/orders/pending-count', [DashboardController::class, 'getPendingOrdersCount']);
    Route::get('/dashboard/orders', [DashboardController::class, 'getOrders']);
    Route::get('/dashboard/inventory', [DashboardController::class, 'getInventory']);
    Route::post('/dashboard/services', [DashboardController::class, 'storeService']);
    Route::post('/dashboard/products', [DashboardController::class, 'storeProduct']);
});
