<?php

namespace Aqua\Aquastrap\Tests\Pest;

class ExampleClass
{
    public $argOne;
    public $prop;

    public function __construct($argOne, $prop = 'foo')
    {
        $this->argOne = $argOne;
        $this->prop = $prop;
    }

    public function pubMet() {}
    public function anotherPubMet() {}
    protected function protMet() {}
    private function privMet() {}
}