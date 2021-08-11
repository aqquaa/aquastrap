<?php

namespace Devsrv\Aquastrap\Contracts;

interface Crypto {
    public static function Encrypt(string $plainContent) : string;

    public static function Decrypt(string $encryptedContent) : string;
}