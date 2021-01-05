const quizData = [
    {
        question: "1. 대한민국에서 면적이 가장 큰 지역은?",
        a: "서울특별시",
        b: "충청남도",
        c: "경상북도",
        d: "강원도",
        answer: "c"
    }, {
        question: "2. 돼지의 목심과 등심 연결부위에 있는 손바닥만한 오각형 모양의 살코기 부위는?",
        a: "항정살",
        b: "가브리살",
        c: "갈매기살",
        d: "사태",
        answer: "b"
    }, {
        question: "3. 일일 섭취 열량의 몇 %가 뇌에서 사용될까?",
        a: "10%",
        b: "20%",
        c: "25%",
        d: "30%",
        answer: "c"
    }, {
        question: "4. 현재 가장 인기있는 프론트엔드 프레임워크는?",
        a: "react",
        b: "angular",
        c: "vue",
        d: "정답없음",
        answer: "a"
    }, {
        question: "5. 2차원 화상에 사실감을 불어넣어 3차원의 화상을 만들어 내는 그래픽 용어는?",
        a: "스트리밍",
        b: "컴파일링",
        c: "몰핑",
        d: "렌더링",
        answer: "d"
    }
]

const quizContainer = document.getElementById("quiz");
const progress = document.querySelector("progress");
const question = document.getElementById("question");
const a = document.getElementById("a_text");
const b = document.getElementById("b_text");
const c = document.getElementById("c_text");
const d = document.getElementById("d_text");
const nextButton = document.querySelector("button");
const answerEls = document.querySelectorAll(".answer");

let currentNum = 0;
let score = 0;
let omr = [];

function checkScore() {
    quizContainer.innerHTML = `
        <h1>${score*20}점</h1>
        <h2>${quizData.length} 문제 중에 ${score}개 맞췄습니다!</h2>
        <table>
            <th>문제 번호</th>
            <th>정답 여부</th>
            <tr>
                <td>1</td>
                <td>${omr[0]}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>${omr[1]}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>${omr[2]}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>${omr[3]}</td>
            </tr>
            <tr>
                <td>5</td>
                <td>${omr[4]}</td>
            </tr>
        </table>
        <button onclick="location.reload()">다시 풀기</button>    
    `;

}

function deselectAnswer() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function selected() {
    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            if (answerEl.id === quizData[currentNum].answer) {
                score++;
                omr.push('O');
            } else {
                omr.push('X');
            };
            answer = answerEl.id;
            // console.log(answer)
            // console.log(score);
        }
    });
    return answer;
}

function togoNext() {
    const didcheck = selected();
    if (!didcheck) {
        alert("답을 선택하세요!");
    } else {
        currentNum++;
        progress.value += 20;
        loadQuiz();
        deselectAnswer();
        if (currentNum === quizData.length - 1) {
            nextButton.innerHTML = "제출하기";
        }
    }
}

function loadQuiz() {
    question.innerText = quizData[currentNum].question;
    a.innerText = quizData[currentNum].a;
    b.innerText = quizData[currentNum].b;
    c.innerText = quizData[currentNum].c;
    d.innerText = quizData[currentNum].d;
}

function init() {
    loadQuiz();
    nextButton.addEventListener('click', () => {
        if (currentNum < quizData.length - 1) {
            togoNext();
        } else if (currentNum === quizData.length - 1) {
            const didcheck = selected();
            if (!didcheck) {
                alert("답을 선택하세요!");
            } else {
                checkScore();
            }
        }
     
    });
}

init();