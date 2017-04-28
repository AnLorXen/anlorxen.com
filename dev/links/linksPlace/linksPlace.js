

function LinksPlacePage() {
  $(".clsImage").hide();

  clippy.load(
      "Links",
      function (agent) {
        // success callback
        agent.moveTo(300, 190);
        agent.play("Greeting");
        agent.play("IdleStretch");
        agent.speak("Welcome to my new home!");
        agent.play("GestureLeft");
        agent.play("LookDownRight");
        agent.speak("As you can see...");
        agent.play("GestureRight");
        agent.play("LookUpLeft");
        agent.speak("...there isn't very much here to look at yet.");
        agent.play("IdleBlink");
        agent.speak("Let's see if we can find some things to change that.");
        agent.play("Searching");
        agent.speak("Hmmmm...");
        agent.play("LookDownLeft");
        agent.play("LookUpLeft");
        agent.speak("First of all, we could use a little paint on these walls.");
        agent.play(
            "GetArtsy",
            5000,
            function () {
              $("body").css(
                  { "background-color": "#3366BB" }
              );
            });
        agent.play("IdleTailWagB");
        agent.play("LookUpRight");
        agent.speak("This is nice, but maybe a little lighter.");
        agent.play(
            "LookUp",
            5000,
            function () {
              $("body").css(
                  { "background-color": "#3973D3" } // 3e7de6  346ac2
              );
            });
        agent.play("IdleTailWagD");
        agent.speak("Now let's add some pictures.");
        agent.play(
            "LookRight",
            5000,
            function () {
              for (var i = 1; i < 9; i += 1) {
                var $imgOrig = $("#imgLinksCat0" + i);
                var $divDest = $("#divArea0" + i);
                $imgOrig.show();
                $imgAnim = $imgOrig.clone();
                $imgAnim.css(
                    {
                      margin: 0,
                      position: "absolute"
                    }
                ).offset(
                    {
                      left: $imgOrig.offset().left,
                      top: $imgOrig.offset().top
                    }
                ).appendTo("body");
                $imgOrig.remove();
                $imgAnim.animate(
                    {
                      height: $divDest.height(),
                      left: $divDest.offset().left,
                      top: $divDest.offset().top,
                      width: $divDest.width()
                    }
                );
              };
            });
        agent.play("LookDownRight");
        agent.moveTo(400, 280);
        agent.play("LookUpLeft");
        agent.play("IdleBlink");
        agent.play("LookRight");
        agent.speak("Ahhhh, this is much nicer now.");
        agent.play("LookUp");
        agent.speak("Now where is my friend the butterfly?");
        agent.play("LookUpLeft");
        agent.play("IdleButterFly");
        agent.play("LookUpRight");
        agent.play("IdleButterFly");
        agent.play("LookUp");
        agent.moveTo(480, 80);
        agent.play("IdleButterFly");
      },
      function () {
        // fail callback
        alert("Loading failed.");
      }
  );
};

$(document).ready(function () {
  LinksPlacePage();
});

