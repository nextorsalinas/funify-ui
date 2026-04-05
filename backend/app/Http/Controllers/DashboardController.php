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
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['success' => false, 'message' => 'Agencia no encontrada'], 404);
        }
        $agencyId = $user->agency->id;

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
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['success' => true, 'count' => 0]); 
        }
        $agencyId = $user->agency->id;

        $count = Order::where('agency_id', $agencyId)
            ->where('status', 'pending')
            ->count();

        return response()->json([
            'success' => true,
            'count' => $count
        ]);
    }

    public function getInventory(Request $request)
    {
        $user = $request->user();
        if (!$user->agency) {
            return response()->json([]);
        }
        $agencyId = $user->agency->id;

        $services = Service::where('agency_id', $agencyId)->get()->map(function ($item) {
            $item->type = 'Servicio';
            return $item;
        });

        $products = PhysicalProduct::where('agency_id', $agencyId)->get()->map(function ($item) {
            $item->type = 'Producto';
            return $item;
        });

        return response()->json($services->concat($products));
    }

    public function storeService(Request $request)
    {
        Log::info('Recibida petición de servicio:', $request->all());
        
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No tienes una agencia configurada'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/services', 'public');
            $imageUrl = asset('storage/' . $path);

            $service = Service::create([
                'agency_id' => $user->agency->id,
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

    public function updateService(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $service = Service::findOrFail($id);
        if ($service->agency_id !== $user->agency->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string',
        ]);

        $service->name = $validated['title'];
        $service->description = $validated['description'];
        $service->price = $validated['price'];
        $service->category = $validated['category'];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/services', 'public');
            $service->image_url = asset('storage/' . $path);
        }

        $service->save();
        return response()->json(['message' => 'Service updated successfully', 'data' => $service]);
    }

    public function deleteService(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $service = Service::findOrFail($id);
        if ($service->agency_id !== $user->agency->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $service->delete();
        return response()->json(['message' => 'Service deleted successfully']);
    }

    public function storeProduct(Request $request)
    {
        Log::info('Product request:', $request->all());

        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No tienes una agencia configurada'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/products', 'public');
            $imageUrl = asset('storage/' . $path);

            $product = PhysicalProduct::create([
                'agency_id' => $user->agency->id,
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

    public function updateProduct(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $product = PhysicalProduct::findOrFail($id);
        if ($product->agency_id !== $user->agency->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'category' => 'required|string',
        ]);

        $product->name = $validated['title'];
        $product->description = $validated['description'];
        $product->price = $validated['price'];
        $product->stock = $validated['stock'];
        $product->category = $validated['category'];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads/products', 'public');
            $product->image_url = asset('storage/' . $path);
        }

        $product->save();
        return response()->json(['message' => 'Product updated successfully', 'data' => $product]);
    }

    public function deleteProduct(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $product = PhysicalProduct::findOrFail($id);
        if ($product->agency_id !== $user->agency->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function toggleStatus(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->agency) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $type = $request->input('type');
        $model = $type === 'Servicio' ? Service::findOrFail($id) : PhysicalProduct::findOrFail($id);

        if ($model->agency_id !== $user->agency->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $model->is_active = !$model->is_active;
        $model->save();

        return response()->json([
            'success' => true,
            'is_active' => $model->is_active,
            'message' => 'Estado actualizado correctamente'
        ]);
    }
}