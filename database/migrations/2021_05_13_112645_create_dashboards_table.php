<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDashboardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dashboards', function (Blueprint $table) {
            $table->id();
            $table->string('key')->nullable();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon');
            $table->string('bpmn')->nullable();
            $table->string('process_id')->nullable();
            // screen could be relative to bpmn or global.
            // Ex: ./inside.vue  => find inside bpmn folder
            //     global.vue    => find inside published packages
            $table->string('screen')->nullable();
            $table->string('role');
            $table->timestamps();
            $table->unique(['key']);
            $table->index(['role']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dashboards');
    }
}
