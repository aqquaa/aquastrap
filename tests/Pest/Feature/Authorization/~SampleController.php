<?php

class AquaController extends BaseController {
    use AquaSync;

    public function __construct() { }

    protected function protectedMet() { }
    private function privateMet() { }

    public function store()
    {
        return $this->success('successfully stored')
        ->setStatusCode(201)
        ->setContent(['post_id' => 1]);
    }

    public function show()
    {
        return view('profile', ['comment' => 'bar'])->with($this->aquaRecipes());
    }
}