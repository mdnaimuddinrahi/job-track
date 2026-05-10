<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Blog extends Model
{
    protected $table = 'blogs';
    protected $fillable = [
        'title',
        'description',
        'image',
        'tags',
        'likes',
        'is_saved',
    ];

     protected $casts = [
        'tags' => 'array',
    ];

     public function getBlogs(int $isSaved, string $sortBy): Collection | array {
        return $this->query()
                    ->when($isSaved != 2, function($query) use ($isSaved) {
                        $query->where('is_saved', $isSaved);
                    })
                    ->when(!empty($sortBy), function($query) use ($sortBy) {
                            $query->orderBy($sortBy, 'DESC');
                    })
                    ->select('id', 'title', 'likes', 'is_saved', 'created_at', 'image', 'tags')
                    ->get();
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getRelatedBlogs(int $videoId, array $tags): Collection | array
    {
        $query = $this->
           where('id', '!=', $videoId);

        if (!empty($tags)) {
            $query->where(function ($q) use ($tags) {
                foreach ($tags as $tag) {
                    $q->orWhereJsonContains('tags', $tag);
                }
            });

            // 🔥 rank by matching tags count
            $matchCountSql = collect($tags)
                ->map(fn($tag) => "JSON_CONTAINS(tags, '\"$tag\"')")
                ->implode(' + ');

            $query->select('id', 'title', 'likes', 'is_saved', 'created_at', 'image', 'tags')
                ->selectRaw("($matchCountSql) as match_count")
                ->orderByDesc('match_count');
        }


        return $query->get();
    }
}
