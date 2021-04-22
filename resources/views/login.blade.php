<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="favicon.ico">
    <title>
        {{ config('app.name') }}
    </title>
    @foreach (config('plugins.css', []) as $css)
    <link href="{{ $css }}?{{filemtime(public_path($css))}}" rel="stylesheet">
    @endforeach
</head>

<body>
    <noscript>
        <strong>Por favor habilite Javascript.</strong>
    </noscript>
    <div id="app"></div>
    @foreach (config('plugins.javascript_before', []) as $javascript)
    <script src="{{ $javascript }}?{{filemtime(public_path($javascript))}}" defer></script>
    @endforeach
    @foreach (config('plugins.javascript', []) as $javascript)
    <script src="{{ $javascript }}?{{filemtime(public_path($javascript))}}" defer></script>
    @endforeach
</body>

</html>