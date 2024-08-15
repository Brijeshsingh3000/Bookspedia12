const openEbook = (url) => {
    if (!url) {
        alert("Sorry! EBOOK CURRENTLY NOT AVAILABLE");
    } else {
        window.open(url, '_blank')// Redirect to the eBook URL
    }
};
export default openEbook;