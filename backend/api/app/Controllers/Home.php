<?php

namespace App\Controllers;

use CodeIgniter\I18n\Time;
// use CodeIgniter\I18n\TimeDifference;


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

        $timestamp = time();
        $name = $timestamp;
        // $name = $file->getRandomName();
        $size = $file->getSize('mb');
        $ext = $file->getExtension();
        $type = $file->getType();
        $orig = $file->getTempName();

        if ($file->isValid() && !$file->hasMoved()) {
            $file->move('images/uploads/', $name);
        }

        ///////////// manimulate the image, save a copy
        $image = \Config\Services::image()
            ->withFile('images/uploads/' . $name)
            // ->reorient()
            // ->rotate(90)
            // ->crop(100, 100, 0, 0)
            ->save('images/uploads/' . $name . '_thumb.jpg', 50);


        // delete the originalImage
        //unlink('images/uploads/' . $name);

        $dataToSave = array(
            'title' => $name,
            'size' => $size,
            'ext' => $ext,
            'type' => $type,
            'orig' => $orig
        );

        return $this->response->setJSON($dataToSave);
    }

    public function getList()
    {
        $myArray = [];

        for ($i = 1; $i < 5; $i++) {
            array_push($myArray, (object)[
                'id' => $i,
                'title' => 'title_' . $i . '_' . uniqid(),

            ]);
        }

        return $this->response->setJSON($myArray);
    }

    public function getBatchList($num)
    {
        $myArray = [];
        $divInto = 5;

        for ($i = 0; $i < 15; $i++) {
            array_push($myArray, (object)[
                'id' => $i,
                'title' => 'title_' . ($i + 1) . '-' . uniqid(),

            ]);
        }

        $chunked = array_chunk($myArray, $divInto);
        $exampleTime = Time::parse('2/28/2022 08:35:01');
        $timeNow = new Time('now');
        $diff = $timeNow->difference($exampleTime);
        $tosend = array(
            'arraySize' => count($myArray),
            'arrayChunked' => $chunked,
            'data' => $chunked[$num - 1],
            'div' => count($chunked),
            'timeNow' => new Time('now'),
            'parsed' => $exampleTime->isBefore($timeNow),
            'parsed2' => $timeNow->isAfter($exampleTime),
            'timeDiff' => $diff->humanize(),
        );

        return $this->response->setJSON($tosend);
    }
}
