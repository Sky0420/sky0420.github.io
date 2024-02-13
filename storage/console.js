// 출석부 싹 훑고 그 중에서 입력한 이름이 있다면 알려줘

var 출석부 = ['흥민', '영희', '철수', '재석'];

function 이름찾기(name){
    출석부.forEach(function(name, a){
        if (name == 출석부[a]) {
            console.log('있음')
        } else {
            console.log('없음')
        }
    })
};
