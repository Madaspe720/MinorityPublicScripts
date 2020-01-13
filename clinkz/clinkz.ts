let clinkz: ScriptDescription = {};
// tslint:disable-next-line:no-namespace
namespace Clinkz {
    export const BASE_PATH = ['Heroes', 'Agility', 'Clinkz'];
    export const HERO_NAME = 'npc_dota_hero_clinkz';
    export const ORDER_TIME = 0.09;
    export let isEnabledOption = Menu.AddToggle(
        BASE_PATH,
        'Enable',
        false,
    ).SetNameLocale('ru', 'Включить');
    export let isEnabledValue = isEnabledOption
        .OnChange(state => {
            isEnabledValue = state.newValue;
        })
        .GetValue();

    Menu.SetImage(BASE_PATH, 'panorama/images/heroes/icons/npc_dota_hero_clinkz_png.vtex_c');

    export let comboKey = Menu.AddKeyBind(
        BASE_PATH,
        'Combo Key',
        Enum.ButtonCode.KEY_NONE,
    ).SetNameLocale('ru', 'Клавиша комбо');

    export let itemsForCombo = Menu.AddMultiSelect(
        BASE_PATH,
        'Combo Items',
        [
            'panorama/images/items/medallion_of_courage_png.vtex_c',
            'panorama/images/items/solar_crest_png.vtex_c',
            'panorama/images/items/orchid_png.vtex_c',
            'panorama/images/items/bloodthorn_png.vtex_c',
            'panorama/images/items/nullifier_png.vtex_c',
            'panorama/images/items/sheepstick_png.vtex_c',
            'panorama/images/items/hurricane_pike_png.vtex_c',
            'panorama/images/items/satanic_png.vtex_c',
        ],
        true,
    )
        .SetNameLocale('ru', 'Итемы для комбо');

    export let skillsValue = itemsForCombo
        .OnChange(state => {
            skillsValue = state.newValue;
        })
        .GetValue();

    export let itemsForиBreakLinken = Menu.AddMultiSelect(
        BASE_PATH,
        'items for break linken',
        [
            'panorama/images/items/medallion_of_courage_png.vtex_c',
            'panorama/images/items/solar_crest_png.vtex_c',
            'panorama/images/items/orchid_png.vtex_c',
            'panorama/images/items/bloodthorn_png.vtex_c',
            'panorama/images/items/nullifier_png.vtex_c',
            'panorama/images/items/sheepstick_png.vtex_c',
            'panorama/images/items/hurricane_pike_png.vtex_c',
        ],
        true,
    )
        .SetNameLocale('ru', 'Итемы для сбивки линки');

    export let skillsValueBreakLinken = itemsForиBreakLinken
        .OnChange(state => {
            skillsValueBreakLinken = state.newValue;
        })
        .GetValue();
    // export let onlyVanish = Menu.AddToggle(
    //     BASE_PATH,
    //     'Combo only of invisibility',
    //     false,
    // ).SetNameLocale('ru', 'Давать комбо только из невидемости');

    // export let isEnabledOnlyVanish = onlyVanish
    //     .OnChange(state => {
    //         isEnabledValue = state.newValue;
    //     })
    //     .GetValue();

    export let attackingWithSecondAbility = Menu.AddToggle(
        BASE_PATH,
        'Using SEARING ARROWS when you attaking Enemy Hero',
        true,
    )
        .SetNameLocale('ru', 'Использовать Огненные Стрелы когда атакует врага')
        .GetValue();
    // export let comboInLotusOrb = Menu.AddToggle(
    //     BASE_PATH,
    //     'Combo In lotus orb',
    //     false,
    // )
    //     .SetNameLocale('ru', 'Давать прокаст в lotis orb')
    //     .GetValue();

    export let gameStart: boolean = false;
    export let myHero: Hero;
    export let myPlayer: Player;
    export let enemyHero: Hero | NPC | null;

    export namespace Load {
        // tslint:disable-next-line:function-name
        export function Init(): void {
            if (GameRules.IsActiveGame()) gameStart = true;
            myHero = EntitySystem.GetLocalHero();
            if (
                !myHero ||
                !myHero.IsExist() ||
                myHero.GetUnitName() !== HERO_NAME
            ) {
                gameStart = false;
                return;
            }
        }

        export function usingCombo() {
            myPlayer = EntitySystem.GetLocalPlayer();
            if (Menu.IsKeyDown(Clinkz.comboKey) && Engine.OnceAt(Clinkz.ORDER_TIME)) {
                let HeroAbilities = [myHero.GetAbilityByIndex(1),
                    myHero.GetAbilityByIndex(2),
                    myHero.GetAbilityByIndex(3)];
                let HeroItemsCastTarget = [myHero.GetItem('item_medallion_of_courage', true),
                    myHero.GetItem('item_solar_crest', true),
                    myHero.GetItem('item_orchid', true),
                    myHero.GetItem('item_bloodthorn', true),
                    myHero.GetItem('item_nullifier', true),
                    myHero.GetItem('item_sheepstick', true),
                    myHero.GetItem('item_hurricane_pike', true),
                    myHero.GetItem('item_satanic', true)];
                enemyHero = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);
                let i;
                // console.log(skillsValueBreakLinken);
                // console.log(skillsValue);
                if (enemyHero.IsLinkensProtected()) {
                    for (i = 0; i < 7; i++) {
                        if (enemyHero.IsLinkensProtected() !== true) {
                            break;
                        }
                        if (HeroItemsCastTarget[i] !== null) {
                            if (HeroItemsCastTarget[i] !== undefined) {
                                if (HeroItemsCastTarget[i].GetCooldown() === 0.0 &&
                                    skillsValueBreakLinken[i] === true) {
                                    myPlayer.PrepareUnitOrders(6,
                                        enemyHero,
                                        null,
                                        HeroItemsCastTarget[i],
                                        3,
                                        myHero);
                                }
                            }
                        }
                    }
                }
                for (i = 0; i < 7; i++) {
                    if (HeroItemsCastTarget[i] !== null) {
                        if (HeroItemsCastTarget[i] !== undefined) {
                            if (HeroItemsCastTarget[i].GetCooldown() === 0.0 &&
                                skillsValue[i] === true) {
                                myPlayer.PrepareUnitOrders(6,
                                    enemyHero,
                                    null,
                                    HeroItemsCastTarget[i],
                                    3,
                                    myHero);
                            }
                        }
                    }
                }
                for (i = 7; i < 8; i++) {
                    if (HeroItemsCastTarget[i] !== null) {
                        if (HeroItemsCastTarget[i] !== undefined) {
                            if (HeroItemsCastTarget[i].GetCooldown() === 0.0 &&
                                skillsValue[i] === true) {
                                myPlayer.PrepareUnitOrders(8,
                                    null,
                                    null,
                                    HeroItemsCastTarget[i],
                                    3,
                                    myHero);
                            }
                        }
                    }
                }
                // console.log(Clinkz.myHero.GetItemByIndex(0).GetName());
                myPlayer.PrepareUnitOrders(6,
                    enemyHero,
                    null,
                    HeroAbilities[0],
                    3,
                    myHero);
            } else {
                enemyHero = null;
            }
        }
    }
}
clinkz.OnUpdate = () => {
    let myLocalHero = Clinkz.myHero;
    let enemyHero = null;
    if (myLocalHero) {
        if (Clinkz.gameStart !== true &&
            myLocalHero.GetUnitName() !== Clinkz.HERO_NAME
            && Clinkz.isEnabledValue !== true) {
            return;
        }
        // if (Clinkz.isEnabledOnlyVanish === true) {
        // } else {
        //     Clinkz.Load.usingCombo();
        // }
        if (Engine.OnceAt(0.13)) {
            Clinkz.Load.usingCombo();
        }
    }
};
clinkz.OnPrepareUnitOrders = order => {
    // console.log(order.order);
    if (Clinkz.gameStart === true && Engine.OnceAt(Clinkz.ORDER_TIME)) {
        let localhero = EntitySystem.GetLocalHero();
        if (
            order.order !== Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET ||
            localhero.GetUnitName() !== 'npc_dota_hero_clinkz' ||
            Clinkz.attackingWithSecondAbility !== true
        ) {
            return;
        }
        let player = EntitySystem.GetLocalPlayer();
        let target = order.target;
        if (target.IsHero()) {
            player.PrepareUnitOrders(6,
                target,
                null,
                localhero.GetAbilityByIndex(1),
                3,
                localhero);
            return false; // <-------------
        }
    }
};
clinkz.OnGameEnd = () => {
    Clinkz.gameStart = false;
};

clinkz.OnScriptLoad = clinkz.OnGameStart = Clinkz.Load.Init;

RegisterScript(clinkz);
