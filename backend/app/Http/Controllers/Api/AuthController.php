<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Agency;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            // Buscar o crear el usuario
            $user = User::where('google_id', $googleUser->id)
                        ->orWhere('email', $googleUser->email)
                        ->first();

            if (!$user) {
                // Crear nuevo usuario si no existe
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'password' => null, // No password for social users
                ]);

                // YA NO CREAMOS LA AGENCIA AUTOMÁTICA AQUÍ
            } else {
                // Si el usuario existía pero no tenía google_id vinculado
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleUser->id,
                        'avatar' => $googleUser->avatar
                    ]);
                }
            }

            $user = $user->load('agency');
            $token = $user->createToken('auth_token')->plainTextToken;

            // Redirigir al frontend con el token (Ajustar URL segun entorno)
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
            
            // Serializamos los datos para pasarlos por la URL (estilo simple para desarrollo)
            $userData = urlencode(json_encode([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]));
            
            $agencyData = $user->agency ? urlencode(json_encode($user->agency)) : 'null';

            return redirect()->away("{$frontendUrl}/auth/callback?token={$token}&user={$userData}&agency={$agencyData}");

        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo autenticar con Google: ' . $e->getMessage()], 500);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'owner_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'agency_name' => 'required|string|max:255',
        ]);

        $user = User::create([
            'name' => $request->owner_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $agency = Agency::create([
            'user_id' => $user->id,
            'name' => $request->agency_name,
            'description' => 'Agencia nueva en Funifay',
            'rating' => 5.00
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
            'agency' => $agency
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::with('agency')->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas son incorrectas.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
            'agency' => $user->agency
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada exitosamente'
        ]);
    }

    public function completeProfile(Request $request)
    {
        $request->validate([
            'agency_name' => 'required|string|max:255',
        ]);

        $user = $request->user();

        // Verificar si ya tiene agencia
        if (Agency::where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Ya tienes una agencia registrada.'], 400);
        }

        $agency = Agency::create([
            'user_id' => $user->id,
            'name' => $request->agency_name,
            'description' => 'Mi nueva agencia en Funifay',
            'rating' => 5.0
        ]);

        return response()->json([
            'success' => true,
            'agency' => $agency
        ]);
    }
}
