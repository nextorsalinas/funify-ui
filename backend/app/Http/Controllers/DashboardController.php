<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\PhysicalProduct;
use App\Models\Order;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function getOrders(Request $request)
    {
        $agencyId = 1;

        $orders = Order::where('agency_id', $agencyId)
            ->with(['items.purchasable'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    public function getPendingOrdersCount(Request $request)
    {
        $agencyId = 1;

        $count = Order::where('agency_id', $agencyId)
            ->where('status', 'pending')
            ->count();

        return response()->json([
            'success' => true,
            'count' => $count
        ]);
    }

    public function getInventory()
    {
        $services = Service::where('agency_id', 1)->get()->map(function ($item) {
            $item->type = 'Servicio';
            return $item;
        });

        $products = PhysicalProduct::where('agency_id', 1)->get()->map(function ($item) {
            $item->type = 'Producto';
            return $item;
        });

        return response()->json($services->concat($products));
    }

    public function storeService(Request $request)
    {
        Log::info('Recibida petición de servicio:', $request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string',
            'agency_id' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/services', 'public');
            $imageUrl = asset('storage/' . $path);

            $service = Service::create([
                'agency_id' => $request->agency_id,
                'name' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'category' => $request->category,
                'image_url' => $imageUrl,
            ]);

            return response()->json(['message' => 'Service created successfully', 'data' => $service], 201);
        }

        return response()->json(['message' => 'Image upload failed'], 400);
    }

    public function storeProduct(Request $request)
    {
        Log::info('Product request:', $request->all());

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string',
            'agency_id' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/products', 'public');
            $imageUrl = asset('storage/' . $path);

            $product = PhysicalProduct::create([
                'agency_id' => $request->agency_id,
                'name' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock,
                'category' => $request->category,
                'image_url' => $imageUrl,
            ]);

            return response()->json(['message' => 'Product created successfully', 'data' => $product], 201);
        }

        return response()->json(['message' => 'Image upload failed'], 400);
    }
}