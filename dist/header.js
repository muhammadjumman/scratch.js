
    const ele = document.querySelector('p')
    let text = ele.innerText
    ele.innerText = ''
    for (i = 0; i < text.length; i++) {
        (function (i) {
            setTimeout(() => {
                ele.innerText += text[i]
            }, 100 * i)
        })(i)
    }

