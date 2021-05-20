<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" href="favicon.ico">
    <title>{{ config('app.name') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @if(Auth::user())
    <meta name="user-id" content="{{ Auth::id() }}">
    <meta name="broadcaster-host" content="{{env('BROADCASTER_HOST')}}">
    <meta name="broadcaster-key" content="{{env('BROADCASTER_KEY')}}">
    @endif
    @foreach (config('plugins.css', []) as $css)
    <link href="{{ $css }}?{{filemtime(public_path($css))}}" rel="stylesheet">
    @endforeach
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
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