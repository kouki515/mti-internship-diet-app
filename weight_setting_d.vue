<template>
<head>
    <title>目標体重の記入</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
</head>
<body>
    <div class="ui container">
        <h1 class="ui center aligned header">目標体重の記入</h1>
        <form class="ui form" action="/submit_goal_weight" method="post">

            <div class="field">
                <label for="target_weight">目標体重（kg）：</label>
                <input type="number" id="target_weight" name="target_weight" required>
            </div>

            <button class="ui button primary" type="submit">保存</button>
        </form>
    </div>
</body>
</template>
