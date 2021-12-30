<h1>AQUA</h1>

<ul>
    <li>{{ array_key_exists('id', $_aquaDrips) ? 'has recipe id' : '' }}</li>
    <li>{{ array_key_exists('key', $_aquaDrips) ? 'has recipe key' : '' }}</li>
    <li>{{ array_key_exists('ingredient', $_aquaDrips) ? 'has recipe ingredient' : '' }}</li>
    <li>{{ array_key_exists('methods', $_aquaDrips) ? 'has recipe methods' : '' }}</li>
</ul>