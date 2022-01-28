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
        $time1 = Time::parse('1/28/2022 08:35:01');
        $time2 = new Time('now');
        $diff = $time2->difference($time1);
        $tosend = array(
            'arraySize' => count($myArray),
            'data' => $chunked[$num - 1],
            'div' => count($chunked),
            'time' => new Time('now'),
            'parsed' => $time1->isBefore($time2),
            'parsed2' => $time2->isAfter($time1),
            'timeDiff' => $diff->humanize()
        );

        return $this->response->setJSON($tosend);
    }
}
