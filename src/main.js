const openFile = (href) => {
    const a = document.createElement('a');
    a.href = href;
    a.click();
}

document.getElementById('item-btn').addEventListener('click', () => {
    openFile('pages/item.html');
});

document.getElementById('manifest-btn').addEventListener('click', () => {
    openFile('pages/manifest.html');
});