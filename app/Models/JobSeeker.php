<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class JobSeeker extends Model
{
    protected $table = 'job_seekers';
    protected $fillable = [
        'title', 
        'type',
        'salary',
        'deadline'
    ];

    const TYPE_INTERSHIP = 'internship';
    const TYPE_FULL_TIME = 'full_time';
    const TYPE_REMOTE = 'remote';

    public static function getTypeList(): array {
        return [
            self::TYPE_INTERSHIP => 'Internship',
            self::TYPE_FULL_TIME => 'Full Time',
            self::TYPE_REMOTE => 'Remote',
        ];
    }

    public function getdeadlineAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
    
    public function newRecord(array $input): self {
        return self::create([
            'title' => $input['title'],
            'type' => $input['type'],
            'salary' => $input['salary'],
            'deadline' => $input['deadline'],
        ]);
    }

    public function updateRecord(self $self, array $input): self
    {
        $self->title = $input['title'];
        $self->type = $input['type'];
        $self->salary = $input['salary'];
        $self->deadline = $input['deadline'];

        $self->save();

        return $self;
    }

    public function getCreatedAtAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getUpdatedAtAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getRecords(array $filter): Collection
    {
        return $this->query()
                    ->when(!empty($filter['search']), function ($query) use ($filter) {
                        $query->where('title', 'like', '%' . $filter['search'] . '%');
                    })
                    ->when(!empty($filter['sort_by_salary']), function ($query) use ($filter) {
                        if ($filter['sort_by_salary'] === 'low') {
                            $query->orderBy('salary', 'asc');
                        } else {
                            $query->orderBy('salary', 'desc');
                        }
                    })
                    ->when(!empty($filter['type']), function ($query) use ($filter) {
                        $query->where('type', $filter['type']);
                    })
                    ->select('id', 'title', 'type', 'salary', 'deadline')
                    ->get();
    }

    public function deleteRecord(Self $self): bool 
    {
        return $self->delete();
    }
}
