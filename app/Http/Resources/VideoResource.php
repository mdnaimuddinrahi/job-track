<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'author' => $this->author,
            'avatar' => $this->avatar,
            'published_at' => $this->published_at,
            'duration' => gmdate("i:s", $this->duration_seconds),
            'views' => $this->views,
            'video_url' => $this->video_url,
            'thumbnail' => $this->thumbnail,
            'tags' => $this->tags,
            'likes' => $this->likes,
            'unlikes' => $this->unlikes,
        ];
    }
}
