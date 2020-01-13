let test: ScriptDescription = {};
let myCuier: Courier = null;
let abs: Array<Vector> = [];
let couierTrg: Array<Vector> = [];
let min: number = null;
let minItem: Vector = null;
let moveToo: Vector = new Vector(294.18, -1228.15, 0);
let listTowers: Array<Vector> = [];
let checkTower: boolean = false;
let counter: number = 0;

function DrawCircle(position, radius, sidesCount) {
    let pos = position;
    let angle = 360 / sidesCount;
    for (let i = 0; i <= 360 / angle; i++) {
        let posVec = position.add(new Vector(0, radius, 0).Rotated(angle * i));
        Renderer.DrawWorldLine(pos, posVec);
        pos = posVec;
    }
}

test.OnDraw = () => {
    let NPCs = EntitySystem.GetNPCsList();
    for (let i of NPCs) {
        if (i.IsTower()) {
            DrawCircle(i.GetAbsOrigin(), 1000, 25);
        }
    }
    let pos = myCuier.GetAbsOrigin();
    let position = myCuier.GetAbsOrigin();
    let angle = 360 / 15;
    for (let i = 0; i <= 360 / angle; i++) {
        let posVec = position.add(new Vector(0, 200, 0).Rotated(angle * i));
        Renderer.DrawWorldLine(pos, posVec);
        pos = posVec;
    }
};
test.OnScriptLoad = () => {
    let NPCs = EntitySystem.GetNPCsList();
    for (let i of NPCs) {
        if (i.IsTower()) {
            listTowers.push(i.GetAbsOrigin());
            let position = i.GetAbsOrigin();
            let pos = i.GetAbsOrigin();
            let angle = 360 / 25;
            for (let i = 0; i <= 360 / angle; i++) {
                let posVec = position.add(new Vector(0, 1000, 0).Rotated(angle * i));
                abs.push(pos);
                pos = posVec;
            }
        }
    }
};
test.OnUpdate = () => {
    let listCouriers = EntitySystem.GetCouriersList();
    let hero = EntitySystem.GetLocalHero();
    let player = EntitySystem.GetLocalPlayer();
    for (let i of listCouriers) {
        if (i.GetCourierStateEntity() !== null) {
            if (i.GetCourierStateEntity().GetIndex() === hero.GetIndex()) {
                myCuier = i;
            }
        }
    }
    let curaAbs = myCuier.GetAbsOrigin();
    // for (let i = 1; i < abs.length; i++) {
    //     curaAbs.z = 0;
    //     abs[i].z = 0;
    //     abs[i - 1].z = 0;
    //     setTimeout(() => {
    //         if (curaAbs.Distance(abs[i - 1]) < 100 && curaAbs.Distance(abs[i]) < 300) {
    //             player.PrepareUnitOrders(1,
    //                 null,
    //                 abs[i],
    //                 null,
    //                 1,
    //                 myCuier);
    //         }
    //     }, 2000 + (i * 100));
    // }
    couierTrg = [];
    let pos1 = myCuier.GetAbsOrigin();
    let position1 = myCuier.GetAbsOrigin();
    for (let z = 0; z <= 360 / (360 / 15); z++) { // REASILE
        let posVec = position1.add(new Vector(0, 200, 0).Rotated((360 / 15) * z));
        couierTrg.push(pos1);
        pos1 = posVec;
    }
    min = null;
    for (let i of couierTrg) {
        i.z = 0;
        // console.log(min);
        // console.log(i);
        // console.log(i.Distance(moveToo));
        if (min === null || i.Distance(moveToo) < min) {
            min = i.Distance(moveToo);
            minItem = i;
            // console.log('MinItem Change');
        }
        // player.PrepareUnitOrders(1, null, minItem, null, 1, myCuier);
        // Debug. Находит точку в окружности радиусом 200, которая ближе всего к точке в которую идет кура. Задержка 5 для дебага
    }
// for (let i = 0; i < listTowers.length; i++) {
//     setTimeout(() => {
//         if (minItem.Distance(listTowers[i]) < 1200) {
//             console.log('YES', minItem.Distance(listTowers[i]));
//         } else {
//             console.log('NO', minItem.Distance(listTowers[i]));
//         }
//     }, i * 34);
// }
    if (Engine.OnceAt(0.0)) {
        for (let dist = 1; dist < abs.length; dist++) {
            counter = 0;
            abs[dist - 1].z = 0;
            abs[dist].z = 0;
            curaAbs.z = 0;
            // console.log(curaAbs.Distance(abs[dist - 1]));
            // console.log(curaAbs.Distance(abs[dist]));
            for (let i = 0; i < listTowers.length; i++) {
                if (curaAbs.Distance(listTowers[i]) > 1050) {
                    counter += 1;
                    // console.log('true');
                    // player.PrepareUnitOrders(1, null, minItem, null, 1, myCuier);
                }
            }
            if (counter === listTowers.length) {
                checkTower = true;
            } else {
                checkTower = false;
            }
            // console.log(checkTower);
            if (checkTower === true) {
                // TODO
            }
            if (checkTower === false) {
                // player.PrepareUnitOrders(1, null, curaAbs, null, 0, myCuier);
                console.log((curaAbs.Distance(abs[dist - 1])));
                console.log(curaAbs.Distance(abs[dist]));
                if (curaAbs.Distance(abs[dist - 1]) < 100 && curaAbs.Distance(abs[dist]) < 400 && checkTower === false) { // checkTower работает не очень хорошо
                    player.PrepareUnitOrders(1, null, abs[dist], null, 1, myCuier);    // надо подправить TODO
                    console.log(false);
                }
            }
        }
    }
};
test.OnPrepareUnitOrders = (order) => {
    console.log(order.position);
};
RegisterScript(test);
