# React Shop

## 소개

Fake Store API에서 상품 정보를 받아서 프론트엔드 작업을 한 것입니다.

원래 '제로베이스'라는 학원의 조별 과제로 진행이 되었고, 그 후 제가 더 보완을 하였습니다.

원래 조별 과제의 결과물은 다음 페이지에서 확인하실 수 있습니다.

https://github.com/zerobase-frontend-team/React-Shop

## 주요 사용 기술

프레임워크: React

CSS: Tailwind CSS

상태 관리: Redux Tookit, React Context (API)

언어: TypeScript

라우팅: React Router

번들링: Vite

## 다른 곳의 기술을 사용한 것

CSS: daisyUI

캐러셀: React Responsive Carousel

## 전역 상태 관리

### Redux Toolkit

|여러 store가 모이는 곳|

'src/store.ts'입니다.

|상품 정보|

'src/store/product.ts'에서 확인하실 수 있습니다.

'Fake Store API'를 사용했습니다.

'createAsyncThunk'를 사용해 로딩을 할 때는 skeleton을, 오류가 생길 때는 오류 메시지를 출력할 수 있도록 하였습니다.

|장바구니|

'src/store/cart.ts'에서 확인하실 수 있습니다.

고객이 장바구니를 조작하면 관련 정보가 해당 store에 들어갑니다. 어떠한 물건을 얼마나 넣었는지, 그리고 총 넣은 수는 얼마인지를 관리합니다.

### React Context (API)

|테마 변경|

라이트모드와 다크모드를 사용하는 것입니다.

App.tsx에서 themeContext를 확인하시면 됩니다.

## 페이지별 소개

### 헤더

로고: 클릭을 하면 홈페이지로 이동합니다.

카테고리: 클릭을 하면 해당 카테고리 페이지로 이동합니다.

달 및 해: 클릭을 하면 테마를 변경합니다.

검색창: 상품을 검색하는 곳입니다. 무엇인가를 입력하면 해당 글자를 포함하는 상품들이 보여지게 되고, 그중 하나를 선택하면 해당 상품 페이지로 이동합니다.

장바구니: 클릭을 하면 장바구니 페이지로 이동합니다. 오른쪽 상단에는 총 넣은 수가 표시됩니다.

### 푸터

제로베이스 링크: 클릭을 하면 '제로베이스'로 이동합니다. 해당 페이지는 새 탭에서 열립니다.

카드사: 마우스를 올리면 해당 카드사의 이름이 tooltip으로 뜹니다.

SNS: 마우스를 올리면 해당 SNS의 이름이 뜨고, 클릭을 하면 관련 페이지로 이동합니다.

### 홈페이지

위치: '/'

캐러셀: '바로가기' 버튼을 클릭하면 해당 카테고리 페이지로 이동합니다.

카테고리별로 상품 보여주기: 화면 크기 상 카테고리별로 4개의 상품만 보이도록 했습니다. 상품을 클릭하면 해당 상품 페이지로 이동합니다.

### 카테고리 페이지

위치: '/fashion', '/accessory', '/digital'

내용: 카테고리별로 모든 상품이 보이도록 했습니다. 상품을 클릭하면 해당 상품 페이지로 이동합니다.

### 상품 페이지

위치: 'product/:해당 상품 아이디'

장바구니에 담기: 해당 버튼을 클릭하면 해당 상품이 장바구니에 담깁니다.

장바구니로 이동: 해당 버튼을 클릭하면 장바구니 페이지로 이동합니다.

### 장바구니 페이지

|아무것도 담기지 않은 상태|

'담으러 가기'를 클릭하면 홈페이지로 이동합니다.

|무엇인가가 담긴 상태|

상품 정보가 나와 있는 부분: 사진을 클릭하면 해당 상품 페이지로 이동합니다. '+'와 '-'를 통해 수량을 조절할 수 있습니다.

총 얼마인지가 나와 있는 부분: '구매하기'를 클릭하면 모달이 뜹니다.

## 반응형

반응형으로 제작하였습니다. 화면 사이즈를 조절해 보시기 바랍니다.

## 원래 제가 한 역할

prettier 설정을 관리했습니다.

헤더와 푸터를 만들었습니다.

상품 정보의 전역 상태를 관리하였습니다.

홈페이지를 만들었습니다.

테마 변경 기능을 만들었습니다.

## 나중에 제가 업데이트한 부분

검색 기능을 완성했습니다.

원래 카테고리별로 상품을 보여주는 것을 하나의 컴포넌트로 만들고, 홈페이지와 카테고리 페이지 둘 다에 쓸 수 있도록 했습니다. 근데 다른 조원이 독립적으로 카테고리 페이지를 만들어서 해당 컴포넌트를 두 페이지 모두에 쓸 수 없었습니다. 이를 두 페이지 모두에 쓸 수 있도록 변경했습니다.

상품 페이지의 경우 skelton이 되지 않는 등 여러 문제가 있었습니다. 이를 수정했습니다.

TypeScript의 타입 부분을 수정했습니다. 기존에는 여기저기서 타입을 지정했다면 store에서 타입을 지정해서 수출을 하는 방식으로 바꾸었습니다. 또한 any를 줄였습니다.

'Fake Store API'의 URL을 .env 파일을 통해 환경 변수로 만들었습니다.

main 부분의 높이가 낮을 때, footer가 올라오는 것을 방지했습니다.

## 진행 과정에 대한 회고

해당 페이지를 참고해 주시기를 바랍니다.

https://badascoding.net/retrospection-zerobase-project
