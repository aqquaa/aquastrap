<?php

use Aqua\Aquastrap\AquaCallableMethods;

test('only public methods are allowed', function() {
    class SampleTestClass1 {
        public function allowed() { }
        protected function restrictedProtected() { }
        private function restrictedPrivate() { }
    }

    $instace = new SampleTestClass1;

    $allowed = AquaCallableMethods::for(get_class($instace));

    expect($allowed)->toHaveCount(1)->toContain('allowed');
});

test('aqua methods are restricted', function() {
    class SampleTestClassWithAquaMethods {
        public function allowed() { }
        public function _aquaDrips() { }
        public function info() { }
        protected function restrictedProtected() { }
        private function restrictedPrivate() { }
    }

    $instace = new SampleTestClassWithAquaMethods;

    $allowed = AquaCallableMethods::for(get_class($instace));

    expect($allowed)->toHaveCount(1)->toContain('allowed');
});

test('parent class public methods are restricted', function() {
    class SampleTestParentClass {
        public function parentPublic() { }
        protected function parentRestrictedProtected() { }
        private function parentRestrictedPrivate() { }
    }

    class SampleTestClassExtendingParent extends SampleTestParentClass {
        public function allowed() { }
        public function _aquaDrips() { }
        protected function restrictedProtected() { }
        private function restrictedPrivate() { }
    }

    $instace = new SampleTestClassExtendingParent;

    $allowed = AquaCallableMethods::for(get_class($instace));

    expect($allowed)->toHaveCount(1)->toContain('allowed');
});

test('explicitly guarded methods are restricted', function() {
    class SampleTestClassWithGuardedMethods {
        protected static $aquaGuarded = ['save'];
        public function get() { }
        public function save() { }
    }

    $instace = new SampleTestClassWithGuardedMethods;

    $allowed = AquaCallableMethods::for(get_class($instace));

    expect($allowed)->toHaveCount(1)->toContain('get');
});

test('if allowed only list exists then nothing other than those methods allowed', function() {
    class SampleTestClassWithAllowOnlyMethods {
        protected static $aquaCallable = ['save'];
        public function pocess() { }
        public function save() { }
        public function _aquaDrips() { }
        protected function restrictedProtected() { }
        private function restrictedPrivate() { }
    }

    $allowed = AquaCallableMethods::for(SampleTestClassWithAllowOnlyMethods::class);

    expect($allowed)->toHaveCount(1)->toContain('save');
});