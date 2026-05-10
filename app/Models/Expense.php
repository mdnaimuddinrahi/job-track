<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Expense extends Model
{
    protected $table = 'expenses';
    protected $fillable = [
        'name', 
        'type',
        'amount'
    ];

    public function getExpenses(): Collection | Array 
    {
        return $this->query()
                    ->select('id', 'name', 'type', 'amount')
                    ->get();
    }

    public function newRecord(array $input): self {
        return self::create([
            'name' => $input['name'],
            'type' => $input['type'],
            'amount' => $input['amount'],
        ]);
    }

    public function getCreatedAtAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getUpdatedAtAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function updateRecord(Self $self, array $input): self
    {
        $self->name = $input['name'];
        $self->type = $input['type'];
        $self->amount = $input['amount'];
        $self->save();

        return $self;
    }

    public function deleteRecord(Expense $expense): bool
    {
        return $expense->delete();
    }
}
