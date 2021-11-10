<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVacanciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('workNiche');
            $table->string('requirements');
            $table->mediumText('description');
            $table->date('dateCreate');
            $table->date('dateEnd');
            $table->string('adress');
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('id')->on('company_profile');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vacancies');
    }
}
