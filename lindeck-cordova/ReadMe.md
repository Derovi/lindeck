
Установка неообходимого

0) ```npm install -g cordova```

1) ```cordova platform add android``` 

1) Скачать Android Studio https://developer.android.com/studio/install (oprional). От неё нам нужен только
 Эмулятор который предустанавливается и /Android/ папка.
 
2) Либо из стуидо либо найти в интернете папку Android  (optional она должна находится в ~/ , Все пути ниже используют папку в ~/Android)
    Там должна быть папка Android/Sdk 
    В Sdk должны быть
    build-tools , tools как минимум 

3) Так же должны быть прописаны пути в файле -> ~/.bashrc :
    (Пути к джаве и андроиду могут быть другими) 
    export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
    export PATH=${PATH}:${JAVA_HOME}/bin
    export ANDROID_HOME=~/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-too
    export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$PATH
   ```
    
4) Принять лицензию ```cd ~/Android/Sdk/tools/bin/```, ```./sdkmanager --licenses```

---
ЗАПУСК 

5)  ```chmod +x cordova.sh``` 
2) ```./cordova.sh```

* errors 
- Если не ранится, попробовать 
    ```
    adb kill-server 
    adb start-server
    ```
  и сново зааранить
- Если и при этом не ранится, запустить скрипт руками :) Можно запускать сначала sh а потом sudo cordova run
 