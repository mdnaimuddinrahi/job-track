<?php

namespace App\Http\Controllers;

use App\Models\JobSeeker;
use App\Http\Requests\StoreJobSeekerRequest;
use App\Http\Requests\UpdateJobSeekerRequest;
use Illuminate\Http\Request;

class JobSeekerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = (new JobSeeker())->getRecords($request->all());

        return response()->json(['data' => $data]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobSeekerRequest $request)
    {
        $data = (new JobSeeker())->newRecord($request->validated());

        return response()->json(['data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(JobSeeker $jobSeeker)
    {
        return response()->json(['data' => $jobSeeker]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobSeekerRequest $request, JobSeeker $jobSeeker)
    {
        $jobSeeker = $jobSeeker->updateRecord($jobSeeker, $request->validated());

        return response()->json(['data' => $jobSeeker]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobSeeker $jobSeeker)
    {
        $expense = $jobSeeker->deleteRecord($jobSeeker);

        return response()->json(['data' => $expense]);
    }
}
