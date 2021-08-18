<?php

namespace Aqua\Aquastrap\Crypt;

use Aqua\Aquastrap\Exceptions\CryptException;
use Aqua\Aquastrap\Contracts\Crypto;

class Crypt {
    public static $config;

    protected static function getCrypter() {
        $config = config('aquastrap.encryption');
        $strategy = data_get($config, 'default');
        $crypterClass = data_get($config, 'strategy.' . $strategy . '.crypter');

        $crypterReflection = new \ReflectionClass($crypterClass);

        throw_unless(
            $crypterReflection->implementsInterface(Crypto::class), 
            CryptException::shouldImplementContract($strategy, (string) Crypto::class)
        );

        return $crypterClass;
    }

    public static function Encrypt(string $content) :string
    {
        $crypter = self::getCrypter();

        try {
            $encrypted = $crypter::Encrypt($content);

            return $encrypted;
        }
        catch ( \Exception $e ) {
            throw CryptException::failedToEncrypt($crypter);
        }
    }

    public static function Decrypt(string $content) 
    {
        $crypter = self::getCrypter();

        try {
            $decrypted = $crypter::Decrypt($content);

            return $decrypted;
        }
        catch ( \Exception $e ) {
            throw CryptException::failedToDecrypt($crypter);
        }
    }
}