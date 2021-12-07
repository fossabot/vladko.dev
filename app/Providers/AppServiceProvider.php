<?php

namespace App\Providers;

use Clockwork\Support\Laravel\ClockworkMiddleware;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use Spatie\Honeypot\ProtectAgainstSpam;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->isLocal()) {
            $this->app->register(\Clockwork\Support\Laravel\ClockworkServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Kernel $kernel, Guard $auth)
    {
        Livewire::addPersistentMiddleware([
            ProtectAgainstSpam::class
        ]);

        if ($this->app->isLocal()) {
            $kernel->prependMiddleware(ClockworkMiddleware::class);
        }

    }
}
