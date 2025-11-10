<?php

namespace App\Http\Controllers;

use App\Common\ResponseCode;
use App\Http\Services\CompanyService;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $companyServiceObj = new CompanyService();

        return $this->sendResponse([
            'companies' => $companyServiceObj->getCompanyList($request->all()),
            'columns' => $companyServiceObj->columnNames(),
        ], ResponseCode::CONTINUE);
    }

    public function store(Request $request)
    {
        [$statusCode, $data] = CompanyService::newCompany($request->all());
        
        return $this->sendResponse($data, $statusCode);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
