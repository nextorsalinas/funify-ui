<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['agency_id', 'name', 'description', 'price', 'image_url', 'category', 'is_active'];

    public function agency() {
        return $this->belongsTo(Agency::class);
    }
}
