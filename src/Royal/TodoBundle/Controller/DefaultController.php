<?php

namespace Royal\TodoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('RoyalTodoBundle:Default:index.html.twig');
    }
}
