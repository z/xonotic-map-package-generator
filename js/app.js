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
        //saveAs(content, "example.zip");

        var bsp, title, description, author, license;
        bsp = $("#bsp").val();
        title = $("#title").val();
        description = $("#description").val();
        author = $("#author").val();
        license = $("#license").val();

        var gametypes = [];
        $("[name=gametypes]:checked").each(function() {
            gametypes.push($(this).val());
        });

        console.log(bsp, title, description, author, gametypes, license);

        JSZipUtils.getBinaryContent('template/map.zip', function(err, data) {
            if(err) {
                throw err; // or handle err
            }

            var zip = new JSZip(data);
            console.log(zip.file("maps/__mapname__.mapinfo").asText());
        }); 

    });

});
