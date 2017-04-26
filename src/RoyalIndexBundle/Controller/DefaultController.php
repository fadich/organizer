<?php

namespace RoyalIndexBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('RoyalIndexBundle:Default:index.html.twig');
    }
}
