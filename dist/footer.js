
    const input = document.querySelector('#name')
    const btn = document.querySelector('button')
    btn.onclick = (e) => {
        let element = document.createElement('h3')
        element.innerText = input.value
        input.value = ''
        let head = document.querySelector('header')
        head.append(element)
    }
    input.onkeypress = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            let element = document.createElement('h3');
            element.innerText = input.value;
            input.value = '';
            let head = document.querySelector('header');
            head.append(element);
        }
    };

