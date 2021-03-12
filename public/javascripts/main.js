window.onload = () => {
    console.log('win loaded');

    const playBtns = document.querySelectorAll('.fa-play');

    [].forEach.call(playBtns, (el, i) => {
        
        el.addEventListener("click", async (e) => {
            const sheetName = e.target.getAttribute('data-sheet-name');

            const rawResponse = await fetch('http://localhost:3003/convert', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({sheet: sheetName})
            });
        
            const res = await rawResponse.json();

            console.log('res: ', res);
        });
    })
}
