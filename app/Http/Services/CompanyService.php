<?php

namespace App\Http\Services;

use App\Common\DefaultValue;
use App\Common\ResponseCode;
use App\Models\Company;
use Illuminate\Support\Facades\Validator;

class CompanyService
{
    public function handleSearchParams($search = []): array
    {
        if(!empty($search[Company::COLUMN_APPLIED_STATUS])) {
            if(!is_array($search[Company::COLUMN_APPLIED_STATUS])) {
                $search[Company::COLUMN_APPLIED_STATUS] = array_map('trim', explode(',', $search[Company::COLUMN_APPLIED_STATUS]));
            }

            foreach($search[Company::COLUMN_APPLIED_STATUS] as $key => $status) {
                if(!in_array($status, array_keys(Company::APPLIED_STATUS_LABELS))) {
                    unset($search[Company::COLUMN_APPLIED_STATUS][$key]);
                }
            }
        }
        if(!empty($search[DefaultValue::SELECTED_COLUMNS])) {
            if(!is_array($search[DefaultValue::SELECTED_COLUMNS])) {
                $search[DefaultValue::SELECTED_COLUMNS] = array_map('trim', explode(',', $search[DefaultValue::SELECTED_COLUMNS]));
            }
            foreach($search[DefaultValue::SELECTED_COLUMNS] as $key => $column) {
                if(!in_array($column, array_keys($this->columnNames()))) {
                    unset($search[DefaultValue::SELECTED_COLUMNS][$key]);
                }
            }
        }

        return $search;
    }

    public function columnNames(): array {
        return [
            Company::COLUMN_ID => __('Key'),
            Company::COLUMN_NAME => __('Name'),
            Company::COLUMN_WEBSITE => __('Website'),
            Company::COLUMN_EMAIL => __('Email'),
            Company::COLUMN_PHONE => __('Phone'),
            Company::COLUMN_ADDRESS => __('Address'),
            Company::COLUMN_DESCRIPTION => __('Description'),
            Company::COLUMN_APPLIED_STATUS => __('Applied Status'),
            Company::COLUMN_APPLIED_POSITION => __('Applied Position'),
            Company::COLUMN_APPLIED_VIA => __('Applied Via'),
            Company::COLUMN_CREATED_AT => __('Created At'),
            Company::COLUMN_UPDATED_AT => __('Updated At'),
            Company::COLUMN_APPLIED_ON => __('Applied On')
        ];
    }

    public function getCompanyList(array $searchParams = []) {
        return Company::getCompanies(self::handleSearchParams($searchParams));
    }

    /**
     * Handle validation for company input data.
    */
    public static function handleValidation(array $input): \Illuminate\Contracts\Validation\Validator {
        $validator = Validator::make($input, [
            Company::COLUMN_NAME => ['required', 'string', 'max:255'],
            Company::COLUMN_EMAIL => ['nullable', 'email', 'max:255'],
            Company::COLUMN_PHONE => ['nullable', 'string', 'max:50'],
            Company::COLUMN_WEBSITE => ['nullable', 'url', 'max:255'],
            Company::COLUMN_ADDRESS => ['nullable', 'string', 'max:500'],
            Company::COLUMN_DESCRIPTION => ['nullable', 'string'],
            Company::COLUMN_APPLIED_POSITION => ['nullable', 'string', 'max:255'],
            Company::COLUMN_APPLIED_VIA => ['nullable', 'string', 'max:255'],
            Company::COLUMN_APPLIED_ON => ['nullable', 'date'],
            Company::COLUMN_APPLIED_STATUS => ['nullable', 'in:' . implode(',', array_keys(Company::APPLIED_STATUS_LABELS))],
        ]);
        
        return $validator;
    }

    /**
     * Create a new company record.
    */
    public static function newCompany(array $input): array {
        $validator = self::handleValidation($input);

        if ($validator->fails()) {
            return [ResponseCode::VALIDATION_ERROR, ['errors' => $validator->errors()]];
        }

        try {
            $company = Company::createNewCompany($input);
        } catch (\Exception $e) {
            return [ResponseCode::INTERNAL_SERVER_ERROR, [
                    'message' => __('Failed to create :name.', ['name' => __('Company')]),
                    'error' => $e->getMessage()
                ]
            ];
        }

        return [ResponseCode::CREATED, [
                'company' => $company, 
                'message' => __(':name created successfully.', [
                    'name' => __('Company')
                    ])
                ]
            ];
    } 

    /**
     * Prepare input data for creating or updating a company record.
    */
    public static function prepareInput(array $input): array {
        $preparedInput = [];
        $fields = [
            Company::COLUMN_NAME,
            Company::COLUMN_WEBSITE,
            Company::COLUMN_EMAIL,
            Company::COLUMN_PHONE,
            Company::COLUMN_ADDRESS,
            Company::COLUMN_DESCRIPTION,
            Company::COLUMN_APPLIED_ON,
            Company::COLUMN_APPLIED_POSITION,
            Company::COLUMN_APPLIED_VIA,
            Company::COLUMN_APPLIED_STATUS,
        ];

        foreach ($fields as $field) {
            if (isset($input[$field])) {
                $preparedInput[$field] = $input[$field];
            }
        }

        return $preparedInput;
    }

    /**
     * Get company details by ID.
    */
    public static function getCompanyById(int $id): array {
        $company = Company::findCompany(Company::COLUMN_ID, $id);

        if(empty($company)) {
            return [ResponseCode::NOT_FOUND, ['message' => __('Company not found.')]];
        } 
        
        return [ResponseCode::SUCCESS, ['company' => $company]];
    }

    /**
     * Update an existing company record.
    */
    public static function updateCompany(int $id, array $input): array {
        [$statusCode, $data] = self::getCompanyById($id);

        if($statusCode === ResponseCode::NOT_FOUND) {
            return [$statusCode, $data];
        } 

        $validator = self::handleValidation($input);

        if ($validator->fails()) {
            return [ResponseCode::VALIDATION_ERROR, ['errors' => $validator->errors()]];
        }
        
        try {
            $company = Company::updateCompany($data['company'], self::prepareInput($input));
        } catch (\Exception $e) {
            return [ResponseCode::INTERNAL_SERVER_ERROR, [
                    'message' => __('Failed to update :name.', ['name' => __('Company')]),
                    'error' => $e->getMessage()
                ]
            ];
        }

        return [ResponseCode::SUCCESS, [
                'company' => $company, 
                'message' => __(':name updated successfully.', [
                    'name' => __('Company')])
                ]
            ];
    }

    /**
     * Delete a company record.
    */
    public static function deleteCompany(int $id): array {
        [$statusCode, $data] = self::getCompanyById($id);

        if($statusCode === ResponseCode::NOT_FOUND) {
            return [$statusCode, $data];
        } 

        try {
            $company = Company::deleteCompany($data['company']);

            if (!$company) {
                return [ResponseCode::INTERNAL_SERVER_ERROR, [
                        'message' => __('Failed to delete :name.', ['name' => __('Company')])
                    ]
                ];
            }
        } catch (\Exception $e) {
            return [ResponseCode::INTERNAL_SERVER_ERROR, [
                    'message' => __('Failed to delete :name.', ['name' => __('Company')]),
                    'error' => $e->getMessage()
                ]
            ];
        }

        return [ResponseCode::SUCCESS, [
                'message' => __(':name deleted successfully.', [
                    'name' => __('Company')])
                ]
            ];
    }
}