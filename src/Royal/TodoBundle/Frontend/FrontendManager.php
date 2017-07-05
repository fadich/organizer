<?php

namespace Royal\TodoBundle\Frontend;

/**
 * Class FrontendManager
 * @package Royal\TodoBundle\Frontend
 *
 * @property string $indexUrl
 */
class FrontendManager
{
    protected $indexUrl = 'http://127.0.0.1:3000';

    protected function getIndexUrl()
    {
        return $this->indexUrl;
    }

    /**
     * Getter magic method.
     *
     * @param string $name
     *   Name of the getting property.
     *
     * @return mixed
     *   A getter value.
     *
     * @throws \InvalidArgumentException
     */
    public function __get(string $name)
    {
        $getter = "get{$name}";
        if ($this->hasMethod($getter)) {
            return $this->$getter();
        } elseif ($this->hasMethod("set{$name}")) {
            throw new \InvalidArgumentException(__CLASS__ . "::{$name} is write-only property");
        } else {
            throw new \InvalidArgumentException("Trying to get unknown property: " . __CLASS__ . "::{$name}");
        }
    }

    public function hasMethod($name)
    {
        return method_exists($this, $name);
    }
}