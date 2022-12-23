import('./scss/main.scss');

function regimeCalcChange() {
    if (calculator.classList.contains('calc-small-screen')) {
        calculator.classList.remove('calc-small-screen');
        calculator.classList.add('calc-full-screen');
        screen.classList.add('calc-screen-full-size');
    } else {
        calculator.classList.remove('calc-full-screen');
        calculator.classList.add('calc-small-screen');
        screen.classList.remove('calc-screen-full-size');
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const screen = document.querySelector('#screen');
    const calculator = document.querySelector('#calculator');
    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['+', '-', '÷', 'X'];

    let a = '';
    let b = '';
    let sign = '';
    let finish = false;
    let arrNums = ['0'];
    let arrNums2 = ['0'];
    let arrStr = [];
    let result = '';

    screen.textContent = '';

    function clearScreen() {
        a = '';
        b = '';
        sign = '';
        result = '';
        arrNums = ['0'];
        arrNums2 = ['0'];
        arrStr = [];

        screen.classList.remove('screen-size');
        screen.style.color = '';
        screen.textContent = 0;
    }

    function operandSelection(operand) {
        sign = operand;
        screen.textContent = sign;
        arrNums2 = ['0'];
        console.log(a, sign, b);
    }

    function checkFullScreen() {
        if (screen.classList.contains('screen-size')) {
            screen.classList.remove('screen-size');
        }

        if (finish) {
            let arrNums = ['0'];
            let arrNums2 = ['0'];
            screen.style.color = '';
        }
    }

    function numbersSelection(num) {
        checkFullScreen();

        if (b === '' && sign === '' && arrNums.length < 11) {

            if (arrNums.length === 1) {
                screen.textContent = '0';
                arrNums.push(num);
            }
            if (num === '0' && arrNums.length > 2 || num !== '0') {
                a += num;
                screen.textContent = a;
                arrNums.push(num);
                console.log(a, sign, b);
            }
            else if (arrNums[arrNums.length - 1] === '0') return;

        }
        else if (b !== '' && sign !== '' && finish && arrNums2.length < 9) {

            if (num === '0' && arrNums2.length > 2 || num !== '0') {
                a = result;
                b = num;
                finish = false;
                screen.textContent = b;
                arrNums2.push(num);
                console.log(a, sign, b);
            }
            else if (arrNums2[arrNums2.length - 1] === '0') return;

        }
        else if ((num === '0' && arrNums2.length >= 2 || num === '0' && arrNums2.length > 2 || num !== '0') && sign !== '' && arrNums2.length < 10) {
            b += num;
            screen.textContent = b;
            arrNums2.push(num);
            console.log(a, sign, b);
        }
        else if (arrNums2[arrNums2.length - 1] === '0') {
            screen.textContent = '0';
            return;
        }

        return finish;
    }

    function resultCalculation(a, b, sign) {
        if (b === '' && sign !== '÷') b = a;

        switch (sign) {
            case ('+'):
                a = +a + (+b);
                break;
            case ('-'):
                a = a - b;
                break;
            case ('÷'):
                if (b === '') {
                    screen.style.color = 'red';
                    screen.classList.add('screen-size');
                    screen.textContent = 'на 0 делить нельзя';
                    return;
                } else a = a / b;
                break;
            case ('X'):
                a = a * b;
        }
        result = a;
        finish = true;
        screen.textContent = result;
        console.log(a, sign, b)
        return finish;
    }

    function changePlusMinus() {
        if (result) {
            result = result - result * 2;
            screen.textContent = result;
        } else {
            a = a - a * 2;
            console.log(a, sign, b)
            screen.textContent = a;
        }
        return finish;
    }

    function percentCount(a) {
        if (result) {
            result = result / 100;
            console.log(a, sign, b)
            screen.textContent = result;
        } else {
            a = a / 100;
            console.log(a, sign, b)
            screen.textContent = a;
            return finish;
        }
    }

    function resultCheck(result) {
        arrStr = result.toString().split('');

        if (arrStr.length > 9) {
            screen.classList.add('screen-size');
        }
    }

    document.querySelector('#buttons').addEventListener('click', event => {

        const key = event.target.textContent;

        if (event.target === document.querySelector('#equal')) {
            resultCalculation(a, b, sign)
        }

        if (event.target === document.querySelector('#plus-minus')) {
            changePlusMinus(key)
        }

        if (event.target === document.querySelector('#percent')) {
            percentCount(a);
            arrNums = ['0'];
        }

        resultCheck(result);

        if (event.target == document.querySelector('#ac')) {
            clearScreen();
        }

        if (digit.includes(key)) {
            numbersSelection(key)
        }

        if (action.includes(key)) {
            operandSelection(key)
        }
    });

    document.querySelector('#calc-control').addEventListener('click', event => {

        if (event.target === document.querySelector('#close')) {
            calculator.classList.add('hidden');
        }

        if (event.target === document.querySelector('#full-screen-btn')) {
            regimeCalcChange();
        }
    })
});