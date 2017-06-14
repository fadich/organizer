<?php

namespace Royal\TodoBundle\Controller;

use Royal\TodoBundle\Frontend\FrontendManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /** @var  \Royal\TodoBundle\Frontend\FrontendManager */
    public $frontendManager;

    public function __construct()
    {
        $this->frontendManager = new FrontendManager();
    }

    public function indexAction()
    {
        return $this->redirect($this->frontendManager->indexUrl);
    }
}
