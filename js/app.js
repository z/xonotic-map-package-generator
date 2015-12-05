$(document).ready(function() {

    $("#generate").click(function(e) {
        e.preventDefault();
        imgData = "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=";

        var zip = new JSZip();
        zip.file("Hello.txt", "Hello World\n");
        var img = zip.folder("images");
        img.file("smile.gif", imgData, {base64: true});
        var content = zip.generate({type:"blob"});
        // see FileSaver.js
        saveAs(content, "example.zip");
    });

});
