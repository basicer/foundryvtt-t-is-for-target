import { hotkeys } from './lib-df-hotkeys.shim.js';

class TIsForTarget {
  static init() {
    hotkeys.registerShortcut({
      name: 't-is-for-target.target',
      label: 'Target Hovered',
      default: { key: hotkeys.keys.KeyT, alt: false, ctrl: false, shift: false },
      onKeyDown: () => TIsForTarget.trigger(false)
    });

    hotkeys.registerShortcut({
      name: 't-is-for-target.add-target',
      label: 'Add Target Hovered',
      default: { key: hotkeys.keys.KeyT, alt: false, ctrl: false, shift: true },
      onKeyDown: () => TIsForTarget.trigger(true)
    });
 
  }

  static trigger(multi) {
    if (TIsForTarget.hovering) {
      if (game.user.targets.has(TIsForTarget.hovering))
        TIsForTarget.hovering.setTarget(false, {user: game.user, releaseOthers: !multi});
      else
        TIsForTarget.hovering.setTarget(game.user, {releaseOthers: !multi});
    }
  }


  static onHoverToken(token, hovered) {
    TIsForTarget.hovering = hovered ? token : undefined;
  }

}

Hooks.on('init', TIsForTarget.init);
Hooks.on('hoverToken', TIsForTarget.onHoverToken);

