<?php

namespace App\Models;

use App\Common\DateFormat;
use App\Common\DefaultValue;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'website',
        'email',
        'phone',
        'address',
        'description',
        'applied_on',
        'status',
        'applied_position',
        'applied_via',
    ];
    public const COLUMN_CREATED_AT = 'created_at';
    public const COLUMN_UPDATED_AT = 'updated_at';
    public const COLUMN_APPLIED_ON = 'applied_on';
    public const COLUMN_APPLIED_STATUS = 'status';
    public const COLUMN_ID = 'id';
    public const COLUMN_NAME = 'name';
    public const COLUMN_WEBSITE = 'website';
    public const COLUMN_EMAIL = 'email';
    public const COLUMN_PHONE = 'phone';
    public const COLUMN_ADDRESS = 'address';
    public const COLUMN_DESCRIPTION = 'description';
    public const COLUMN_APPLIED_POSITION = 'applied_position';
    public const COLUMN_APPLIED_VIA = 'applied_via';
    
    public const APPLIED_STATUS_PENDING = 1;
    public const APPLIED_STATUS_INTERESTED = 2;
    public const APPLIED_STATUS_APPLIED = 3;
    public const APPLIED_STATUS_INTERVIEWING = 4;
    public const APPLIED_STATUS_OFFERED = 5;
    public const APPLIED_STATUS_REJECTED = 6;
    public const APPLIED_STATUS_LABELS = [
        self::APPLIED_STATUS_PENDING => 'Pending',
        self::APPLIED_STATUS_INTERESTED => 'Interested',
        self::APPLIED_STATUS_APPLIED => 'Applied',
        self::APPLIED_STATUS_INTERVIEWING => 'Interviewing',
        self::APPLIED_STATUS_OFFERED => 'Offered',
        self::APPLIED_STATUS_REJECTED => 'Rejected',
    ];


    public static function filter(array $filters = []) {
        $result = self::query()
                        ->when(!empty($filters[self::COLUMN_NAME]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_NAME, 'like', '%' . $filters[self::COLUMN_NAME] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_EMAIL]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_EMAIL, 'like', '%' . $filters[self::COLUMN_EMAIL] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_PHONE]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_PHONE, 'like', '%' . $filters[self::COLUMN_PHONE] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_APPLIED_POSITION]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_APPLIED_POSITION, 'like', '%' . $filters[self::COLUMN_APPLIED_POSITION] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_APPLIED_VIA]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_APPLIED_VIA, 'like', '%' . $filters[self::COLUMN_APPLIED_VIA] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_APPLIED_ON . DefaultValue::FROM]), function ($query) use ($filters) {
                            $query->whereDate(self::COLUMN_APPLIED_ON, '>=', Date::parse($filters[self::COLUMN_APPLIED_ON . DefaultValue::FROM])->startOfDay());
                        })
                        ->when(!empty($filters[self::COLUMN_APPLIED_ON . DefaultValue::TO]), function ($query) use ($filters) {
                            $query->whereDate(self::COLUMN_APPLIED_ON, '<=', Date::parse($filters[self::COLUMN_APPLIED_ON . DefaultValue::TO])->endOfDay());
                        })
                        ->when(!empty($filters[self::COLUMN_CREATED_AT . DefaultValue::FROM]), function ($query) use ($filters) {
                            $query->whereDate(self::COLUMN_CREATED_AT, '>=', Date::parse($filters[self::COLUMN_CREATED_AT . DefaultValue::FROM])->startOfDay());
                        })
                        ->when(!empty($filters[self::COLUMN_CREATED_AT . DefaultValue::TO]), function ($query) use ($filters) {
                            $query->whereDate(self::COLUMN_CREATED_AT, '<=', Date::parse($filters[self::COLUMN_CREATED_AT . DefaultValue::TO])->endOfDay());
                        })
                        ->when(!empty($filters[self::COLUMN_UPDATED_AT . DefaultValue::FROM]), function ($query) use ($filters) {
                            $query->whereDate(self::COLUMN_UPDATED_AT, '>=', Date::parse($filters[self::COLUMN_UPDATED_AT . DefaultValue::FROM])->startOfDay());
                        })
                        ->when(!empty($filters[self::COLUMN_UPDATED_AT . DefaultValue::TO]), function ($query) use ($filters) {
                            $query->whereDate(self::COLUMN_UPDATED_AT, '<=', Date::parse($filters[self::COLUMN_UPDATED_AT . DefaultValue::TO])->endOfDay());
                        })
                        ->when(!empty($filters[self::COLUMN_WEBSITE]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_WEBSITE, 'like', '%' . $filters[self::COLUMN_WEBSITE] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_ADDRESS]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_ADDRESS, 'like', '%' . $filters[self::COLUMN_ADDRESS] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_DESCRIPTION]), function ($query) use ($filters) {
                            $query->where(self::COLUMN_DESCRIPTION, 'like', '%' . $filters[self::COLUMN_DESCRIPTION] . '%');
                        })
                        ->when(!empty($filters[self::COLUMN_APPLIED_STATUS]), function ($query) use ($filters) {
                            if(is_array($filters[self::COLUMN_APPLIED_STATUS])) {
                                return $query->whereIn(self::COLUMN_APPLIED_STATUS, $filters[self::COLUMN_APPLIED_STATUS]);
                            }
                            $query->where(self::COLUMN_APPLIED_STATUS, $filters[self::COLUMN_APPLIED_STATUS]); 
                        })
                        ->when(!empty($filters[DefaultValue::SELECTED_COLUMNS]), function ($query) use ($filters) {
                            $query->select($filters[DefaultValue::SELECTED_COLUMNS]);
                        });
        if(!empty($filters[DefaultValue::PAGINATE])) {
            return  $result->paginate($filters[DefaultValue::PAGE_LIMIT_KEY] ?? DefaultValue::DATA_LIMIT);
        }

        return $result->get();
    }

    public static function getCompanies(array $filters = [])
    {
        return self::filter($filters);
    }

    public function getStatusAttribute(): ?string
    {
        return __(self::APPLIED_STATUS_LABELS[$this->getRawOriginal(self::COLUMN_APPLIED_STATUS)]) ?? __(DefaultValue::UNKNOWN);
    }

    public function getFormattedAppliedOnAttribute(): ?string
    {
        $appliedOn = $this->getRawOriginal(self::COLUMN_APPLIED_ON);

        return $appliedOn ? Date::parse($appliedOn)->format(DateFormat::F_j_comma_Y) : '-';
    }

    public function getCreatedAtAttribute(): ?string
    {
        $createdAt = $this->getRawOriginal(self::COLUMN_CREATED_AT);

        return $createdAt ? Date::parse($createdAt)->format(DateFormat::F_j_comma_Y_g_colon_i_a) : '-';
    }

    public function getUpdatedAtAttribute(): ?string
    {
        $updatedAt = $this->getRawOriginal(self::COLUMN_UPDATED_AT);

        return $updatedAt ? Date::parse($updatedAt)->format(DateFormat::F_j_comma_Y_g_colon_i_a) : '-';
    }

    public static function createNewCompany(array $data): Object
    {
        return self::create($data);
    }

    public static function findCompany($findBy, $value): ?Company
    {
        return self::where($findBy, $value)->first();
    }

    public static function updateCompany(Company $company, array $data): Company
    {
        $company->update($data);
        
        return $company;
    }
}
