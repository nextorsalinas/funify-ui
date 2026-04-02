<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'agency_id' => 'required|exists:agencies,id',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'required|string|max:50',
            'event_date' => 'required|date',
            'event_location' => 'nullable|string',
            'client_notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required',
            'items.*.type' => 'required|in:Service,Product',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric'
        ]);

        try {
            DB::beginTransaction();

            $total = 0;
            foreach ($validated['items'] as $item) {
                $total += $item['price'] * $item['quantity'];
            }

            $order = Order::create([
                'agency_id' => $validated['agency_id'],
                'client_name' => $validated['client_name'],
                'client_email' => $validated['client_email'],
                'client_phone' => $validated['client_phone'],
                'event_date' => date('Y-m-d H:i:s', strtotime($validated['event_date'])),
                'event_location' => $validated['event_location'] ?? null,
                'status' => 'pending',
                'total_amount' => $total,
                'client_notes' => $validated['client_notes'] ?? null
            ]);

            foreach ($validated['items'] as $item) {
                $purchasableType = $item['type'] === 'Service' 
                    ? 'App\\Models\\Service' 
                    : 'App\\Models\\PhysicalProduct';
                
                $rawId = str_replace(['srv_', 'prd_'], '', $item['id']);

                OrderItem::create([
                    'order_id' => $order->id,
                    'purchasable_type' => $purchasableType,
                    'purchasable_id' => $rawId,
                    'quantity' => $item['quantity'],
                    'price_at_booking' => $item['price']
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Reserva creada exitosamente',
                'order_id' => $order->id
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'error' => 'Error al procesar la reserva: ' . $e->getMessage()
            ], 500);
        }
    }
}
