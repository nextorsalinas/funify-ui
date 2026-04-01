<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\PhysicalProduct;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function getItems()
    {
        // Traer todos los servicios con su agencia
        $services = Service::with('agency')->get()->map(function($item) {
            return [
                'id'            => 'srv_' . $item->id,
                'name'          => $item->name,
                'description'   => $item->description,
                'price'         => (float) $item->price,
                'image_url'     => $item->image_url,
                'category'      => $item->category,
                'type'          => 'Service',
                'agency_name'   => $item->agency->name ?? 'Independiente',
                'agency_rating' => (float) ($item->agency->rating ?? 5.0),
            ];
        });

        // Traer todos los productos físicos con su agencia
        $products = PhysicalProduct::with('agency')->get()->map(function($item) {
            return [
                'id'            => 'prd_' . $item->id,
                'name'          => $item->name,
                'description'   => $item->description,
                'price'         => (float) $item->price,
                'image_url'     => $item->image_url,
                'category'      => $item->category,
                'type'          => 'Product',
                'stock'         => $item->stock,
                'agency_name'   => $item->agency->name ?? 'Independiente',
                'agency_rating' => (float) ($item->agency->rating ?? 5.0),
            ];
        });

        // Combinar y mezclar de forma aleatoria (vitrina viva)
        $allItems = $services->concat($products)->shuffle()->values();

        return response()->json([
            'success' => true,
            'data' => $allItems
        ]);
    }
}
