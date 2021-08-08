<?php

namespace Devsrv\Aquastrap\Exceptions;

use RuntimeException;

class CryptException extends RuntimeException
{
    public static function haliteKeyMissing()
    {
        return new static("Aquastrap Crypt Exception: Halite encryption key missing");
    }

    public static function failedToEncrypt($content = '')
    {
        return new static("Aquastrap Crypt Exception: Unable to encrypt. {$content}");
    }

    public static function failedToDecrypt($content = '')
    {
        return new static("Aquastrap Crypt Exception: Unable to decrypt.  {$content}");
    }
}
