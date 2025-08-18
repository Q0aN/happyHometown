import { getTsxCodeAsString } from "./src/tool/react.js";

    const tsxCode = await getTsxCodeAsString('../my-app/components/first_game/game.tsx');
    console.log(tsxCode);
