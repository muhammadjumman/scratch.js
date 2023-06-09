
    const a = document.querySelectorAll('a')
    a.forEach((ele) => {
        ele.addEventListener('mouseover', () => {
            ele.style.top = `${Math.floor(Math.random() * 100)}rem`
            ele.style.left = `${Math.floor(Math.random() * 100)}rem`
        })
    })
