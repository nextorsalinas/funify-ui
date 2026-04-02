<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'purchasable_type',
        'purchasable_id',
        'quantity',
        'price_at_booking'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function purchasable()
    {
        return $this->morphTo();
    }
}
