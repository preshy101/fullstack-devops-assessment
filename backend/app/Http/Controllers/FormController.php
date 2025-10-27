<?php

namespace App\Http\Controllers;

use App\Models\form;
use App\Http\Requests\FormStoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
{
    /**
     * Helper to return consistent JSON response. (Copied from AuthController for self-contained file)
     */
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
     * Helper to return consistent JSON error response. (Copied from AuthController for self-contained file)
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
     * Display a listing of the resource.
     */
    public function index()
    {
         $forms = Auth::user()->forms()->latest()->get();

        return $this->sendResponse($forms, 'Forms retrieved successfully');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FormStoreRequest $request)
    {
        // Validation handled by FormStoreRequest
        $data = $request->validated();

        $form = Auth::user()->forms()->create($data);

        return $this->sendResponse($form, 'Form created successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $form = Auth::user()->forms()->find($id);

        if (is_null($form)) {
            return $this->sendError('Form not found.');
        }

        return $this->sendResponse($form, 'Form retrieved successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(form $form)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FormUpdateRequest $request, $id)
    {
        $form = Auth::user()->forms()->find($id);

        if (is_null($form)) {
            return $this->sendError('Form not found.');
        }

        // Validation handled by FormUpdateRequest
        $data = $request->validated();

        $form->update($data);

        return $this->sendResponse($form, 'Form updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $form = Auth::user()->forms()->find($id);

        if (is_null($form)) {
            return $this->sendError('Form not found.');
        }

        $form->delete();

        return $this->sendResponse([], 'Form deleted successfully');
    }
}
