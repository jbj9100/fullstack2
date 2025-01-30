
// 어쨋든 화살표를 눌렀을때 위로 올라가는건 브라우저에서 해야한다

const backToTop = document.getElementById('backtotop');  

const checkScroll = () => {
    /*
      웹페이지가 수직으로 얼마나 스크롤되었는지를 확인하는 값(픽셀 단위로 반환)
      https://developer.mozilla.org/ko/docs/Web/API/Window/pageYOffset
    */
    let scrollY = window.scrollY; // 스크롤값이 들가 있다.

    if (scrollY !== 0) {   // scrollY가 0이면 스크롤이 맨 위에 있는 상태
        backToTop.classList.add('show'); // 맨위에 있는 상태가 아니니까 show 클래스 추가해서 설정한 시간 동안 원모양이 보인다. visibility: visible
    } else {
        backToTop.classList.remove('show'); // 맨위니까 원모양 제거해서 visibility: hidden
    }

}

const moveBackToTop = ()=>{
    if (window.scrollY > 0) {
        /*
        smooth 하게 스크롤하기
        https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
        */
       window.scrollTo({top: 0, behavior: "smooth"}) // 어디까지 스크롤할지
    }
}

window.addEventListener('scroll', checkScroll); // scroll할때마다 checkScroll 함수를 호출해라
backToTop.addEventListener('click', moveBackToTop); // 아이콘을 클릭했을대 moveBackToTop함수를 호출해라

/*------------------------------------------------------------------------------------------------*/

const transformPrev = (event) =>{
    const slidePrev = event.target;  // 이벤트가 발생한 요소, 즉 Prev버튼
    const slideNext = slidePrev.nextElementSibling; // slidePrev의 다음 형제 요소 (Next 버튼)


    // ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;  //ul.class-list
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');
    
}


const slidePrevList = document.getElementsByClassName('slide-prev') //왼쪽 버튼 활성화
//parentElement: 바로 위의 부모 요소를 가져옴
//nextElementSibling: 같은 레벨의 다음 요소를 가져옴
for (let i=0; i<slidePrevList.length; i++){
    // ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    // ul 태그안에 li 태그목록을 리스트로
    let liList = classList.getElementsByTagName('li')

    // 전체카드가 ul 태그 너비보다 넘치면, 왼쪽(prev) 버튼은 활성화하고, 오른쪽 (next)는 현재 맨 첫카드 위치이므로 비활성화
                                                                    // 오른쪽 비활성화라는건 그냥 그대로 놔두는것
    //  ul 태그의 실제 보이는 너비 < (li 태그의 개수 * 각 li 태그(카드)의 너비) , 즉 liList.length * 260: 전체 카드들의 총 너비
    if(classList.clientWidth < (liList.length * 260)) {   
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformPrev); //자동으로 이벤트 정보(event)가 transformPrev 함수에 전달
    } else{ // ul태그가 더 커너 카드들이 다 안짤리고 들어오면 방향버튼들은 비활성화
        /* 태그 삭제시, 부모 요소(arrow-container)에서 removeChild를 통해 삭제해야한다
        따라서, 먼저 부모요소를 찾아서 부모 요소의 자식 요소로 있는 PREV와 NEXT요소를 삭제함*/
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);  // slidePrevList[i].nextElementSibling는 오른쪽버튼(i태그)을 부모에서 자식을 삭제
        arrowContainer.removeChild(slidePrevList[i]); // 왼쪽버튼(i태그)인 자기 자신을 부모에서 자식을 삭제
    }
    // 정리 : 카드들이 많아서 넘치면 왼쪽버튼 클래스 추가해서 버튼 활성화하고, 오른쪽버튼은 그대로놔두고(비활성화)
    //       카드들이 적어서 넘치지 않으면 버튼(i태그)을 삭제
}
