$(document).ready(function () {

  $("#generate").click(function (evt) {

    $('form').validator().on('submit', function (e) {
      if (e.isDefaultPrevented()) {
        return;
      }

      // Get form data
      var bsp, title, description, author, license, cdtrack;

      bsp = $("#bsp").val();
      title = $("#title").val();
      description = $("#description").val();
      author = $("#author").val();
      license = $("#license").val();
      cdtrack = Math.floor(Math.random() * (20 - 0 + 1)) + 0;


      // Handle gametypes
      var gametypes_arr = [];
      $("[name=gametypes]:checked").each(function () {
        gametypes_arr.push($(this).val());
      });

      var gametypes = "";
      gametypes_arr.forEach(function (value, index, array) {
        console.log(value);
        gametypes += "gametype " + value + "\n";
      });


      // Start reading in files and replacing content
      var _mapinfo, _license;

      $.when(
        $.get("template/map/maps/__mapname__.mapinfo", function (data) {
          _mapinfo = data;
          _mapinfo = _mapinfo.replace("{{title}}", title);
          _mapinfo = _mapinfo.replace("{{description}}", description);
          _mapinfo = _mapinfo.replace("{{author}}", author);
          _mapinfo = _mapinfo.replace("{{cdtrack}}", cdtrack);
          _mapinfo = _mapinfo.replace("{{gametypes}}", gametypes);
        }),

        $.get("template/license/" + license, function (data) {
          _license = data;
        })
      ).then(function () {

        console.log(_mapinfo);

        var zip = new JSZip();
        zip.file("maps/" + bsp + ".mapinfo", _mapinfo);
        zip.file("maps/" + bsp + ".map", "");
        zip.file("maps/" + bsp + ".jpg", "");
        zip.file("gfx/" + bsp + "_mini.tga", "");
        zip.file("LICENSE", _license);
        zip.file("README", "");

        var content = zip.generate({type: "blob"});
        // see FileSaver.js
        saveAs(content, bsp + ".pk3");

      });

    }); // validator

    evt.preventDefault();

  }); // generator click

});
