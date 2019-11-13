var timeCount = 0;
var time;
var clockIntervalFlag = true;
var rapCnt = 0;
var beforTime = 0;

var timer = document.getElementById("timer");
var stopButton = document.getElementById("start_stopwatch");
var resetButton = document.getElementById("reset_stopwatch");
var rapTable = document.getElementById("rap_table");

const minute = document.querySelector(".minute.hand");
const second = document.querySelector(".second.hand");

stopButton.addEventListener('click', function () {
    if (clockIntervalFlag) {
        time = setInterval(() => {
            timeCount++;

            const timeArray = returnTime(timeCount);

            second.style.transform = `rotate(${(360 / 60) * timeArray['s']}deg)`;
            minute.style.transform = `rotate(${(360 / 60) * timeArray['m']}deg)`;
            timer.textContent = ('00' + timeArray['m']).slice(-2) + ':' +
                judgeTime('00' + Math.floor(timeArray['s']) % 60).slice(-2) + ':' +
                ('00' + timeArray['ms']).slice(-2);
        }, 10);
        clockIntervalFlag = false;
        stopButton.textContent = "ストップ";
        resetButton.textContent = "ラップ";
    } else {
        clearInterval(time);
        clockIntervalFlag = true;
        stopButton.textContent = "スタート";
        resetButton.textContent = "リセット";
    }
});

resetButton.addEventListener('click', function () {
    if (clockIntervalFlag) {
        timer.textContent = '00:00:00';
        rapTable.innerHTML = "";
        second.style.transform = `rotate(${0}deg)`;
        minute.style.transform = `rotate(${0}deg)`;
        timeCount = 0;
        rapCnt = 0;
        beforTime = 0;
    } else {
        rapCnt++;
        timeArray = returnTime(timeCount - beforTime);
        rapTable.innerHTML +=
            "<td>ラップ：" +
            rapCnt +
            "</td><td>" +
                ('00' + timeArray['m']).slice(-2) + ':' +
                ('00' + Math.floor(timeArray['s']) % 60).slice(-2) + ':' +
                ('00' + timeArray['ms']).slice(-2) +
            "</td>";
        beforTime = timeCount;
    }
});

function returnTime(judgeTime){
    const timeArray = {
        "ms": judgeTime % 100,
        "s": judgeTime / 100,
        "m": Math.floor(judgeTime / 6000)
        };
    return timeArray;
}