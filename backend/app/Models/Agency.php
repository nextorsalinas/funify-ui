<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = ['user_id', 'name', 'description', 'logo_url', 'rating'];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function services() {
        return $this->hasMany(Service::class);
    }
    
    public function physicalProducts() {
        return $this->hasMany(PhysicalProduct::class);
    }
}
