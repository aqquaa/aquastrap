<?php

use Aqua\Aquastrap\AquaComponent;

test('only public methods are allowed', function () {
    class ExampleComponentWithVariousMethodVisibility extends AquaComponent
    {
        public function pubMethodA() {}
        public function pubMethodB() {}

        private function query() {}
        protected function update() {}

        public function render()
        {
            return view("allowed-methods");
        }
    }

    $methods = $this->component(ExampleComponentWithVariousMethodVisibility::class);
    
    $methods->assertSee('pubMethodA,pubMethodB')
    ->assertDontSee('query')
    ->assertDontSee('update');
});

test('guarded methods are restricted', function () {
    class ExampleComponentWithGuardedMethods extends AquaComponent
    {
        protected static $aquaGuarded = ['pubMethodB'];
        public function pubMethodA() {}
        public function pubMethodB() {}

        public function render()
        {
            return view("allowed-methods");
        }
    }

    $methods = $this->component(ExampleComponentWithGuardedMethods::class);
    
    $methods->assertSee('pubMethodA')
    ->assertDontSee('pubMethodB');
});

test('when allowed only list exists then nothing other than those methods allowed', function () {
    class ExampleComponentWithAllowedOnlyMethods extends AquaComponent
    {
        protected static $aquaCallable = ['save'];
        protected static $aquaGuarded = ['pubMethodB'];
        public function pubMethodA() {}
        public function save() {}
        public function pubMethodB() {}

        public function render()
        {
            return view("allowed-methods");
        }
    }

    $methods = $this->component(ExampleComponentWithAllowedOnlyMethods::class);
    
    $methods->assertSee('save')
    ->assertDontSee('pubMethodB');
});