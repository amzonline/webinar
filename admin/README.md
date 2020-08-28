# Webinar

## IDE 설정
* NODE 파라미터 : node -r babel-register ./bin/www
* 환경 변수 : DEBUG=webinar:*
* File Watcher : BABEL
    * Babel : ES6를 ES5로 변환시켜주는 트랜스파일러
    * 인자 : $FilePathRelativeToProjectRoot$ --out-dir dist --source-maps --presets env
    * Output : dist/$FileDirRelativeToProjectRoot$/$FileNameWithoutExtension$.js:dist/$FileDirRelativeToProjectRoot$/$FileNameWithoutExtension$.js.map
    * Working Root : $ContentRoot$

## 마크다운 도움말

https://gist.github.com/ihoneymon/652be052a0727ad59601
