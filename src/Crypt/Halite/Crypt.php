<?php

namespace Aqua\Aquastrap\Crypt\Halite;

use ParagonIE\Halite\KeyFactory;
use ParagonIE\HiddenString\HiddenString;
use Aqua\Aquastrap\Exceptions\CryptException;
use ParagonIE\Halite\Symmetric\Crypto as Symmetric;
use ParagonIE\Halite\Symmetric\EncryptionKey;
use Aqua\Aquastrap\Contracts\Crypto;

class Crypt implements Crypto {
    protected static function getKey() : EncryptionKey {
        $key = config('aquastrap.encryption.strategy.halite.key_path');

        throw_unless(file_exists($key), CryptException::haliteKeyMissing());

        return KeyFactory::loadEncryptionKey($key);
    }

    public static function Encrypt(string $content) : string {
        $message = new HiddenString($content);

        return Symmetric::encrypt($message, self::getKey());
    }

    public static function Decrypt(string $content) : string {
        return Symmetric::decrypt($content, self::getKey())->getString();
    }
}