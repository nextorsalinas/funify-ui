<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'agency_id',
        'client_name',
        'client_email',
        'client_phone',
        'event_date',
        'event_location',
        'status',
        'total_amount',
        'client_notes'
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
