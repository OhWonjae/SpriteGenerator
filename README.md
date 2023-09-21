# Sprite Generator 👵👴
# 이미지를 업로드하면 해당 이미지들을 하나로 모아서 다운받을 수 있게 해줍니다.

-----------------------
# Description
이미지 스프라이트(image sprite)란 여러 개의 이미지를 하나의 이미지로 합쳐서 관리하는 이미지를 의미합니다.

이미지 스프라이트(image sprite)를 사용하면 이미지를 다운받기 위한 서버 요청을 단 몇 번으로 줄일 수 있습니다.

> 이미지 삽입 / Sprite 이미지 배치 / 이미지 다운로드 / Sprite 이미지 상대좌표 스타일 정보
<img width="1191" alt="image" src="https://github.com/OhWonjae/SpriteGenerator/assets/43844233/5ac5ab0e-9431-46ab-9aff-96662008e38f">


# How to Use

## 1. 이미지 삽입
> Drag & Drop / 파일탐색기로 원하는 이미지를 삽입할 수 있습니다. 
<img width="921" alt="image" src="https://github.com/OhWonjae/SpriteGenerator/assets/43844233/2f258042-e90f-4f97-a5d5-bfbe16514d26">

## 2. 만들어진 스프라이트 이미지 다운로드
> 삽입된 이미지의 스프라이트를 확인 후 Download Image 버튼을 눌러줍니다.
<img width="1255" alt="image" src="https://github.com/OhWonjae/SpriteGenerator/assets/43844233/b5042faa-fc35-409f-820d-b1dfe431a235">

## 3. 다운받은 스프라이트 이미지 사용
> 출력된 Output StyleSheet 내용을 복사 후 해당 클래스를 적용해 줍니다.
<img width="1008" alt="image" src="https://github.com/OhWonjae/SpriteGenerator/assets/43844233/b139ae4e-af98-46e5-ada4-eed85b3c3b64">

# MaxRects Algorithm

## Reference
> Sprite 배치 알고리즘 - Maxrects (https://tibyte.kr/240)

## 1. 배치 할 수 있는 영역 확인
> 영역안에 들어갈 수 있는 이미지가 없다면 가장 처음 만들어진 영역을 선택합니다.
> 만약 영역이 없다면 영역 자체의 크기를 늘려줍니다.
<img width="851" alt="image" src="https://github.com/OhWonjae/SpriteGenerator/assets/43844233/af88fa5d-0cf7-4318-b475-e531dd5d9117">

## 2. 이미지 배치 후 해당 영역 다시 나누기
> 배치된 이미지와 곂치는 영역을 확인 후 이미지의 상하좌우로 영역을 다시 나눠줍니다.
> 이과정에서 기존 영역에 포함되거나 새로 만들어진 영역끼리 포함관계가 있으면 포함된 영역을 제거해 줍니다.
<img width="1205" alt="image" src="https://github.com/OhWonjae/SpriteGenerator/assets/43844233/1de74261-66ba-4d04-a71c-978ed4058066">
 
















## 기술 스택

> React v18
> Typescript
> webpack v5
> Jest


