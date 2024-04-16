const n = 10;
const arr = [];

const container = document.getElementById("container"); // Assuming you have an HTML element with id="container" to show bars.

init();

let audioCtx=null;

function playNote(freq)
{
    if(audioCtx==null)
    {
       audioCtx=new (AudioContext || webkitAudioContext || window.webkitAudioContext)(); 
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();

    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);

}

function init() {
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random();
    }
    showbar();
}

function play() {
    const copy = [...arr];
    const moves = bubblesort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length == 0) {
        showbar();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices; // Fixed typo here
    if (move.type == "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    playNote(200+arr[i]*500);
    playNote(200+arr[j]*500);
    showbar(move);
    setTimeout(function () {
        animate(moves);
    }, 1000);
}

function bubblesort(arr) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < arr.length; i++) {
            moves.push({ indices: [i - 1, i], type: 'com' }); // Fixed typo here
            if (arr[i - 1] > arr[i]) {
                swapped = true;
                moves.push({ indices: [i - 1, i], type: 'swap' }); // Fixed typo here
                let swp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = swp;
            }
        }
    } while (swapped);
    return moves;
}

function showbar(move) {
    container.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}
