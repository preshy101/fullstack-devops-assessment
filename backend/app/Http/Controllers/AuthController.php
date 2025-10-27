<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
     protected function sendResponse($data, $message = 'Operation successful', $code = 200)
    {
        $response = [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];

        return response()->json($response, $code);
    }

    /**
     * Helper to return consistent JSON error response.
     */
    protected function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['errors'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    /**
     * User registration.
     * POST /api/register
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = auth('api')->login($user);

        return $this->respondWithToken($token, 'User registered successfully', 201);
    }

    /**
     * User login.
     * POST /api/login
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return $this->sendError('Unauthorized', ['email' => ['Invalid credentials']], 401);
        }

        return $this->respondWithToken($token, 'User logged in successfully');
    }

    /**
     * Get the authenticated User.
     * GET /api/user
     */
    public function user()
    {
        return $this->sendResponse(auth('api')->user(), 'User details fetched successfully');
    }

    /**
     * Log the user out (Invalidate the token).
     * POST /api/logout
     */
    public function logout()
    {
        auth('api')->logout();

        return $this->sendResponse([], 'Successfully logged out');
    }

    /**
     * Refresh a token.
     * POST /api/refresh
     * (Optional but good practice for JWT)
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh(), 'Token refreshed successfully');
    }

    /**
     * Get the token array structure.
     */
    protected function respondWithToken($token, $message, $code = 200)
    {
        return $this->sendResponse([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ], $message, $code);
    }
}
