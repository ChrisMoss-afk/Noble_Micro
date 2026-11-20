//COMMENT: §§§ SHARED M02 / M03 SINGLE-OPEN ACCORDIONS §§§
//COMMENT: [USE NATIVE BUTTONS AND LABELED REGIONS; ANIMATE HEIGHT WITHOUT HIDING CONTENT FROM ACCESSIBILITY TOOLS]
const accordion_groups = document.querySelectorAll('[data-accordion]');
const prefers_reduced_motion = window.matchMedia('(prefers-reduced-motion: reduce)');

function accordion_panel(trigger) {
    return document.getElementById(trigger.getAttribute('aria-controls'));
}

function accordion_state(trigger, expand, animate = true) {
    const panel = accordion_panel(trigger);
    if (!panel) return;
    panel.getAnimations().forEach((animation) => animation.cancel());
    const was_open = !panel.hidden;
    trigger.setAttribute('aria-expanded', String(expand));

    if (expand) {
        panel.hidden = false;
        panel.removeAttribute('inert');
    } else {
        panel.setAttribute('inert', '');
    }
    if (!animate || prefers_reduced_motion.matches || typeof panel.animate !== 'function') {
        panel.hidden = !expand;
        return;
    }

    const full_height = panel.scrollHeight;
    const motion = panel.animate(
        expand
            ? [{ height: '0px', opacity: 0 }, { height: `${full_height}px`, opacity: 1 }]
            : [{ height: `${full_height}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: expand ? 250 : 195, easing: 'cubic-bezier(.22,.61,.36,1)' }
    );
    motion.addEventListener('finish', () => { if (!expand && trigger.getAttribute('aria-expanded') === 'false') panel.hidden = true; }, { once: true });
}

accordion_groups.forEach((group) => {
    const triggers = Array.from(group.querySelectorAll('[data-accordion-trigger]'));
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const opening = trigger.getAttribute('aria-expanded') !== 'true';
            triggers.forEach((other) => {
                if (other !== trigger && other.getAttribute('aria-expanded') === 'true') accordion_state(other, false, false);
            });
            accordion_state(trigger, opening);
        });
    });
});
