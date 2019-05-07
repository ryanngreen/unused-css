let openFile = function(event) {
    let input = event.target;
    let reader = new FileReader();

    reader.onload = function(){
        let text = reader.result;
        // displayText(text, reader);
        // createURLArray(text);
        minifyClasses(
            compileClasses(
                createURLArray(text)
            ));
    };

    reader.readAsText(input.files[0]);
};

/**
 * Format the text document of urls to an array
 * @param text - document contents
 * @returns {*|string[]} - array of urls to be cycled through for searching
 */
function createURLArray(text) {
    let urlList = text.split("\n");
    return urlList;
}

/**
 * Loading in html from each url provided in the document and getting list of classes and ids
 * @param urlList - Array received from createURLArray
 */
function compileClasses(urlList) {
    let compiledClasses = [];
    // change to 50 for site
    for (let i = 0; i < 2; i++) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", urlList[i], false);
        xmlhttp.send();
        let urlCode = xmlhttp.responseText;
        compiledClasses += getClasses(urlCode);
    }
    return compiledClasses;
}

/**
 * Returning combined class and id arrays
 * @param html - html content of a page
 * @returns {Array} - Array of classes
 */
function getClasses(html) {
    let classSearch = searchStyles(/class=\"([^\"]*)\"/gi, html);
    let idSearch = searchStyles(/id=\"([^\"]*)\"/gi, html);
    let classArray = classSearch.concat(...idSearch);
    return(classArray)
}

/**
 * Searches for classes or ids and compiles to separate array
 * @param regex - searching for class or id
 * @param html - html of page to be searched
 * @returns {Array} - array of classes or ids
 */
function searchStyles(regex, html) {
    let result, arr = [];
    while ( result = regex.exec(html) ) {
        let classes = result["1"]
            .replace(/\s+/g, ' ')
            .split(" ");
        arr.push(...classes);
    }
    return arr;
}

/**
 * Removes repeated terms from array
 * @param compiledClasses - combined array containing styles from all provided pages
 * @returns {Array} - minified array of classes and styles used on site
 */
function minifyClasses(compiledClasses) {
    compiledClasses = compiledClasses.split(",");
    let minClasses = compiledClasses.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) === index;
    });
    return minClasses;
}

/**
 * Used to test whether file provided was being pulled in correctly
 * @param text - text of the document
 * @param reader - new created reader
 */
function displayText(text, reader) {
    let node = document.getElementById('output');
    node.innerText = text;
    console.log(reader.result.substring(0, 200));
}

// For use locally
// getClasses(html);