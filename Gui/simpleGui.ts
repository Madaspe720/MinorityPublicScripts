let simpleGui: ScriptDescription = {};
let font = Renderer.LoadFont('Arial', 100, Enum.FontWeight.NORMAL);
let [x, y] = [0, 0];
let click_player: boolean = false;
let in_focus_player: boolean = false;
let mapping = new Map();
mapping.set("Down", [0, 1]);
mapping.set("Up", [0, -1]);
mapping.set("Left", [-1, 0]);
mapping.set("Right", [1, 0]);
let vector = mapping.get("Right");
let zmeika = []

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
                Renderer.DrawOutlineRect(x / 2 - 400 + (i * 100), y / 2 - 400 + (j * 100), 100, 100);
            }
        }
    }
};

simpleGui.OnUpdate = () => {
    if (Input.IsKeyDown(Enum.ButtonCode.MOUSE_LEFT) && Input.IsCursorInRect(x / 2 - 350, y / 2 - 350, 650, 150)) {
        click_player = true;
    }
}
RegisterScript(simpleGui);
