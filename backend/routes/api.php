<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MarketplaceController;

use App\Http\Controllers\DashboardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/marketplace/items', [MarketplaceController::class, 'getItems']);

// Dashboard Routes
Route::get('/dashboard/orders', [DashboardController::class, 'getOrders']);
Route::get('/dashboard/inventory', [DashboardController::class, 'getInventory']);
Route::post('/dashboard/services', [DashboardController::class, 'storeService']);
Route::post('/dashboard/products', [DashboardController::class, 'storeProduct']);

// Public Checkout
Route::post('/checkout', [\App\Http\Controllers\Api\CheckoutController::class, 'store']);
