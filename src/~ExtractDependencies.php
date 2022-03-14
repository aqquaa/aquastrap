<?php

namespace Aqua\Aquastrap;

class ExtractDependencies
{
    /**
     * from class instance extract constructor dependencies
     *
     * @param object $instance
     * @return array dependencies as assoiative array
     */
    public function for(object $instance): array
    {
        $constructorArgs = [];

        $reflectionRef = new \ReflectionClass($instance);
        $classConstructor = $reflectionRef->getConstructor();

        if ($classConstructor) {
            $parameters = $classConstructor->getParameters();

            foreach ($parameters as $param) {
                $paramName = $param->getName();

                if (property_exists($instance, $paramName)) {
                    $reflectionProperty = $reflectionRef->getProperty($paramName);

                    $constructorArgs[$paramName] = $reflectionProperty->isStatic()
                                                    ? $reflectionRef->getStaticPropertyValue($paramName)
                                                    : $instance->{$paramName};

                    continue;
                }

                if ($param->isDefaultValueAvailable()) {
                    $constructorArgs[$paramName] = $param->getDefaultValue();
                }
            }
        }

        return $constructorArgs;
    }
}
