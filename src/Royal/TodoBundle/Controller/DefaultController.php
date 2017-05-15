<?php

namespace Royal\TodoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->redirect('http://127.0.0.1:6969');
    }
}
