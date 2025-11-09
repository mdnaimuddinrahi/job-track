<?php

namespace App\Http\Services;

use App\Common\DefaultValue;
use App\Models\Company;

class CompanyService
{
    public function handleSearchParams($search = []): array
    {
        // if(!empty($searchParams[DefaultValue::PAGINATE]) ) {
        //     $search[DefaultValue::PAGINATE] = $searchParams[DefaultValue::PAGINATE];
        //     $search[DefaultValue::PER_PAGE] = $searchParams[DefaultValue::PER_PAGE] ?? DefaultValue::PAGINATION_LIMIT;
        // }
        // if (!empty($searchParams['date_filter_by_from'])) {
        //     $search[$searchParams['date_filter_by_from'] . '_from'] = $searchParams[$searchParams['date_filter_by_from'] . '_from'];
        // }
        // if (!empty($searchParams['date_filter_by_to'])) {
        //     $search[$searchParams['date_filter_by_to'] . '_to'] = $searchParams[$searchParams['date_filter_by_to'] . '_to'];
        // }
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
}