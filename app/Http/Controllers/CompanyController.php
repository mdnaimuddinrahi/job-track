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
        ], ResponseCode::SUCCESS);
    }

    public function store(Request $request)
    {
        [$statusCode, $data] = CompanyService::newCompany($request->all());
        
        return $this->sendResponse($data, $statusCode);
    }

    public function show($id)
    {
        [$statusCode, $data] = CompanyService::getCompanyById($id);

        return $this->sendResponse($data, $statusCode);
    }

    public function update(Request $request, $id)
    {
        [$statusCode, $data] = CompanyService::updateCompany($id, $request->all());
        
        return $this->sendResponse($data, $statusCode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
