<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Video extends Model
{

    protected $table = 'videos';

    protected $fillable = [
        'title',
        'description',
        'author',
        'avatar',
        'published_at',
        'duration_seconds',
        'views',
        'video_url',
        'thumbnail',
        'tags',
        'likes',
        'unlikes',
    ];
    
    protected $casts = [
        'tags' => 'array',
        'published_at' => 'date',
    ];

    /**
     * get all videos
     */
    public function getVideos(string $title, array $tags): LengthAwarePaginator {
        return $this->query()
                    ->when(!empty($title), function($query) use ($title) {
                        $query->where('title', 'like', '%'. $title. '%');
                    })
                    ->when(!empty($tags), function($query) use ($tags) {
                            $query->where(function ($q) use ($tags) {
                                    foreach ($tags as $tag) {
                                    $q->orWhereJsonContains('tags', $tag);
                                }
                            });
                    })
                    ->latest()
                    ->paginate(10);
    }

    public function getPublishedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M d, Y');
    }

    public function getRelatedVideos(int $videoId, array $tags = [], array $titleTags = []): Collection | array
    {
        $query = $this->
           where('id', '!=', $videoId);
        
        if (!empty($titleTags)) {
            $query->where(function ($q) use ($titleTags) {
                foreach ($titleTags as $word) {
                    $q->orWhere('title', 'LIKE', "%{$word}%");
                }
            });
        }

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

            $query->select('id', 'title', 'views', 'published_at', 'thumbnail', 'duration_seconds as duration', 'tags')
                ->selectRaw("($matchCountSql) as match_count")
                ->orderByDesc('match_count');
        } 

        return $query->get();
    }

    public function getDurationAttribute($value) 
    {
        return gmdate("i:s", $value);
    }

    public function getCreatedAtAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getUpdatedAtAttribute(string $value): string
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}
