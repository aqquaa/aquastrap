<?php 

use Aqua\Aquastrap\ExtractDependencies;

it('cant extract deps when class has zero deps requirement', function() {
    class ExampleClassWithoutDeps {
        public function foo() {}
    }

    $instance = new ExampleClassWithoutDeps;

    $deps = (new ExtractDependencies)->for($instance);

    expect($deps)->toBeArray()->toHaveCount(0);
});

it('cant extract deps when class has deps requirement', function() {
    class ExampleClassWithDeps {
        public $param1;
        public $param2;
    
        public function __construct($param1, $param2) {
            $this->param1 = $param1;
            $this->param2 = $param2;
        }
        public function foo() {}
    }

    $instance = new ExampleClassWithDeps('emerald', 'sky');

    $deps = (new ExtractDependencies)->for($instance);

    expect($deps)->toMatchArray([
        'param1' => 'emerald', 
        'param2' => 'sky'
    ]);
});

it('cant extract deps when class has deps requirement including default arg', function() {
    class ExampleClassWithDepsAndDefaultArg {
        public $param1;
        public $param2;
        public $param3;
    
        public function __construct($param1, $param2, $param3 = 'indigo') {
            $this->param1 = $param1;
            $this->param2 = $param2;
            $this->param3 = $param3;
        }
        public function foo() {}
    }

    $instance = new ExampleClassWithDepsAndDefaultArg('emerald', 'sky');

    $deps = (new ExtractDependencies)->for($instance);

    expect($deps)->toMatchArray([
        'param1' => 'emerald', 
        'param2' => 'sky',
        'param3' => 'indigo',
    ]);
});

it('cant extract deps when class has deps requirement having one arg type-hinted as some class instance', function() {
    class fooModel {
        public $arg;
        public function __construct($arg) {
            $this->arg = $arg;
        }
        public function getArg() { return $this->arg; }
    }

    class ExampleClassHavingTypeHintedArg {
        public $model;
        public $param2;
    
        public function __construct(fooModel $model, $param2) {
            $this->model = $model;
            $this->param2 = $param2;
        }
        public function foo() {}
    }

    $model = new fooModel(1);
    $instance = new ExampleClassHavingTypeHintedArg($model, 'sky');

    $deps = (new ExtractDependencies)->for($instance);

    expect($deps)
        ->toHaveKeys(['model', 'param2'])
        ->model->toBeInstanceOf(fooModel::class)
        ->model->getArg()->toEqual(1)
        ->param2->toEqual('sky');
});

it('cant extract deps when class has closure deps requirement', function() {
    class ExampleClassHavingClosureArg {
        public $param1;
        public $closure;
    
        public function __construct($param1, \Closure $closure) {
            $this->param1 = $param1;
            $this->closure = $closure;
        }
        public function run() { call_user_func($this->closure); }
    }

    $instance = new ExampleClassHavingClosureArg('sky', fn() => 10);

    $deps = (new ExtractDependencies)->for($instance);

    expect($deps)
        ->toHaveKeys(['param1', 'closure'])
        ->param1->toEqual('sky')
        ->closure->toBeCallable()
    ->and(call_user_func($deps['closure']))->toEqual(10);
});

it('cant extract deps when class has static prop and deps requirement', function() {
    class ExampleClassHavingStaticProp {
        public static $color = 'green';
    
        public function __construct($color) {
            self::$color = $color;
        }
    }

    $instance = new ExampleClassHavingStaticProp('sky');

    $deps = (new ExtractDependencies)->for($instance);

    expect($deps)
        ->toHaveCount(1)
        ->toHaveKey('color')
        ->color->toEqual('sky');
});