<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return view('index');
    }
    public function getAll_api()
    {
        return $this->response->setJSON('api responded with this message!');
    }
}
