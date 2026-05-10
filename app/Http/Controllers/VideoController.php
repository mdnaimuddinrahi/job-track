<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $title = $request->search ?? '';
        $tags = $request->tags ?? [];
        return VideoResource::collection((new Video())->getVideos($title, $tags));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $video = (new Video())->create($input);

        return response()->json(['data' => $video]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        return response()->json(['data' => $video]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Video $video)
    {
        $data = $request->all();

        $video->update($data);

        return response()->json(['data' => $video]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        $video->delete();

        return response()->json(['message' => 'Successfuly Delete']);
    }

    public function relatedVideos(Request $request) {
        $videoId = $request->id;
        $tags = $request->tags ?? [];
        $titleTags = empty($request->title) ? '' : array_filter(explode(' ', strtolower($request->title)));
        // dd($titleTags);

        
        return response()->json(['data' => (new Video())->getRelatedVideos($videoId, $tags, $titleTags)]);
    }
}
