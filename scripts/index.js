class TIsForTarget {

  static onKeyDown(e) {
      if (e.which == 84) {
        if (TIsForTarget.hovering) {
          let releaseOthers = !e.shiftKey;

          if (game.settings.get("t-is-for-target", "invertshift")) {
            releaseOthers = !releaseOthers;
          }

          if (game.user.targets.has(TIsForTarget.hovering))
            TIsForTarget.hovering.setTarget(false, {user: game.user, releaseOthers: releaseOthers});
          else
            TIsForTarget.hovering.setTarget(game.user, {releaseOthers: releaseOthers});
        }
      }
  }

  static ready() {
    $(document).unbind('keydown', TIsForTarget.onKeyDown);
    $(document).keydown(TIsForTarget.onKeyDown);
  }

  static onHoverToken(token, hovered) {
    TIsForTarget.hovering = hovered ? token : undefined;
  }

}

Hooks.on('canvasReady',TIsForTarget.ready);
Hooks.on('hoverToken', TIsForTarget.onHoverToken);

Hooks.once("init", () => {
    game.settings.register("t-is-for-target", "invertshift", {
      name: "Invert multitarget behavior",
      hint: "Inverts the behavior of the shift key. If this is active and shift is pressed, previous target are released, otherwise an additional target is assigned. ",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
  });
});
