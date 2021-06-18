<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $roles)
    {
        $exploded_role = explode("|", $roles);
        foreach($exploded_role as $role) {
            if ($request->user()->peran == $role) {
                return $next($request);
            }
        }
        
        return redirect()->route('dashboard');
    }
}
