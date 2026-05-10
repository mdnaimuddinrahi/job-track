<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;


class Tag extends Model
{
    protected $table = 'tags';

    protected $fillable = [
        'name', 'type', 'slug'
    ];

    const TYPE_VIDEO = 1;
    const TYPE_BLOG = 2;

    public function getTags(int $type): Collection|array {
        return $this
                ->query()
                ->where('type', $type)
                ->latest()
                ->select('id', 'name')
                ->get();
    }
}
