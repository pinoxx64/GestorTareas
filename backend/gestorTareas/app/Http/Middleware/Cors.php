<?php
namespace App\Http\Middleware;
use Closure;
class Cors
{
  public function handle($request, Closure $next)
  {
    return $next($request)
      ->header("Access-Control-Allow-Origin", "http://127.0.0.1:8000")
      ->header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
      ->header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Token-Auth, Authorization"); 
  }
}