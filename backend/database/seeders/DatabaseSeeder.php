<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Service;
use App\Models\PhysicalProduct;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario de prueba
        $user = User::firstOrCreate([
            'email' => 'admin@funifay.com',
        ], [
            'name'  => 'Admin Funifay',
            'password' => bcrypt('password123'),
        ]);

        // Agencias de prueba
        $agencias = Agency::insert([
            [
                'user_id'     => $user->id,
                'name'        => 'Agencia Pispifiestas',
                'description' => 'Los mejores espectáculos para niños.',
                'rating'      => 5.00,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'user_id'     => $user->id,
                'name'        => 'Dulces Momentos',
                'description' => 'Pasteles y postres artesanales.',
                'rating'      => 4.90,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'user_id'     => $user->id,
                'name'        => 'Aventuras Extremas',
                'description' => 'Inflables y juegos para eventos.',
                'rating'      => 4.80,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);

        $ag1 = Agency::where('name', 'Agencia Pispifiestas')->first();
        $ag2 = Agency::where('name', 'Dulces Momentos')->first();
        $ag3 = Agency::where('name', 'Aventuras Extremas')->first();

        // Servicios de prueba
        Service::insert([
            [
                'agency_id'   => $ag1->id,
                'name'        => 'Show de Magia Espectacular',
                'description' => 'Un mago profesional para sorprender a los niños.',
                'price'       => 2500,
                'category'    => 'Entretenimiento',
                'image_url'   => 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'agency_id'   => $ag1->id,
                'name'        => 'Animación con Payasos',
                'description' => 'Payasos que harán reír a grandes y chicos.',
                'price'       => 1500,
                'category'    => 'Entretenimiento',
                'image_url'   => 'https://images.unsplash.com/photo-1533222533923-a5a41dc563e4?auto=format&fit=crop&w=800&q=80',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'agency_id'   => $ag3->id,
                'name'        => 'Castillo Inflable Gigante',
                'description' => 'Inflable premium con tobogán incluido.',
                'price'       => 1800,
                'category'    => 'Juegos',
                'image_url'   => 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);

        // Productos físicos de prueba
        PhysicalProduct::insert([
            [
                'agency_id'   => $ag2->id,
                'name'        => 'Pastel Temático 3 Pisos',
                'description' => 'Pastel personalizado con decoración a elegir.',
                'price'       => 1200,
                'category'    => 'Repostería',
                'image_url'   => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
                'stock'       => 10,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'agency_id'   => $ag2->id,
                'name'        => 'Dulcero Personalizado',
                'description' => 'Dulcero temático con el personaje favorito.',
                'price'       => 350,
                'category'    => 'Dulces',
                'image_url'   => 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
                'stock'       => 50,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ]);
    }
}
