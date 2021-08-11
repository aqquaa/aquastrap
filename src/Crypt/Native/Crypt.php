<?php

namespace Devsrv\Aquastrap\Crypt\Native;

use Devsrv\Aquastrap\Contracts\Crypto;
use Illuminate\Support\Facades\Crypt as NativeCrypt;

class Crypt implements Crypto {
    public static function Encrypt(string $content) : string {
        return NativeCrypt::encryptString($content);
    }

    public static function Decrypt(string $content) : string {
        return NativeCrypt::decryptString($content);
    }
}