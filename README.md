# WHAT'S THIS

都議会選挙、候補者のウェブサイトのデータをクロールしてローカルに保存します。
気になるキーワードでローカルでgrepするなどして検討することが出来ます。

# USAGE

```
node download.js -i 0
```

n番目の候補者からダウンロードを再開したい場合は-iにインデックスを指定。
うまくいかない時は-iの値をカウントアップしながら粘ってください。

## データ元
http://www.h29togisen.metro.tokyo.jp/election/list.html
