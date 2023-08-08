<template>
<head>
    <title>サインアップ（ダイエッター）</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
</head>
<body>
    <div class="ui container">
        <h1 class="ui center aligned header">サインアップ（ダイエッター）</h1>
        <form class="ui form" action="/signup" method="post">
            <div class="field">
                <label for="email">メールアドレス：</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="field">
                <label for="password">パスワード：</label>
                <input type="password" id="password" name="password" required>
            </div>

            <div class="field">
                <label for="username">ユーザーネーム：</label>
                <input type="text" id="username" name="username" required>
            </div>

            <div class="field">
                <label for="height">身長（cm）：</label>
                <input type="number" id="height" name="height">
            </div>

            <div class="field">
                <label for="weight">体重（kg）：</label>
                <input type="number" id="weight" name="weight">
            </div>

            <div class="field">
                <label for="age">年齢：</label>
                <input type="number" id="age" name="age" required>
            </div>

            <div class="field">
                <label for="secret_word">合言葉：</label>
                <input type="password" id="secret_word" name="secret_word" placeholder="合言葉を決めてください" required>
            </div>

            <button class="ui button primary" type="submit">サインアップ</button>
        </form>
    </div>
</body>
</template>