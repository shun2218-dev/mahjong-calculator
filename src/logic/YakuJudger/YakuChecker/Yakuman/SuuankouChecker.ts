import type { Hand } from "@/logic/Hand/Hand";
import type { ParsedHand } from "@/logic/ParsedHand/ParsedHand";

interface SuuankouResult  {
    isSuuankou: boolean;
    isTanki: boolean;
}

export class SuuankouChecker {
    public check(parsedHand: ParsedHand, hand: Hand): SuuankouResult {
        const fail = { isSuuankou: false, isTanki: false };

        if (!hand.isMenzen) return fail;        

        if (parsedHand.agariForm !== "standard") return fail;

        const ankouCount = parsedHand.mentsuList.filter(mentsu => 
            (mentsu.type === "koutsu" || mentsu.type === "kantsu") && mentsu.isAnkou
        ).length;

        if (ankouCount !== 4) return fail;
        
        const isTanki = (parsedHand.machiType === "tanki");

        return { isSuuankou: true, isTanki: isTanki };
    }
}