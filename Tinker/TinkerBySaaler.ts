import {basename} from "path";
import {SSL_OP_SSLEAY_080_CLIENT_DH_BUG} from "constants";
import {StringDecoder} from "string_decoder";

let Tinker: ScriptDescription = {};

export const BASE_PATH = ['Heroes', 'Intelligence', 'Tinke'];
export const BASE_PUSH = ['Heroes', 'Intelligence', 'Tinke', 'AutoPush'];

export let isEnabledOption = Menu.AddToggle(
    BASE_PATH,
    'Enable',
    false
)
    .OnChange(state => {
        isEnabledOption = state.newValue;
    })
    .GetValue();

export let ComboKey = Menu.AddKeyBind(
    BASE_PATH,
    'Combo key',
    Enum.ButtonCode.KEY_NONE
);
export let SpamRockets = Menu.AddKeyBind(
    BASE_PATH,
    'Key spam rockets',
    Enum.ButtonCode.KEY_NONE
);
export let Fail = Menu.AddToggle(
    BASE_PATH,
    'FailSwitcher rocket and rearm',
    false
).SetImage('panorama/images/spellicons/tinker_heat_seeking_missile_png.vtex_c')
    .OnChange(state => {
        Fail = state.newValue;
    })
    .GetValue();
export let UseNoUs = Menu.AddToggle(
    BASE_PATH,
    'Do not use combos if the Scarecrow effect is active and blad mail',
    false
)
    .OnChange(state => {
        UseNoUs = state.newValue;
    })
    .GetValue();
export let AutoPus = Menu.AddToggle(
    BASE_PUSH,
    'Enable AutoPush',
    false
) //tinker_march_of_the_machines
    .OnChange(state => {
        AutoPus = state.newValue;
    })
    .GetValue();
Menu.SetImage(BASE_PUSH, 'panorama/images/spellicons/tinker_march_of_the_machines_png.vtex_c');
Menu.SetImage(BASE_PATH, 'panorama/images/heroes/icons/npc_dota_hero_tinker_png.vtex_c')
export let optionSkills = Menu.AddMultiSelect(
    BASE_PATH,
    'Skills',
    [
        'panorama/images/spellicons/tinker_laser_png.vtex_c',
        'panorama/images/spellicons/tinker_heat_seeking_missile_png.vtex_c',
        'panorama/images/spellicons/tinker_rearm_png.vtex_c',

    ],
    false
)
    .OnChange(state => {
        optionSkills = state.newValue;
    })
    .GetValue();
export let optionItems = Menu.AddMultiSelect(
    BASE_PATH,
    'Items',
    [
        "panorama/images/items/ethereal_blade_png.vtex_c",
        "panorama/images/items/sheepstick_png.vtex_c",
        "panorama/images/items/shivas_guard_png.vtex_c",
        "panorama/images/items/veil_of_discord_png.vtex_c",
        "panorama/images/items/bloodthorn_png.vtex_c",
        'panorama/images/items/dagon_png.vtex_c',
        'panorama/images/items/blink_png.vtex_c',
        'panorama/images/items/bottle_png.vtex_c',
        'panorama/images/items/soul_ring_png.vtex_c'

    ],
    false
)
    .OnChange(state => {
        optionItems = state.newValue;
    })
    .GetValue();
export let LinkenProtec = Menu.AddMultiSelect(
    BASE_PATH,
    'Linken protect',
    [
        'panorama/images/items/ethereal_blade_png.vtex_c',
        "panorama/images/items/bloodthorn_png.vtex_c",
        "panorama/images/items/sheepstick_png.vtex_c",
    ],
    false
)
    .OnChange(state => {
        LinkenProtec = state.newValue;
    })
    .GetValue();
export let HpTreshold = Menu.AddSlider(
    BASE_PATH,
    'Soul ring  usage HP treshold',
    5,
    95,
    20,
    5,
).SetImage('panorama/images/items/soul_ring_png.vtex_c')
    .OnChange(state => {
        HpTreshold = state.newValue;
    })
    .GetValue();
export let EnableAuto = Menu.AddKeyBind(
    BASE_PUSH,
    'Auto Push',
    Enum.ButtonCode.KEY_NONE
);

export let minTrevel: boolean = false;
export let maxTrevve: boolean = true;

export let myHero: Hero | NPC;
export let GameStart = false;
export let HeroesList: Hero[];
export let EnemyHero: Hero;
export let NpcsList;
export let myPlayer;
export let HeroMana: Number;

export let Trevel: Item;
export let Ethereal: Item;
export let Hex: Item;
export let Shiva: Item;
export let arrau = [];
export let arrauen = [];
export let Veil: Item;
export let Eul: Item;
export let Boots: Item;
export let Blood: Item;
export let Heavens: Item;
export let Force: Item;
export let Dagon: Item;
export let Dagon_2: Item;
export let Dagon_3: Item;
export let blink: Item;
export let NpcList;
export let trees = [];
export let Dagon_4: Item;
export let Dagon_5: Item;
export let botl: Item;
export let ring: Item;
export let q: Ability;
export let e: Ability;
export let w: Ability;
export let r: Ability;
export let AutoPush: boolean = false;

export let x;
export let y;

export function Init(): void {
    if (GameRules.IsActiveGame()) GameStart = true;
    myHero = EntitySystem.GetLocalHero();
    myPlayer = EntitySystem.GetLocalPlayer();
    if (
        myHero === null ||
        myHero.GetUnitName() !== "npc_dota_hero_tinker"
    ) {
        GameStart = false;
        return;
    }
    HeroesList = EntitySystem.GetHeroesList().filter(
        hero => !hero.IsIllusion()
    );

}

export function Dynamic() {
    HeroMana = myHero.GetMana();
    EnemyHero = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);
    Trevel = myHero.GetItem('item_travel_boots', true);
    Ethereal = myHero.GetItem("item_ethereal_blade", true);
    Shiva = myHero.GetItem("item_shivas_guard", true);
    Veil = myHero.GetItem("item_veil_of_discord", true);
    Hex = myHero.GetItem("item_sheepstick", true);
    Eul = myHero.GetItem("item_cyclone", true);
    Blood = myHero.GetItem("item_bloodthorn", true);
    Heavens = myHero.GetItem("item_heavens_halberd", true);
    Force = myHero.GetItem("item_force_staff", true);
    Dagon = myHero.GetItem('item_dagon', true);
    Dagon_2 = myHero.GetItem('item_dagon_2', true);
    Boots = myHero.GetItem('item_travel_boots', true);
    Dagon_3 = myHero.GetItem('item_dagon_3', true);
    Dagon_4 = myHero.GetItem('item_dagon_4', true);
    Dagon_5 = myHero.GetItem('item_dagon_5', true);
    blink = myHero.GetItem('item_blink', true);
    botl = myHero.GetItem('item_bottle', true);
    ring = myHero.GetItem('item_soul_ring', true);

    q = myHero.GetAbility('tinker_laser');
    w = myHero.GetAbility('tinker_heat_seeking_missile');
    r = myHero.GetAbility('tinker_rearm');
    e = myHero.GetAbility('tinker_march_of_the_machines');
}

export function UseInCombo(option: boolean, item: Ability | Item, targ) {
    if (
        option &&
        item &&
        !item.GetCooldown() &&
        HeroMana > item.GetManaCost()
    ) {
        let usage = item.GetBehavior();
        if (usage & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
            item.CastTarget(targ);
        } else if (usage & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_POINT) {
            item.CastPosition(targ.GetAbsOrigin());
        } else if (
            usage & Enum.AbilityBehavior.DOTA_ABILITY_BEHAVIOR_NO_TARGET
        ) {
            item.CastNoTarget();
        } else {
            throw new Error(`Use in combo unknown behavior ${item.GetName()}`);
        }
        return true;
    }
    return false;
}

export function Combo() {
    if (Engine.OnceAt(0.08)) {
        if (!EnemyHero) {
            return;
        }
        let maxhp = (myHero.GetMaxHealth() * HpTreshold) / 100;
        let enemy =
            EnemyHero.GetAbsRotation()
                .GetForward()
                .Scaled(-500)
                .add(EnemyHero.GetAbsOrigin());

        if (UseNoUs) {

            if (!myHero.HasModifier('modifier_pugna_nether_ward_aura') && !EnemyHero.HasModifier('modifier_item_blade_mail_reflect')) {

                if (EnemyHero.IsLinkensProtected()) { // modifier_item_blade_mail modifier_pugna_nether_ward_aura

                    if (UseInCombo(LinkenProtec[0], Ethereal, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(LinkenProtec[1], Blood, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(LinkenProtec[2], Hex, EnemyHero)) {
                        return;
                    }

                } else {

                    if (!myHero.IsChannellingAbility()) {
                        if (blink && !blink.GetCooldown() && optionItems[7]) {
                            blink.CastPosition(enemy);
                            return;
                        }
                        if (UseInCombo(optionSkills[0], q, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[3], Veil, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[0], Ethereal, EnemyHero)) {

                        }
                        if (UseInCombo(optionSkills[1], w, EnemyHero)) {
                            return;
                        }

                        if (UseInCombo(optionItems[1], Hex, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[4], Blood, EnemyHero)) {
                            return;
                        }

                        if (maxhp <= myHero.GetHealth() && UseInCombo(optionItems[8], ring, myHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[2], Shiva, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[5], Dagon, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[5], Dagon_2, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[5], Dagon_3, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[5], Dagon_4, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[5], Dagon_5, EnemyHero)) {
                            return;
                        }
                        if (UseInCombo(optionItems[7], botl, EnemyHero)) {
                            return;
                        }
                        if (Engine.OnceAt(1)) {
                            if (UseInCombo(optionSkills[2], r, myHero)) {
                                return;
                            }
                        }
                    }
                }
            }
        } else {
            if (EnemyHero.IsLinkensProtected()) {

                if (UseInCombo(LinkenProtec[0], Ethereal, EnemyHero)) {
                    return;
                }
                if (UseInCombo(LinkenProtec[1], Blood, EnemyHero)) {
                    return;
                }
                if (UseInCombo(LinkenProtec[2], Hex, EnemyHero)) {
                    return;
                }

            } else {

                if (!myHero.IsChannellingAbility()) {
                    if (blink && !blink.GetCooldown() && optionItems[7]) {
                        blink.CastPosition(enemy);
                        return;
                    }
                    if (UseInCombo(optionSkills[0], q, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[3], Veil, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[0], Ethereal, EnemyHero)) {

                    }
                    if (UseInCombo(optionSkills[1], w, EnemyHero)) {
                        return;
                    }

                    if (UseInCombo(optionItems[1], Hex, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[4], Blood, EnemyHero)) {
                        return;
                    }

                    if (maxhp <= myHero.GetHealth() && UseInCombo(optionItems[8], ring, myHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[2], Shiva, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_2, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_3, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_4, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_5, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[7], botl, EnemyHero)) {
                        return;
                    }
                    if (Engine.OnceAt(1)) {
                        if (UseInCombo(optionSkills[2], r, myHero)) {
                            return;
                        }
                    }
                }

            }
            if (!LinkenProtec[0] && !LinkenProtec[1] && !LinkenProtec[2]) {
                if (!myHero.IsChannellingAbility()) {
                    if (!blink.GetCooldown() && optionItems[7]) {
                        blink.CastPosition(enemy);
                    }
                    if (UseInCombo(optionSkills[0], q, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[3], Veil, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[0], Ethereal, EnemyHero)) {

                    }
                    if (UseInCombo(optionSkills[1], w, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[1], Hex, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[4], Blood, EnemyHero)) {
                        return;
                    }
                    if (maxhp >= myHero.GetHealth() && UseInCombo(optionItems[8], ring, myHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[2], Shiva, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_2, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_3, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_4, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[5], Dagon_5, EnemyHero)) {
                        return;
                    }
                    if (UseInCombo(optionItems[7], botl, EnemyHero)) {
                        return;
                    }
                    if (Engine.OnceAt(3)) {
                        if (UseInCombo(optionSkills[2], r, myHero)) {
                            return;
                        }
                    }
                }
            }
        }
    }
}


export function Spam() {
    for (const hero of HeroesList) {
        if (!hero.IsSameTeam(myHero)) {

            if (!hero.IsDormant() && myHero.GetAbsOrigin().Distance(hero.GetAbsOrigin()) <= 2500) {

                if (!myHero.IsChannellingAbility()) {
                    if (UseInCombo(optionSkills[1], w, EnemyHero)) {
                        return;
                    }
                    if (ring && !ring.GetCooldown()) {
                        ring.CastNoTarget();
                        return;

                    }
                    if (Engine.OnceAt(1)) {
                        if (UseInCombo(optionSkills[2], r, myHero)) {
                            return;
                        }
                    }
                }

            }
        }
    }
}

Tinker.OnPrepareUnitOrders = relm => {
    if (relm.ability && relm.ability.GetName() === 'tinker_rearm' && Fail) {
        let rocket = myHero.GetAbility('tinker_heat_seeking_missile');
        let t: Item[];
        t = myHero.GetItems(true);
        for (const items of t) {
            //e.GetCooldown() || q.GetCooldown() || rocket.GetCooldown() || (ring && ring.GetCooldown()) || Ethereal && (Ethereal.GetCooldown()) || (Veil && Veil.GetCooldown()) || (Blood && Blood.GetCooldown()) || (Shiva && Shiva.GetCooldown()) || (Dagon && Dagon.GetCooldown()) || (Dagon_2 && Dagon_2.GetCooldown()) || (Dagon_3 && Dagon_3.GetCooldown()) || (Dagon_4 && Dagon_3.GetCooldown()) || (Dagon_5 && Dagon_5.GetCooldown()) || (Hex && Hex.GetCooldown())
            if ((items && items.GetCooldown()) || e.GetCooldown() || q.GetCooldown() || rocket.GetCooldown()) {

                return true;
            }
        }
        return false;
    }

    if (relm.ability && relm.ability.GetName() === 'tinker_heat_seeking_missile' && Fail) {
        for (const hero of HeroesList) {
            if (!hero.IsSameTeam(myHero)) {

                if (!hero.IsDormant() && myHero.GetAbsOrigin().Distance(hero.GetAbsOrigin()) <= 2500) {


                    return true;
                }
            }
        }
        return false;
    }
};

export function Use(itemw: Item | Ability, targets) {

    if (itemw && !itemw.GetCooldown()) {
        itemw.CastPosition(targets);
        return true;
    }
    return false;

}

export function TinkerFarm(Tinker, target) {
    // if (!blink) return;
    // if (!target) return;
    // let savespots = []
    // let targetPos = target.GetAbsOrigin();
    // let myPos = Tinker.GetAbsOrigin();
    // for (let spot of savespots) {
    //     if (spot.GetTreesInRadius(251) >= 3) {
    //         if (myPos.Distance2D(spot) > 200 && myPos.Distance2D(spot) < 1125 + myHero.GetCastRangeBonus()) {
    //             if (spot.Distance2D(targetPos) < 1050 + myHero.GetCastRangeBonus()) {
    //                 return spot;
    //             }
    //         }
    //     }
    // }
    // let treeCount = 0;
    // let targetTree = undefined;
    // for (let t of myHero.GetTreesInRadius(1000, true).filter(e.Rang(targetPos, 900) && e.IsAlive)) {
    //     if (myPos.Distance2D(t.GetAbsOrigin()) > 315 && myPos.Distance2D(t.GetAbsOrigin()) < 1100) {
    //         let treesAround = t.GetTreesInRadius(350, true);
    //         if (treesAround.length > treeCount) {
    //             treeCount;
    //             targetTree = t;
    //         }
    //     }
    // }
    // return false;
}

export function TinkerAutoPush() {
    let creeeps: Array<NPC> = EntitySystem.GetNPCsList();
    let max_range: Number = 0;
    let max_item: Vector = new Vector(-10e9, -10e9, 0);
    let target_creep: NPC = null;
    for (let i of creeeps) {
        if (i.IsCreep() && i.IsSameTeam(myHero)) {
            if (myHero.GetAbsOrigin().Distance(i.GetAbsOrigin()) > max_range) {
                if (i.GetUnitsInRadius(1000, Enum.TeamType.TEAM_ENEMY).length > 2) {
                    target_creep = i;
                    max_item = i.GetAbsOrigin();
                    max_range = myHero.GetAbsOrigin().Distance(i.GetAbsOrigin());
                }
            }
        }
    }
    if (target_creep && max_item != new Vector(-10e9, -10e9, 0) && Trevel.GetCooldown() === 0.0 && HeroMana > 500) {
        Trevel.CastTarget(target_creep);
    }

}

Tinker.OnDraw = () => {
    // Renderer.SetDrawColor(0,0,0,255);
    // Renderer.DrawFilledRect(x / 2, y / 2, 50, 50);
};
Tinker.OnUpdate = () => {
    if (!GameStart || !isEnabledOption) {
        return;
    }
    Dynamic();
    if (AutoPus && Menu.IsKeyDown(EnableAuto)) {

        TinkerAutoPush();
    }
    if (Menu.IsKeyDown(ComboKey)) {
        Combo();
    }
    if (Menu.IsKeyDown(SpamRockets)) {
        Spam();
    }


}
Tinker.OnScriptLoad = () => {
    [x, y] = Renderer.GetScreenSize();
};
Tinker.OnScriptLoad = Tinker.OnGameStart = Init;
Tinker.OnGameEnd = () => {
    GameStart = false;
};
RegisterScript(Tinker);
