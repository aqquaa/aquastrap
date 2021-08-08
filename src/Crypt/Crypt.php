<?php

namespace Devsrv\Aquastrap\Crypt;

use Devsrv\Aquastrap\Exceptions\CryptException;

class Crypt {
    public static $config;

    private static function getCrypter($type = 'encrypter') {
        $config = config('aquastrap.encryption');

        $strategy = data_get($config, 'default');

        return data_get($config, 'strategy.' . $strategy . '.' . $type);
    }

    public static function Encrypt(string $content) :string
    {
        [$crypter, $encrypt] = self::getCrypter('encrypter');

        try {
            $encrypted = $crypter::{$encrypt}($content);

            return $encrypted;
        }
        catch ( \Exception $e ) {
            throw CryptException::failedToEncrypt($crypter .'::'. $encrypt);
        }
    }

    public static function Decrypt(string $content) 
    {
        [$crypter, $decrypt] = self::getCrypter('decrypter');

        try {
            $decrypted = $crypter::{$decrypt}($content);

            return $decrypted;
        }
        catch ( \Exception $e ) {
            throw CryptException::failedToDecrypt($crypter .'::'. $decrypt);
        }
    }
}