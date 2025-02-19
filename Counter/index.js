let cnt = 0;
let btn = document.getElementById('minus');
btn.disabled = true;

const Increment = () => {
    cnt++;
    document.getElementById('cnt').innerHTML = cnt;

    if (cnt > 0) {
        btn.disabled = false;
    }
}

const Decrement = () => {
    cnt--;
    document.getElementById('cnt').innerHTML = cnt;
    if (cnt == 0) {
        btn.disabled = true;
    }
}