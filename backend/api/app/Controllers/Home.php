<?php

namespace App\Controllers;


class Home extends BaseController
{
    public function index()
    {
        return view('welcome_message');
    }
    public function getAll_api()
    {
        return $this->response->setJSON('api responded with this message!');
    }

    public function submitImage()
    {
        // helper('form');

        // $mett = $this->request->getVar('image');
        $file = $this->request->getFile('image');

        $name = $file->getRandomName();
        $size = $file->getSize('mb');
        $ext = $file->getExtension();
        $type = $file->getType();
        $orig = $file->getTempName();

        if ($file->isValid() && !$file->hasMoved()) {
            $file->move('images/uploads/', $name);
        }

        $dataToSave = array(
            'title' => $name,
            'size' => $size,
            'ext' => $ext,
            'type' => $type,
            'orig' => $orig
        );

        return $this->response->setJSON($dataToSave);
    }
}
