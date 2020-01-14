let simpleGui: ScriptDescription = {};
let font = Renderer.LoadFont('Arial', 100, Enum.FontWeight.NORMAL);
let [x, y] = [0, 0];
let click_player: boolean = true;
let in_focus_player: boolean = false;
let mapping = new Map();
mapping.set("Down", [0, 1]);
mapping.set("Up", [0, -1]);
mapping.set("Left", [-1, 0]);
mapping.set("Right", [1, 0]);
let a: number = 3;
let vector = mapping.get("Right");
let random_i = Math.floor((Math.random() * 6) + 1);
let random_j = Math.floor((Math.random() * 6) + 1);
void function s() {
};
let zmeika = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1]
];

simpleGui.OnScriptLoad = () => {
    [x, y] = Renderer.GetScreenSize();
};

simpleGui.OnDraw = () => {
    if (!click_player) {
        Renderer.DrawText(font, x / 2 - 350, y / 2 - 350, "Lets play snake");
    }
    if (click_player) {
        Renderer.SetDrawColor(255, 255, 255, 5);
        Renderer.DrawFilledRect(x / 2 - 400, y / 2 - 400, 800, 800);
        Renderer.SetDrawColor(255, 255, 255, 255);
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                if (zmeika[j][i] === a) {
                    zmeika[j][i] = 0;
                }
                if (zmeika[j][i] === 0) {
                    Renderer.DrawOutlineRect(x / 2 - 400 + (i * 100), y / 2 - 400 + (j * 100), 100, 100);
                } else if (zmeika[j][i] > 0) {
                    Renderer.DrawFilledRect(x / 2 - 400 + (i * 100), y / 2 - 400 + (j * 100), 100, 100);
                }
                else if (zmeika[j][i] === -1) {
                    Renderer.SetDrawColor(255, 0, 0, 255);
                    Renderer.DrawFilledRect(x / 2 - 400 + (i * 100), y / 2 - 400 + (j * 100), 100, 100);
                }
            }
        }
        let t: boolean = false;
        if (Engine.OnceAt(1)) {
            // random_i = Math.floor((Math.random() * 6) + 1);
            // random_j = Math.floor((Math.random() * 6) + 1);
            // while (zmeika[random_i][random_j] < 1 && zmeika[random_i][random_j] > -1) {
            //     random_i = Math.floor((Math.random() * 6) + 1);
            //     random_j = Math.floor((Math.random() * 6) + 1);
            // }
            // console.log(random_j,random_i);
            // zmeika[random_j][random_i] = -1;
            setTimeout(() => {
                for (let j = 0; j < 8; j++) {
                    for (let i = 0; i < 8; i++) {
                        if (zmeika[j][i] > 1) {
                            zmeika[j][i] += 1;
                        }
                        if (zmeika[j][i] === 1 && !t) {
                            zmeika[j][i] += 1;
                            if (zmeika[j + vector[1]][i + vector[0]] == -1) {
                                a += 1;
                            }
                            zmeika[j + vector[1]][i + vector[0]] = 1;
                            t = true;
                        }
                    }
                }
            }, 0);
        }
    }
};

simpleGui.OnUpdate = () => {
    if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_LEFT) && Input.IsCursorInRect(x / 2 - 350, y / 2 - 350, 650, 150)) {
        click_player = true;
    }
    if (Input.IsKeyDown(Enum.ButtonCode.KEY_UP)) {
        vector = mapping.get('Up');
    }
    if (Input.IsKeyDown(Enum.ButtonCode.KEY_DOWN)) {
        vector = mapping.get('Down');
    }
    if (Input.IsKeyDown(Enum.ButtonCode.KEY_LEFT)) {
        vector = mapping.get("Left");
    }
    if (Input.IsKeyDown(Enum.ButtonCode.KEY_RIGHT)) {
        vector = mapping.get("Right");
    }
};
RegisterScript(simpleGui);
