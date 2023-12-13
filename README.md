# Shopping
![메인사진](https://github.com/anhyojeong/shopping/assets/87750523/a8c22012-b7a4-480a-a1ae-7715c456c448)

이전의 개인 프로젝트는 페이지 이동이 없는 웹이었습니다.</br>
다양한 경험을 더 쌓기 위해 페이지 간 이동이 있고, 리덕스를 통해 전역으로 상태를 관리하는 경험을 해보고자 하였습니다.</br>
이에 쇼핑몰을 만들어 보는 것이 적절하겠다는 생각을 했고, 평소에 갖고 싶었던 옷들을 바탕으로 쇼핑몰 앱을 만들어보았습니다.

---
# 목차
1. 개요
2. 배포주소
3. 구현
4. 사용방법
5. 어려웠던 점
6. 개선점

----

# 1. 개요 
### 프로젝트 이름 : Shopping
### 개발 기간 : 2023년 11월 ~
### 스택 
  - HTML, CSS, JavaScript, React
  - Redux , Props, State : 상태관리
  - FireBase : 사용자 인증, 데이터베이스, 스토리지, 호스팅
    
### 기능
- 사용자 계정
  + 회원가입 및 로그인
  + 주문 내역과 배송 상태 확인

- 제품 관리
  + 카테고리를 통한 제품 분류
   
- 주문 및 결제
   + 주문하기 기능
   + 결제하기 기능
  
- 장바구니 기능
  + 사용자가 상품을 장바구니에 담을 수 있음
  + 장바구니에서 수량 조절




- 검색 기능
   + 브랜드, 상품 이름을 통한 제품 필터링

</br>




# 2. 배포주소
https://shopping-40c59.web.app/
</br>


# 3. 구현
</br>


# 4. 실행
##  회원가입 및 로그인
- 회원가입 시 사용자 정보는 파이어베이스 Authentication에 저장됩니다. </br>
- 로그인을 한 유저의 정보는 redux를 통해 세션스토리지에 저장하여 전역으로 사용자의 정보를 사용하도록 하였습니다. </br>
![회원가입_로그인](https://github.com/anhyojeong/shopping/assets/87750523/af79112e-72b6-49ce-9c7d-0cea5d4a5830)


##  상품 상세 정보 및 장바구니 
- Firestore Database에서 선택한 상품의 상세 정보가져옵니다. </br>
- 장바구니 버튼을 누르면 Firestore Database를 통해 로그인 된 사용자의 장바구니에 저장됩니다. 
![장바구니](https://github.com/anhyojeong/shopping/assets/87750523/f154e4e5-aeb9-4f92-90a5-9c99f5f2034c)

##  결제내역
- Firestore Database에서 사용자의 최근 일주일 구매 내역 정보가져옵니다. </br>
![주문내역](https://github.com/anhyojeong/shopping/assets/87750523/2d10d9be-2774-4160-bcc6-2345e9ed306b)

</br>

# 5. 어려웠던 점
### setState 비동기
- 문제점
- 해결 방법
</br>



# 6. 개선점







