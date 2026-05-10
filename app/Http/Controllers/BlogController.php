<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $isSaved = $request->is_saved ?? 2;
        $sortBy = $request->sort_by ?? '';
        return response()->json((new Blog())->getBlogs($isSaved, $sortBy));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return response()->json(['data' => $blog]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        if($request->has('is_saved')) {
            $blog->is_saved = $request->is_saved;
        }
        
        if($request->has('likes')) {
            $blog->likes = $request->likes;
        }
        $blog->save();

        return response()->json(['message' => 'Blog Updated Successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }

    public function relatedBlogs(Request $request) {
        $blogId = $request->id;
        $tags = $request->tags ?? [];
        
        return response()->json(['data' => (new Blog())->getRelatedBlogs($blogId, $tags)]);
    }
}
