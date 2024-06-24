const openFile = (href) => {
    const a = document.createElement('a');
    a.href = href;
    a.click();
}

document.getElementById('github-btn').addEventListener('click', () => {
    openFile('https://github.com/DanilaKouzmenko');
});

document.getElementById('example-btn1').addEventListener('click', () => {
    openFile('pages/example.html');
});
document.getElementById('example-btn2').addEventListener('click', () => {
    openFile('pages/example.html');
});
document.getElementById('example-btn3').addEventListener('click', () => {
    openFile('pages/example.html');
});